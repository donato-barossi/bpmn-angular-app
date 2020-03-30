import { AfterContentInit, Component, ElementRef, Input, OnChanges, AfterViewChecked,
  OnDestroy, Output, ViewChild, SimpleChanges, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import * as BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.development.js';
import { importDiagram } from './rx';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-bpmnworkflow',
  templateUrl: './bpmnworkflow.component.html',
  styleUrls: ['./bpmnworkflow.component.css']
})
export class BPMNWorkflowComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy, AfterViewChecked {
  private bpmnJS: BpmnJS;

  @ViewChild('flowDiagram') private flowDiagram: ElementRef;
  @Output() public importDone: EventEmitter<any> = new EventEmitter();
  @Input() private url: string;

  constructor(private http: HttpClient) {
    this.bpmnJS = new BpmnJS();
    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.bpmnJS.attachTo(this.flowDiagram.nativeElement);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
    this.bpmnJS.get('canvas').addMarker('QCPDeploy', 'completed');
    this.bpmnJS.get('overlays').clear();
    this.bpmnJS.get('overlays').add('QCPDeploy', {
      position: { bottom: 0, right: 0},
      html: '<div class="task-output">jenkins console:<br /><a>jenkins_job_url</a></div>'
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    console.log(changes.url);
    if (changes.url) {
      this.loadUrl(changes.url.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string) {

    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        catchError(err => throwError(err)),
        importDiagram(this.bpmnJS)
      ).subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

}
