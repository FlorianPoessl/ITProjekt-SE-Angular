import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
  MonacoEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  exports: [
    MonacoEditorComponent
  ],
  providers: [],
  bootstrap: [MonacoEditorComponent]
})
export class CustomMonacoEditorModule {
}
