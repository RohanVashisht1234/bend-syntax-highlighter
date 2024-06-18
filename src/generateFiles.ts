import vscode from "vscode";
import path from "path";

export default function generateFiles(command: string, fext: string): void {
  let editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  if (editor !== undefined && editor.document.languageId === "bend") {
    editor.document.save();
    let terminal: vscode.Terminal =
      vscode.window.createTerminal("Bend Interactive");
    terminal.sendText(
      `bend ${command} "${editor.document.fileName}" > "${
        path.dirname(editor.document.fileName) +
        "/" +
        path.basename(editor.document.fileName, ".bend")
      }.bend.${fext}"`
    );
    terminal.sendText("exit 0");
  } else {
    vscode.window.showErrorMessage("No Bend file is open in the editor");
  }
}
