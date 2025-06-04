# BracketEscape

Jump the cursor outside the nearest closing bracket in your code with a single keypress.

## Features
- Press `Ctrl+J` (or your own keybinding) to move the cursor just after the matching closing bracket for the nearest opening bracket before your cursor.
- Works with `{}`, `()`, and `[]`.

## Usage
1. Place your cursor inside a block (e.g., inside `{ ... }`).
2. Press `Ctrl+J`.
3. The cursor will jump just after the corresponding closing bracket.

## Install from GitHub
This extension is not published on the VS Code Marketplace. To install it manually:

1. **Clone or download this repository:**
   ```sh
   git clone https://github.com/yourusername/bracket-escape.git
   cd bracket-escape
   ```
2. **Install dependencies and build:**
   ```sh
   npm install
   npm run compile
   ```
3. **Package the extension:**
   ```sh
   npx vsce package
   ```
   This will create a `.vsix` file (e.g., `bracket-escape-0.0.1.vsix`).
4. **Install the extension in VS Code:**
   - Open the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
   - Run `Extensions: Install from VSIX...`
   - Select the generated `.vsix` file

## Custom Keybinding
You can override the default keybinding in your VS Code `keybindings.json`:
```json
{
  "key": "ctrl+j",
  "command": "bracketEscape.jumpOutsideBracket",
  "when": "editorTextFocus"
}
```

## Extension Commands
- `BracketEscape: Jump Outside Bracket` (`bracketEscape.jumpOutsideBracket`): Jumps the cursor outside the nearest closing bracket.

## Requirements
- VS Code 1.100.0 or higher

## Development
- Run `npm install` to install dependencies.
- Run `npm run compile` to build the extension.
- Press `F5` to open a new Extension Development Host and test the extension.

## License
MIT

