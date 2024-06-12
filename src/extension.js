const vscode = require("vscode");
const path = require("path");

function format_current_document() {
  let editor = vscode.window.activeTextEditor;
  if (editor) {
    if (editor.document.languageId == "bend") {
      var x = vscode.window.createTerminal("Formatter");
      x.sendText(
        `autopep8 --indent-size 2 --in-place "${editor.document.fileName}"`
      );
      x.sendText(`python3 -m pip install autopep8`);
      x.sendText(`py -m pip install autopep8`);
      x.sendText(
        `autopep8 -i --ignore E225,E226 --indent-size 2 "${editor.document.fileName}"`
      );
      return [vscode.window.showInformationMessage("Code formatted")];
    } else {
      vscode.window.showErrorMessage("Editor doesn't contain a bend file");
    }
  } else {
    vscode.window.showErrorMessage("No file is open in the editor");
  }
}

function specials(command) {
  let editor = vscode.window.activeTextEditor;
  if (editor) {
    if (editor.document.languageId == "bend") {
      if (command == "check") {
        editor.document.save();
        let terminal = vscode.window.createTerminal("Bend Interactive");
        terminal.sendText(`bend ${command} "${editor.document.fileName}"`);
        terminal.show();
      } else {
        editor.document.save();
        let terminal = vscode.window.createTerminal("Bend Interactive");
        terminal.sendText(`bend ${command} "${editor.document.fileName}" -s`);
        terminal.show();
      }
    } else {
      vscode.window.showErrorMessage("Editor doesn't contain a bend file");
    }
  } else {
    vscode.window.showErrorMessage("No file is open in the editor");
  }
}

function installBend() {
  let terminal = vscode.window.createTerminal("Bend Interactive");
  terminal.sendText(
    `rustup default nightly && cargo +nightly install hvm && cargo +nightly install bend-lang && rustup default stable && clear &&echo -e "\\033[0;32m Bend extension has successfully installed/updated bend programming language for you"`
  );

  terminal.show();
}

function generate_commands(command, fext) {
  let editor = vscode.window.activeTextEditor;
  if (editor) {
    if (editor.document.languageId == "bend") {
      editor.document.save();
      let terminal = vscode.window.createTerminal("Bend Interactive");
      terminal.sendText(
        `bend ${command} "${editor.document.fileName}" > "${
          path.dirname(editor.document.fileName) +
          "/" +
          path.basename(editor.document.fileName, ".bend")
        }.bend.${fext}"`
      );
    } else {
      vscode.window.showErrorMessage("Editor doesn't contain a bend file");
    }
  } else {
    vscode.window.showErrorMessage("No file is open in the editor");
  }
}

function activate(context) {
  vscode.languages.registerDocumentFormattingEditProvider("bend", {
    provideDocumentFormattingEdits(document) {
      format_current_document();
    },
  });

  const myTreeDataProvider = new MyTreeDataProvider();

  vscode.window.registerTreeDataProvider("myCustomView", myTreeDataProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand("runParallelGraphics", () => {
      specials("run-cu");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("check", () => {
      specials("check");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ConvertToC", () => {
      generate_commands("gen-c", "c");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ConvertToHvmc", () => {
      generate_commands("gen-hvm", "hvmc");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ConvertToCuda", () => {
      generate_commands("gen-cu", "cu");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("desugar", () => {
      generate_commands("gen-cu", "desugar");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("installBend", () => {
      installBend();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("formatBend", () => {
      format_current_document();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("runUnParallel", () => {
      specials("run");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("runBendFile", function () {
      specials("run");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("runParallel", () => {
      specials("run-c");
    })
  );
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
        new MyTreeItem("Check file to avoid errors", {
          command: "check",
          title: "Check file avoid errors",
        }),
        new MyTreeItem("Run current file unparallelly", {
          command: "runUnParallel",
          title: "Run current file unparallelly",
        }),
        new MyTreeItem("Run current file parallelly", {
          command: "runParallel",
          title: "Run current file parallelly",
        }),
        new MyTreeItem("Run current file parallelly on Graphics Card", {
          command: "runParallelGraphics",
          title: "Run current file parallelly on Graphics Card",
        }),
        new MyTreeItem("Format current file", {
          command: "formatBend",
          title: "Format current file",
        }),
        new MyTreeItem("Convert bend to C", {
          command: "ConvertToC",
          title: "Convert bend to C",
        }),
        new MyTreeItem("Convert bend to Hvmc", {
          command: "ConvertToHvmc",
          title: "Convert bend to Hvmc",
        }),
        new MyTreeItem("Convert bend to Cuda", {
          command: "ConvertToCuda",
          title: "Convert bend to Cuda",
        }),
        new MyTreeItem("Generate De-sugared functional bend file", {
          command: "desugar",
          title: "Generate De-sugared functional bend file",
        }),
        new MyTreeItem("Install/Update Bend programming language", {
          command: "installBend",
          title: "Install/Update Bend programming language",
        }),
      ];
    }
    return [];
  }
}
exports.activate = activate;
