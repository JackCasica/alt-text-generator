# alt-text-generator

This extension makes it easy to generate descriptive alt-text for images. Simply provide an image URL, and the extension will make a call to the openai api to create a concise and descriptive alt text.

## Requirements

This extension is Bring-Your-Own-Key (support for OpenAI only at the moment). If you don't have an API key yet, you can sign up for one at [OpenAI - Api Keys](https://platform.openai.com/api-keys). The key is stored locally and securely within VS Code and is scoped to the `altTextGenerator` extension.

## How to use

You can use the extension in a few ways:

1. **From the command palette**: Activate the command `Generate Alt-Text` and provide the image url in the input box.
2. **Right-click context menu**: Highlight an image url in the editor and select `Generate alt text`.
3. **From selected text**: Highlight an image url in the editor and press `Ctrl+Shift+P` to activate the command palette. Then, select `Generate alt text`. If the selected text is the opening html or react tag, the extension will add an `alt` attribute with the generated alt-text.

> Tip: Consider using short, focused animations to demonstrate how to use the extension effectively.

## Good to know

- The extension will work on web-hosted images as well as local images. If you want to generate alt-text for a local image, you can use the `Generate Alt-Text` command and provide the path to the image file.
- Once generated, the alt text is copied to the clipboard.
- Supported image types and file sizes are determined by the OpenAI API. For more information, refer to the [OpenAI API Vision documentation](https://platform.openai.com/docs/guides/vision).
- Reset the API key by running the `Reset API Key` command from the command palette.

## Extension Settings

This extension contributes the following settings:

- `altTextGenerator.prompt`: Customize the prompt message that is sent to openai for generating alt-text.
- `altTextGenerator.model`: Set the OpenAI model used for generating alt-text. Default is `gpt-4-turbo`. For a list of available models that understand images, refer to the [OpenAI API documentation.](https://platform.openai.com/docs/models/overview).

## Known Issues

No known issues at this time. Please report any issues you encounter on the GitHub issues page.

## Release Notes

### 1.0.0

Initial release of alt-text-generator.

- Generate alt-text for any given hosted image URL.
- Generate alt-text from locally refernced image files.
- Customize the model and prompt used for alt-text generation.
- Secure API key storage within VS Code's global state.
