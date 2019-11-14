import { Component, OnInit, Input } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MonacoEditorService } from '../../monaco-editor.service';

@Component({
  selector: 'app-monaco-editor',
  styleUrls: ['./monaco-editor.component.css'],
  templateUrl: './monaco-editor.component.html'
})
export class MonacoEditorComponent {
  editorOptions = {language: 'javascript', readOnly: false, theme: "vs-dark"};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  //Editor Input parameters
  @Input() id: string;
  @Input() type: string;
  @Input() theme: string;
  @Input() url: string;
  @Input() readOnly: boolean;
  @Input() editorHeight: number;

  //Editor Data
  @Input() language: string;
  //@Input() code: string;

  private monacoEditor: any;

  constructor(private myService: MonacoEditorService) {}

  onInit(editorInstance) {
        this.monacoEditor = editorInstance;
        monaco.editor.setModelLanguage(this.monacoEditor.getModel(), this.language);
        if (this.readOnly) {
          this.monacoEditor.updateOptions({ readOnly: true });
        }
        this.setEditorHeader();
  }

  public getValue = (): string => {
      return this.monacoEditor.getValue();
  }

  private setEditorHeader = (): void => {
      let self = this;

      let formatButton: HTMLElement = document.getElementById("btnFormatCode");
      formatButton.onclick = function () {
         self.monacoEditor.getAction('editor.action.formatDocument').run();
      };

      let executeButton: HTMLElement = document.getElementById("btnExecuteCode");
      let webConsole: HTMLElement = document.getElementById("console");
      executeButton.onclick = function () {
         webConsole.innerHTML = self.getValue();
      };

      let languageSelect = document.getElementById("selectLanguage") as HTMLSelectElement;
      languageSelect.value = this.language;
      languageSelect.addEventListener("change", function() {
        monaco.editor.setModelLanguage(self.monacoEditor.getModel(), languageSelect.options[languageSelect.selectedIndex].value);
      });

      let actions: monaco.editor.IEditorAction[] = this.monacoEditor.getSupportedActions();
      let actionSelect = document.getElementById("selectAction") as HTMLSelectElement;

      let data = [];
      for(let i = 0; i<actions.length; i++) {
        let text = actions[i].label;
        let value = actions[i].id;
        data.push({text: text, value: value});
      }

      data.sort((a,b) => (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0));

      for(let i = 0; i<data.length; i++) {
        let el = document.createElement("option");
        el.textContent = data[i].text;
        el.value = data[i].value;
        actionSelect.appendChild(el);
      }

      let actionButton = document.getElementById("btnExecuteCommand");
      actionSelect.addEventListener("change", function () {
        actionButton.onclick = function () {
          let actionId = actionSelect.options[actionSelect.selectedIndex].value;
          if(actionId !== null && actionId != '') {
            self.monacoEditor.getAction(actionId).run();
          }
        }
      });
  }
}
