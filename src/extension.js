const vscode = require('vscode');
const path = require('path');


function specials(command) {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        editor.document.save();
        let terminal = vscode.window.createTerminal('Bend Interactive');
        terminal.sendText(`bend ${command} "${editor.document.fileName}"`);
        terminal.show();
    }
}

function generate_commands(command, fext) {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        editor.document.save();
        let terminal = vscode.window.createTerminal('Bend Interactive');
        terminal.sendText(`bend ${command} "${editor.document.fileName}" > "${path.dirname(editor.document.fileName) + "/" + path.basename(editor.document.fileName, ".bend")}.bend.${fext}"`);
    }
}

function activate(context) {
    const myTreeDataProvider = new MyTreeDataProvider();
    vscode.window.registerTreeDataProvider('myCustomView', myTreeDataProvider);

    // Register the commands
    let cmd1 = vscode.commands.registerCommand('runUnParallel', () => {
        specials("run");
    });
    let cmd2 = vscode.commands.registerCommand('runParallel', () => {
        specials("run-c");
    });
    let cmd3 = vscode.commands.registerCommand('runParallelGraphics', () => {
        specials("run-cu");
    });
    let cmd4 = vscode.commands.registerCommand('check', () => {
        specials("check");
    });
    let cmd5 = vscode.commands.registerCommand('ConvertToC', () => {
        generate_commands("gen-c", "c");
    });
    let cmd6 = vscode.commands.registerCommand('ConvertToHvmc', () => {
        generate_commands("gen-hvm", "hvmc");
    });
    let cmd7 = vscode.commands.registerCommand('ConvertToCuda', () => {
        generate_commands("gen-cu", "cu");
    });

    context.subscriptions.push(cmd1);
    context.subscriptions.push(cmd2);
    context.subscriptions.push(cmd3);
    context.subscriptions.push(cmd4);
    context.subscriptions.push(cmd5);
    context.subscriptions.push(cmd6);
    context.subscriptions.push(cmd7);

    let runBendFile = vscode.commands.registerCommand('runBendFile', function () {
        specials("run");
    });

    // Add the command to the context
    context.subscriptions.push(runBendFile);
}

class MyTreeItem extends vscode.TreeItem {
    constructor(label, command) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.command = command;
    }
}

class MyTreeDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            return [
                new MyTreeItem('Check file to avoid errors', {
                    command: 'check',
                    title: 'Check file avoid errors',
                }),
                new MyTreeItem('Run current file unparallelly', {
                    command: 'runUnParallel',
                    title: 'Run current file unparallelly',
                }),
                new MyTreeItem('Run current file parallelly', {
                    command: 'runParallel',
                    title: 'Run current file parallelly',
                }),
                new MyTreeItem('Run current file parallelly on Graphics Card', {
                    command: 'runParallelGraphics',
                    title: 'Run current file parallelly on Graphics Card',
                }),
                new MyTreeItem('Convert bend to C', {
                    command: 'ConvertToC',
                    title: 'Convert bend to C',
                }),
                new MyTreeItem('Convert bend to Hvmc', {
                    command: 'ConvertToHvmc',
                    title: 'Convert bend to Hvmc',
                }),
                new MyTreeItem('Convert bend to Cuda', {
                    command: 'ConvertToCuda',
                    title: 'Convert bend to Cuda',
                }),
            ];
        }
        return [];
    }
}
exports.activate = activate;