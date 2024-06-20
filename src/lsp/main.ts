/*==============================================================================
 *
 * Main file (entry point for the bend lsp)
 *
 * - This is a temporary lsp being released until the wasm release of rust based
 *   bend-lsp
 *
 * =============================================================================
 */
import vscode from "vscode";
import ci from "./completionItemCreator";

// starting point for the lsp
export function main(): vscode.Disposable {
  return vscode.languages.registerCompletionItemProvider(
    { scheme: "file", language: "bend" }, // Change 'plaintext' to your target language
    {
      provideCompletionItems(): vscode.CompletionItem[] {
        // Create a simple completion item

        return [
          ci(
            "def",
            "`def` is a keyword used to define a function or method.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "switch",
            "`switch` is a keyword used to create a switch statement for multi-branch conditionals.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "case",
            "`case` is a keyword used to define a branch in a switch statement.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "return",
            "`return` is a keyword used to exit a function and return a value.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "if",
            "`if` is a keyword used for conditional branching.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "else",
            "`else` is a keyword used to provide an alternative branch in a conditional.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "when",
            "`when` is a keyword used to specify conditions in pattern matching.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "match",
            "`match` is a keyword used for pattern matching against values.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "λ",
            "`λ` is a literal used to define bend code.",
            vscode.CompletionItemKind.Operator
          ),
          ci(
            "Some",
            "`Some` is a keyword used to represent a value in an option type.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "data",
            "`data` is a keyword used to define a data type.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "let",
            "`let` is a keyword used to bind a value to a variable.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "use",
            "`use` is a keyword used to bring modules or values into scope.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "object",
            "`object` is a keyword used to define an object or an instance of a class.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "fold",
            "`fold` is a keyword used to reduce a collection to a single value using a binary operation.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "open",
            "`open` is a keyword used to open a file.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "do",
            "`do` is a keyword used to start a block of expressions.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "bind",
            "`bind` is a keyword used in monadic operations to chain computations.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "Name",
            "`Name` is a keyword used to define a named entity.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "identity",
            "`identity` is a keyword used to represent a function that returns its argument.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "Bool",
            "`Bool` is a keyword used to define a boolean data type.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "ask",
            "`ask` is a keyword used to retrieve a value from a context or environment.",
            vscode.CompletionItemKind.Keyword
          ),
          ci(
            "with",
            "`with` is a keyword used to introduce a block where certain bindings are in scope.",
            vscode.CompletionItemKind.Keyword
          ),
        ];
      },
    }
  );
}
