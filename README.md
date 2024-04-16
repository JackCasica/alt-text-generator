# Alt Text Generator

This extension makes it easy to generate descriptive alt-text for images. Simply provide an image URL, and the extension will make a call to the openai api to create a concise and descriptive alt text.

## Requirements

This extension is Bring-Your-Own-Key (support for OpenAI only at the moment). If you don't have an API key yet, you can sign up for one at [OpenAI - Api Keys](https://platform.openai.com/api-keys). The key is stored locally and securely within VS Code and is scoped to the `altTextGenerator` extension.

## How to Use

You can use the extension in three ways:

**From the command palette**: Activate the VS Code command palette and type `Generate Alt-Text`. It will prompt you to provide the image URL in the input box. If it is your first time using the extension, you will also be prompted to enter your OpenAI API key.
![From Command Palette](./assets/from-command-palette.gif)

**From editor selection**: Highlight an image URL in the editor and press `Ctrl+Shift+P` to activate the command palette. Then, select `Generate alt text`. If the selected text is the opening HTML or React tag, the extension will append an `alt` attribute with the generated alt-text.
![From Selection](./assets/from-selection.gif)

**From file explorer selection**: Right-click on an image file in the file explorer and select `Generate Alt Text`. The extension will generate alt-text for the image and copy it to the clipboard.
![From File Explorer](./assets/from-file-explorer.gif)

## Good to know

- The extension works local images too. If you want to generate alt-text for a local image, you can use the `Generate Alt-Text` command and provide the relative or absolute path to the image file.
- Once generated, the alt text is copied to the clipboard, but you can also click `Copy to Clipboard` in the notification to copy the alt text again.
- Supported image types and file sizes are determined by the OpenAI API. For more information, refer to the [OpenAI API Vision documentation](https://platform.openai.com/docs/guides/vision).
- Reset the API key by running the `Reset API Key` command from the command palette.

## Extension Settings

This extension contributes the following settings:

- `altTextGenerator.prompt`: Customize the prompt message that is sent to openai for generating alt-text.
- `altTextGenerator.model`: Set the OpenAI model used for generating alt-text. Default is `gpt-4-turbo`. For a list of available models that understand images, refer to the [OpenAI API documentation.](https://platform.openai.com/docs/models/overview).

## Known Issues

File path resolution for local images is still WIP, so you may run into some issues these. Please report any issues you encounter on the [GitHub issues page](https://github.com/JackCasica/alt-text-generator/issues).
