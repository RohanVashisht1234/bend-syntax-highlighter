import vscode from "vscode";

export default function ci(label: string, details: string, kind: vscode.CompletionItemKind): vscode.CompletionItem {
    const completionItem: vscode.CompletionItem = new vscode.CompletionItem(label);
    completionItem.insertText = label;
    completionItem.label = label;
    completionItem.kind = kind;
    completionItem.detail = details;
    completionItem.documentation = new vscode.MarkdownString(details);
    return completionItem;
}