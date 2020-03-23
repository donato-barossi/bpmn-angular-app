import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BPMNWorkflowComponent } from './bpmnworkflow/bpmnworkflow.component';

@NgModule({
  declarations: [
    AppComponent,
    BPMNWorkflowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
