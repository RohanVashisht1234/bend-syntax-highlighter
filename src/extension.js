import {
  window,
  languages,
  commands,
  TreeItem,
  TreeItemCollapsibleState,
  EventEmitter,
} from "vscode";
import { dirname, basename } from "path";

function specials(command) {
  let editor = window.activeTextEditor;
  if (editor) {
    if (editor.document.languageId == "bend") {
      editor.document.save();
      let terminal = window.createTerminal("Bend Interactive");
      terminal.sendText(`bend ${command} "${editor.document.fileName}"`);
      terminal.show();
    } else {
      window.showErrorMessage("Editor doesn't contain a bend file");
    }
  } else {
    window.showErrorMessage("No file is open in the editor");
  }
}

function installBend() {
  let terminal = window.createTerminal("Bend Interactive");
  terminal.sendText(
    `rustup default nightly && cargo +nightly install hvm && cargo +nightly install bend-lang && rustup default stable`
  );
  terminal.show();
}

function generate_commands(command, fext) {
  let editor = window.activeTextEditor;
  if (editor) {
    if (editor.document.languageId == "bend") {
      editor.document.save();
      let terminal = window.createTerminal("Bend Interactive");
      terminal.sendText(
        `bend ${command} "${editor.document.fileName}" > "${
          dirname(editor.document.fileName) +
          "/" +
          basename(editor.document.fileName, ".bend")
        }.bend.${fext}"`
      );
    } else {
      window.showErrorMessage("Editor doesn't contain a bend file");
    }
  } else {
    window.showErrorMessage("No file is open in the editor");
  }
}

function activate(context) {
  languages.registerDocumentFormattingEditProvider("bend", {
    provideDocumentFormattingEdits(document) {
      var x = window.createTerminal("Formatter");
      x.sendText(`autopep8 --indent-size 2 --in-place "${document.fileName}"`);
      x.sendText(`python3 -m pip install autopep8`);
      x.sendText(`py -m pip install autopep8`);
      x.sendText(`autopep8 --indent-size 2 --in-place "${document.fileName}"`);
      return [window.showInformationMessage("Code formatted")];
    },
  });
  const myTreeDataProvider = new MyTreeDataProvider();
  window.registerTreeDataProvider("myCustomView", myTreeDataProvider);

  // Register the commands
  let cmd1 = commands.registerCommand("runUnParallel", () => {
    specials("run");
  });
  let cmd2 = commands.registerCommand("runParallel", () => {
    specials("run-c");
  });
  let cmd3 = commands.registerCommand("runParallelGraphics", () => {
    specials("run-cu");
  });
  let cmd4 = commands.registerCommand("check", () => {
    specials("check");
  });
  let cmd5 = commands.registerCommand("ConvertToC", () => {
    generate_commands("gen-c", "c");
  });
  let cmd6 = commands.registerCommand("ConvertToHvmc", () => {
    generate_commands("gen-hvm", "hvmc");
  });
  let cmd7 = commands.registerCommand("ConvertToCuda", () => {
    generate_commands("gen-cu", "cu");
  });
  let cmd8 = commands.registerCommand("desugar", () => {
    generate_commands("gen-cu", "desugar");
  });
  let cmd9 = commands.registerCommand("installBend", () => {
    installBend();
  });
  context.subscriptions.push(cmd1);
  context.subscriptions.push(cmd2);
  context.subscriptions.push(cmd3);
  context.subscriptions.push(cmd4);
  context.subscriptions.push(cmd5);
  context.subscriptions.push(cmd6);
  context.subscriptions.push(cmd7);
  context.subscriptions.push(cmd8);
  context.subscriptions.push(cmd9);

  let runBendFile = commands.registerCommand("runBendFile", function () {
    specials("run");
  });

  // Add the command to the context
  context.subscriptions.push(runBendFile);
}

class MyTreeItem extends TreeItem {
  constructor(label, command) {
    super(label, TreeItemCollapsibleState.None);
    this.command = command;
  }
}

class MyTreeDataProvider {
  constructor() {
    this._onDidChangeTreeData = new EventEmitter();
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
        new MyTreeItem("Install Bend programming language", {
          command: "installBend",
          title: "Install Bend programming language",
        }),
      ];
    }
    return [];
  }
}
const _activate = activate;
export { _activate as activate };
