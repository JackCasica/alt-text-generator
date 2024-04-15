import * as vscode from "vscode";

export const askForAPIKey = async (
  context: vscode.ExtensionContext
): Promise<string> => {
  let apiKey = context.globalState.get<string>("apiKey");
  if (!apiKey) {
    apiKey = await vscode.window.showInputBox({
      prompt: "Enter your OpenAI API key",
      ignoreFocusOut: true,
      password: true, // Marks the input as sensitive, hiding it in the UI
    });
    if (apiKey) {
      await context.globalState.update("apiKey", apiKey);
    }
  }
  return apiKey || "";
};
