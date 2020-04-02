import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BPMNWorkflowComponent } from './bpmnworkflow/bpmnworkflow.component';
import { BpmnworkflowModelerComponent } from './bpmnworkflow-modeler/bpmnworkflow-modeler.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    BPMNWorkflowComponent,
    BpmnworkflowModelerComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
