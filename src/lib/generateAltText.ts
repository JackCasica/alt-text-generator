import * as fs from "fs";
import OpenAI from "openai";
import * as path from "path";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { askForAPIKey } from "./askForAPIKey";
import { getBase64Url } from "./getBase64Url";
import { isUrl } from "./isUrl";

/*





*/
export const generateAltText = async (
  imagePath: string,
  context: vscode.ExtensionContext
): Promise<string | null> => {
  const apiKey = await askForAPIKey(context);
  const openai = new OpenAI({ apiKey: apiKey });
  const prompt = vscode.workspace
    .getConfiguration("alt-text-generator")
    .get("prompt") as string;

  let imageUrl = imagePath;
  console.log(imageUrl);

  console.log(isUrl(imagePath));
  // Handle case if imagePath is a local file path
  if (!isUrl(imagePath)) {
    imageUrl = getBase64Url(imagePath);
    console.log(imageUrl);
  }

  // Display a progress notification that the alt text is being generated
  return vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Generating alt text...",
      cancellable: true,
    },
    async (progress) => {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });

      const description = response?.choices?.[0]?.message?.content || null;
      return description;
    }
  );
};
