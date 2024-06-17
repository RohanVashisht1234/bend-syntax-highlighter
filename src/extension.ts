import vscode, { ProviderResult } from "vscode";
import generateFiles from "./generateFiles";
import formatCurrentDocument from "./codeFormatter";
import fileRunners from "./fileRunners";
import installBend from "./installBend";

function activate(context: { subscriptions: vscode.Disposable[]; }): void {
  vscode.languages.registerDocumentFormattingEditProvider("bend", {
    provideDocumentFormattingEdits(): ProviderResult<any> {
      formatCurrentDocument();
    },
  });

  const myTreeDataProvider: MyTreeDataProvider = new MyTreeDataProvider();

  vscode.window.registerTreeDataProvider("myCustomView", myTreeDataProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand("runParallelGraphics", () => {
      fileRunners("run-cu");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("check", () => {
      fileRunners("check");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ConvertToC", () => {
      generateFiles("gen-c", "c");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ConvertToHvmc", () => {
      generateFiles("gen-hvm", "hvmc");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("ConvertToCuda", () => {
      generateFiles("gen-cu", "cu");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("desugar", () => {
      generateFiles("gen-cu", "desugar");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("installBend", () => {
      installBend();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("formatBend", () => {
      formatCurrentDocument();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("runUnParallel", () => {
      fileRunners("run");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("runBendFile", function () {
      fileRunners("run");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("runParallel", () => {
      fileRunners("run-c");
    })
  );
}

class MyTreeItem extends vscode.TreeItem {
  constructor(label: string, command: { command: string; title: string; }) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.command = command;
  }
}

class MyTreeDataProvider {
  _onDidChangeTreeData: any;
  onDidChangeTreeData: any;
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  getTreeItem(element: any) {
    return element;
  }

  getChildren(element: any) {
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