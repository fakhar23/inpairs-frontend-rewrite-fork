# ESLint Task and Launch Configuration for VS Code

This is a configuration guide for setting up an ESLint task and launch configurations in Visual Studio Code. The ESLint task is configured to automatically fix ESLint errors in the currently opened file, and the launch configurations are for launching Chrome for debugging.

## ESLint Task Configuration

The ESLint task configuration file is a `tasks.json` file located in the `.vscode` directory of your project.

Here's what the configuration does:

- `"label": "eslint"`: This gives the task a name of "eslint".
- `"type": "shell"`: This specifies that the task is a shell command.
- `"command": "npx eslint \"${file}\" --fix"`: This is the command that the task runs. It runs ESLint on the currently opened file (`${file}`) and automatically fixes problems (`--fix`).
- `"group": { "kind": "build", "isDefault": true }`: This makes the task the default build task, which means you can run it with `Ctrl+Shift+B` (or `Cmd+Shift+B` on macOS).
- `"presentation": { "reveal": "always" }`: This specifies that the output of the task should always be shown in the terminal.

## Launch Configuration

The launch configuration file is a `launch.json` file located in the `.vscode` directory of your project.

Here's what the configuration does:

- `"type": "chrome"`: This specifies that the debugger should attach to a Chrome browser.
- `"request": "launch"`: This specifies that a new browser window should be launched for debugging.
- `"name"`: This gives the launch configuration a name.
- `"url"`: This is the URL that the browser should navigate to when launched.
- `"webRoot": "${workspaceFolder}"`: This specifies the root directory of your web server.
- `"userDataDir": false`: This specifies that the browser should be launched in guest mode (without any user data).

## Usage

To run the ESLint task, use the following keyboard shortcuts:

- On Windows and Linux: `Ctrl+Shift+B`
- On macOS: `Cmd+Shift+B`

This will run ESLint on the currently opened file and automatically fix problems.

To start a debugging session, select the appropriate launch configuration and press `F5`.
