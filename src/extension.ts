import * as vscode from "vscode";

import { generateAltText } from "./lib/generateAltText";
import { resetAPIKey } from "./lib/resetAPIKey";
import { handleSuccessfulGeneration } from "./lib/handleSuccessfulGeneration";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let generateAltTextCMD = vscode.commands.registerCommand(
    "alt-text-generator.generateAltText",
    async () => {
      const editor = vscode.window.activeTextEditor;
      let imagePath: string | undefined;

      // If there's a selection, use it as the image URL
      if (editor && !editor.selection.isEmpty) {
        imagePath = editor.document.getText(editor.selection);
      } else {
        imagePath = await vscode.window.showInputBox({
          prompt: "Enter the Image URL:",
        });
      }

      if (imagePath) {
        const altText = await generateAltText(imagePath, context);

        if (!altText) {
          vscode.window.showErrorMessage("Failed to generate alt text");
          return;
        }

        handleSuccessfulGeneration(altText, context);
      }
    }
  );
  /*





*/
  let fromEditorSelectionCMD = vscode.commands.registerCommand(
    "alt-text-generator.fromEditorSelection",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the selected text
        const selectedText = document.getText(selection);

        // Extract the src attribute
        const srcMatch = selectedText.match(/src=['"]([^'"]*)['"]/);
        if (srcMatch) {
          const src = srcMatch[1];

          const altText = await generateAltText(src, context);

          // Check if the selected text contains an alt attribute
          const altMatch = selectedText.match(/alt=['"]([^'"]*)['"]/);

          let updatedText;
          if (altMatch) {
            // If it does, replace its value
            updatedText = selectedText.replace(
              /alt=['"]([^'"]*)['"]/,
              `alt='${altText}'`
            );
          } else {
            // If it doesn't, add a new alt attribute
            updatedText = selectedText.replace(/\/>/, `alt='${altText}' />`);
          }

          // Replace the selected text with the updated text
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, updatedText);
          });
        }
      }
    }
  );
  /*





*/
  let fromFileCMD = vscode.commands.registerCommand(
    "alt-text-generator.fromFile",
    async (file: vscode.Uri) => {
      console.log("Generating...");
      // The file parameter represents the file that was right-clicked
      const imagePath = file.fsPath;
      console.log(imagePath);

      const altText = await generateAltText(imagePath, context);
      console.log(altText);

      // Rest of the command...
      if (!altText) {
        vscode.window.showErrorMessage("Failed to generate alt text");
        return;
      }

      handleSuccessfulGeneration(altText, context);
    }
  );
  /*





*/
  let resetAPIKeyCMD = vscode.commands.registerCommand(
    "alt-text-generator.resetAPIKey",
    async () => {
      await resetAPIKey(context);
    }
  );
  /*









*/
  context.subscriptions.push(
    generateAltTextCMD,
    fromEditorSelectionCMD,
    resetAPIKeyCMD,
    fromFileCMD
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
