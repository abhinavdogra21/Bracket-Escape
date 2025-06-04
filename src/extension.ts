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
        const text = document.getText();
        const offset = document.offsetAt(cursor);

        // Find the last opening bracket before the cursor
        const openingBrackets = ['{', '(', '['];
        const closingBrackets = ['}', ')', ']'];
        let stack = [];
        let foundOpening = -1;
        for (let i = offset - 1; i >= 0; i--) {
            const char = text[i];
            if (closingBrackets.includes(char)) {
                stack.push(char);
            } else if (openingBrackets.includes(char)) {
                if (stack.length === 0) {
                    foundOpening = i;
                    break;
                } else {
                    // Check if the top of the stack matches
                    const openIdx = openingBrackets.indexOf(char);
                    const closeIdx = closingBrackets.indexOf(stack[stack.length - 1]);
                    if (openIdx === closeIdx) {
                        stack.pop();
                    }
                }
            }
        }
        if (foundOpening === -1) return;
        // Now, find the matching closing bracket for this opening
        stack = [];
        const openChar = text[foundOpening];
        const closeChar = closingBrackets[openingBrackets.indexOf(openChar)];
        for (let i = foundOpening + 1; i < text.length; i++) {
            const char = text[i];
            if (char === openChar) {
                stack.push(char);
            } else if (char === closeChar) {
                if (stack.length === 0) {
                    // Move cursor just after this closing bracket
                    const newPos = document.positionAt(i + 1);
                    const newSelection = new vscode.Selection(newPos, newPos);
                    editor.selection = newSelection;
                    editor.revealRange(new vscode.Range(newPos, newPos));
                    return;
                } else {
                    stack.pop();
                }
            }
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
