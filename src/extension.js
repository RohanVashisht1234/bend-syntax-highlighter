const vscode = require('vscode');
const path = require('path');

function activate(context) {
    // Register a command that executes the active python file in the interactive console
    let runBendFile = vscode.commands.registerCommand('runBendFile', function () {
        // Get the active text editor
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the file name
            let fileName = editor.document.fileName;
            // Get the file base name without extension
            let fileBaseName = path.basename(fileName, '.bend');
            // Get the file directory
            let fileDir = path.dirname(fileName);
            // Save the file
            editor.document.save();
            // Create a terminal
            let terminal = vscode.window.createTerminal('Python Interactive');
            // Send the command to the terminal
            terminal.sendText(`bend run-c ${fileBaseName}.bend`);
            // Show the terminal
            terminal.show();
        }
    });

    // Add the command to the context
    context.subscriptions.push(runBendFile);
}

exports.activate = activate;