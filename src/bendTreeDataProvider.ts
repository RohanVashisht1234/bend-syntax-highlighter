import vscode from "vscode";

class BendTreeItem extends vscode.TreeItem {
  constructor(command: { command: string; title: string }) {
    super(command.title, vscode.TreeItemCollapsibleState.None);
    this.command = command;
  }
}

export default class BendTreeDataProvider {
  getTreeItem(element: BendTreeItem): BendTreeItem {
    return element;
  }

  getChildren(element?: BendTreeItem | undefined): BendTreeItem[] | [] {
    if (!element) {
      return [
        new BendTreeItem({
          command: "check",
          title: "Check file to avoid errors",
        }),
        new BendTreeItem({
          command: "runUnParallel",
          title: "Run current file unparalleled",
        }),
        new BendTreeItem({
          command: "runParallel",
          title: "Run current file paralleled",
        }),
        new BendTreeItem({
          command: "runParallelGraphics",
          title: "Run current file paralleled on Graphics Card",
        }),
        new BendTreeItem({
          command: "formatBend",
          title: "Format current file",
        }),
        new BendTreeItem({
          command: "ConvertToC",
          title: "Convert bend to C",
        }),
        new BendTreeItem({
          command: "ConvertToHvmc",
          title: "Convert bend to Hvmc",
        }),
        new BendTreeItem({
          command: "ConvertToCuda",
          title: "Convert bend to Cuda",
        }),
        new BendTreeItem({
          command: "desugar",
          title: "Generate De-sugared functional bend file",
        }),
        new BendTreeItem({
          command: "installBend",
          title: "Install/Update Bend programming language",
        }),
      ];
    }
    return [];
  }
}
