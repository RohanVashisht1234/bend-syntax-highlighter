import vscode from "vscode";

export default function installBend(): void {
    let terminal: vscode.Terminal = vscode.window.createTerminal("Bend Interactive");
    terminal.sendText(
        `rustup default nightly && cargo +nightly install hvm && cargo +nightly install bend-lang && rustup default stable && clear &&echo -e "\\033[0;32m Bend extension has successfully installed/updated bend programming language for you"`
    );
    terminal.show();
}
