import vscode from "vscode";
import generateFiles from "./generateFiles";
import formatCurrentDocument from "./codeFormatter";
import fileRunners from "./fileRunners";
import installBend from "./installBend";
import BendTreeDataProvider from "./bendTreeDataProvider";

function main(context: { subscriptions: vscode.Disposable[] }): void {
  const bendTreeDataProvider: BendTreeDataProvider = new BendTreeDataProvider();

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider("bend", {
      provideDocumentFormattingEdits(): vscode.ProviderResult<any> {
        formatCurrentDocument();
      },
    }),
    vscode.window.registerTreeDataProvider("bendView", bendTreeDataProvider),
    vscode.commands.registerCommand("runBendFile", () => fileRunners("run")),
    vscode.commands.registerCommand("runParallel", () => fileRunners("run-c")),
    vscode.commands.registerCommand("runUnParallel", () => fileRunners("run")),
    vscode.commands.registerCommand("formatBend", () =>
      formatCurrentDocument()
    ),
    vscode.commands.registerCommand("installBend", () => installBend()),
    vscode.commands.registerCommand("desugar", () =>
      generateFiles("gen-cu", "desugar")
    ),
    vscode.commands.registerCommand("ConvertToCuda", () =>
      generateFiles("gen-cu", "cu")
    ),
    vscode.commands.registerCommand("ConvertToHvmc", () =>
      generateFiles("gen-hvm", "hvmc")
    ),
    vscode.commands.registerCommand("ConvertToC", () =>
      generateFiles("gen-c", "c")
    ),
    vscode.commands.registerCommand("check", () => fileRunners("check")),
    vscode.commands.registerCommand("runParallelGraphics", () =>
      fileRunners("run-cu")
    )
  );
}

exports.activate = main;
