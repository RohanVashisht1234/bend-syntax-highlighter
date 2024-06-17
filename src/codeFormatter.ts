import vscode from "vscode";

export default function formatCurrentDocument(): void {
  let editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  if (editor !== undefined && editor.document.languageId === "bend") {
    var x: vscode.Terminal = vscode.window.createTerminal("Formatter");
    x.sendText(
      `autopep8 --indent-size 2 --in-place "${editor.document.fileName}"`
    );
    x.sendText(`python3 -m pip install autopep8`);
    x.sendText(`py -m pip install autopep8`);
    x.sendText(
      `autopep8 -i --ignore E225,E226 --indent-size 2 "${editor.document.fileName}"`
    );
    x.sendText("exit 0")
    vscode.window.showInformationMessage("Code formatted");
  } else {
    vscode.window.showErrorMessage("No Bend file is open in the editor");
  }
}
