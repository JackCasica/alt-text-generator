import * as vscode from "vscode";

export const handleSuccessfulGeneration = async (
  altText: string,
  context: vscode.ExtensionContext
) => {
  // Write the alt text to the clipboard
  await vscode.env.clipboard.writeText(altText);

  // Show the alt text in a notification
  vscode.window
    .showInformationMessage(`Alt text: ${altText}`, {
      title: "Copy to Clipboard",
    })
    .then((selection) => {
      if (selection && selection.title === "Copy to Clipboard") {
        vscode.env.clipboard.writeText(altText);
      }
    });
};
