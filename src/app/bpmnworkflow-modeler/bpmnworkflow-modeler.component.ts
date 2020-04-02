import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider } from './bpmn-js';
import { CustomPropsProvider } from './CustomPropsProvider';
import { CustomPaletteProvider } from './CustomPaletteProvider';

const customModdle = {
  name: 'customModdle',
  uri: 'http://example.com/custom-moddle',
  prefix: 'custom',
  xml: {
    tagAlias: 'lowerCase'
  },
  associations: [],
  types: [
    {
      name: 'ExtUserTask',
      extends: [
        'bpmn:UserTask',
        'userTask'
      ],
      properties: [
        {
          name: 'worklist',
          isAttr: true,
          type: 'String'
        }
      ]
    },
  ]
};

@Component({
  selector: 'app-bpmnworkflow-modeler',
  templateUrl: './bpmnworkflow-modeler.component.html',
  styleUrls: ['./bpmnworkflow-modeler.component.css']
})
export class BpmnworkflowModelerComponent implements OnInit, AfterContentInit {
  modeler;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
        {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},

        // Re-use original palette, see CustomPaletteProvider
        {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
        {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
      ],
      propertiesPanel: {
        parent: '#properties'
      },
      moddleExtension: {
        custom: customModdle
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    this.load();
  }

  load(): void {
    const url = '../assets/s38-demo-A2ETool.bpmn20.xml';
    this.http.get(url, {
      headers: {observe: 'response'}, responseType: 'text'
    }).subscribe(
      (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
      this.handleError
    );
  }

  save(): void {
    this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));
  }


}
