import vscode from "vscode";
import generateFiles from "./generateFiles";
import * as formatter from "./codeFormatter";
import fileRunners from "./fileRunners";
import installBend from "./installBend";
import BendTreeDataProvider from "./bendTreeDataProvider";
import * as lsp from "./lsp/main";

function main(): vscode.Disposable {
  const bendTreeDataProvider: BendTreeDataProvider = new BendTreeDataProvider();
  return (
    vscode.window.registerTreeDataProvider("bendView", bendTreeDataProvider),
    vscode.commands.registerCommand("runBendFile", () => fileRunners("run")),
    vscode.commands.registerCommand("runParallel", () => fileRunners("run-c")),
    vscode.commands.registerCommand("runUnParallel", () => fileRunners("run")),
    vscode.commands.registerCommand("formatBend", () =>
      formatter.formatCurrentDocument()
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

function _start(context: vscode.ExtensionContext): void {
  context.subscriptions.push(main(), lsp.main(), formatter.main());
}

exports.activate = _start;
