import { LanguageClient, LanguageClientOptions, ServerOptions } from "vscode-languageclient/node";
import os from "os"
import path from "path";
import fs from "fs"

export default function runLSP() {
    let executablePath: string = '';
    const platform: string = os.platform();
    const arch: string = os.arch();

    if (platform === "win32") {
        if (arch === "x64") {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'windows', 'x64.exe');
        } else if (os.arch() === "ia32") {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'windows', 'x86.exe');
        }
        else {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'windows', 'arm64.exe');
        }
    } else if (platform == "darwin") {
        if (arch === "x64") {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'macos', 'x64');
        } else if (os.arch() === "ia32") {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'macos', 'x86');
        }
        else {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'macos', 'arm64');
        }
    } else {
        if (arch === "x64") {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'linux', 'x64');
        } else if (os.arch() === "ia32") {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'linux', 'x86');
        }
        else {
            executablePath = path.join(__dirname, '..', 'lsp-bin', 'linux', 'arm64');
        }
    }
    if (platform !== "win32") {
        fs.chmod(executablePath, 0o775, (err) => {
            if (err) throw err;
            console.log('The permissions for file "my_file.txt" have been changed!');
        });
    }

    let serverOptions: ServerOptions = {
        run: { command: executablePath },
        debug: { command: executablePath }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'bend' }],
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        'bendlang',
        'bendlangserver',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
}