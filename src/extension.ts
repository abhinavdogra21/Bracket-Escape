// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('bracketEscape.jumpOutsideBracket', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const cursor = editor.selection.active;

        const textAfter = document.getText(new vscode.Range(cursor, document.positionAt(document.getText().length)));

        const closingBrackets = [')', '}', ']'];
        let offset = 0;
        let found = false;

        for (const char of textAfter) {
            if (closingBrackets.includes(char)) {
                found = true;
                break;
            }
            offset++;
        }

        if (!found) return;

        const newPos = cursor.translate(0, offset + 1);
        const newSelection = new vscode.Selection(newPos, newPos);
        editor.selection = newSelection;
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
