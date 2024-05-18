const vscode = require('vscode');
const path = require('path');

function activate(context) {
    let runBendFile = vscode.commands.registerCommand('runBendFile', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.document.save();
            let terminal = vscode.window.createTerminal('Bend Interactive');
            terminal.sendText(`bend run-c "${editor.document.fileName}"`);
            terminal.show();
        }
    });

    // Add the command to the context
    context.subscriptions.push(runBendFile);
}

exports.activate = activate;