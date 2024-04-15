import * as vscode from "vscode";

export const resetAPIKey = async (context: vscode.ExtensionContext) => {
  await context.globalState.update("apiKey", undefined);
  vscode.window.showInformationMessage("API Key has been reset");
};
