import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export const getBase64Url = (imagePath: string): string => {
  // Check if the image path is an absolute path
  const isAbsolutePath = path.isAbsolute(imagePath);

  let absolutePath;
  if (isAbsolutePath) {
    // If it's an absolute path, use it directly
    absolutePath = imagePath;
  } else {
    // If it's a relative path, resolve it relative to the current file
    // Get the directory of the current file
    const currentFilePath = vscode.window.activeTextEditor?.document.uri.fsPath;

    // Check if a file is open
    if (!currentFilePath) {
      throw new Error("No file is open");
    }

    // Get the directory of the current file
    const currentFileDir = path.dirname(currentFilePath);

    // Resolve the relative file path to an absolute path
    absolutePath = path.resolve(currentFileDir, imagePath);
  }

  // Read the local file
  const file = fs.readFileSync(absolutePath);

  // Convert the file to a base64 string
  const base64Image = file.toString("base64");

  return `data:image/jpeg;base64,${base64Image}`;
};
