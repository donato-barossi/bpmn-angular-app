import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnworkflowModelerComponent } from './bpmnworkflow-modeler.component';

describe('BpmnworkflowModelerComponent', () => {
  let component: BpmnworkflowModelerComponent;
  let fixture: ComponentFixture<BpmnworkflowModelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpmnworkflowModelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpmnworkflowModelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
