import vscode from "vscode";

export default function fileRunners(command: string): void {
    let editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
    if (editor !== undefined && editor.document.languageId === "bend") {
        editor.document.save();
        let terminal: vscode.Terminal = vscode.window.createTerminal("Bend Interactive");
        if (command === "check") {
            terminal.sendText(`bend ${command} "${editor.document.fileName}"`);
        } else {
            terminal.sendText(`bend ${command} "${editor.document.fileName}" -s`);
        }
        terminal.show();
    } else {
        vscode.window.showErrorMessage("No Bend file is open in the editor");
    }
}
