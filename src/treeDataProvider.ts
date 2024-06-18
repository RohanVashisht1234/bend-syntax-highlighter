import vscode from "vscode";

class MyTreeItem extends vscode.TreeItem {
    constructor(command: { command: string; title: string; }) {
        super(command.title, vscode.TreeItemCollapsibleState.None);
        this.command = command;
    }
}

export class MyTreeDataProvider {

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