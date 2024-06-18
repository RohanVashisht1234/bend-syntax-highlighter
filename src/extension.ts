import vscode from "vscode";
import generateFiles from "./generateFiles";
import formatCurrentDocument from "./codeFormatter";
import fileRunners from "./fileRunners";
import installBend from "./installBend";

function main(context: { subscriptions: vscode.Disposable[]; }): void {
  const myTreeDataProvider: MyTreeDataProvider = new MyTreeDataProvider();

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider("bend", {
      provideDocumentFormattingEdits(): vscode.ProviderResult<any> {
        formatCurrentDocument();
      },
    }),
    vscode.window.registerTreeDataProvider("myCustomView", myTreeDataProvider),
    vscode.commands.registerCommand("runBendFile", () => fileRunners("run")),
    vscode.commands.registerCommand("runParallel", () => fileRunners("run-c")),
    vscode.commands.registerCommand("runUnParallel", () => fileRunners("run")),
    vscode.commands.registerCommand("formatBend", () => formatCurrentDocument()),
    vscode.commands.registerCommand("installBend", () => installBend()),
    vscode.commands.registerCommand("desugar", () => generateFiles("gen-cu", "desugar")),
    vscode.commands.registerCommand("ConvertToCuda", () => generateFiles("gen-cu", "cu")),
    vscode.commands.registerCommand("ConvertToHvmc", () => generateFiles("gen-hvm", "hvmc")),
    vscode.commands.registerCommand("ConvertToC", () => generateFiles("gen-c", "c")),
    vscode.commands.registerCommand("check", () => fileRunners("check")),
    vscode.commands.registerCommand("runParallelGraphics", () => fileRunners("run-cu"))
  );
}

class MyTreeItem extends vscode.TreeItem {
  constructor(command: { command: string; title: string; }) {
    super(command.title, vscode.TreeItemCollapsibleState.None);
    this.command = command;
  }
}

class MyTreeDataProvider {

  getTreeItem(element: any) {
    return element;
  }

  getChildren(element: any) {
    if (!element) {
      return [
        new MyTreeItem({
          command: "check",
          title: "Check file to avoid errors",
        }),
        new MyTreeItem({
          command: "runUnParallel",
          title: "Run current file unparalleled",
        }),
        new MyTreeItem({
          command: "runParallel",
          title: "Run current file paralleled",
        }),
        new MyTreeItem({
          command: "runParallelGraphics",
          title: "Run current file paralleled on Graphics Card",
        }),
        new MyTreeItem({
          command: "formatBend",
          title: "Format current file",
        }),
        new MyTreeItem({
          command: "ConvertToC",
          title: "Convert bend to C",
        }),
        new MyTreeItem({
          command: "ConvertToHvmc",
          title: "Convert bend to Hvmc",
        }),
        new MyTreeItem({
          command: "ConvertToCuda",
          title: "Convert bend to Cuda",
        }),
        new MyTreeItem({
          command: "desugar",
          title: "Generate De-sugared functional bend file",
        }),
        new MyTreeItem({
          command: "installBend",
          title: "Install/Update Bend programming language",
        }),
      ];
    }
    return [];
  }
}

exports.activate = main;
