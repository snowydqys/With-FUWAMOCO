# For Developers

This project uses TypeScript and Webpack to build and compile the code. Why TypeScript? Only because I prefer TypeScript over plain JavaScript. Why Webpack? Only because this is the only bundler I was aware of at the time of writing this code.

## Getting Started

1. Make sure you have [pnpm](https://pnpm.io) installed and working.
2. Clone the repository.
3. Install the dev dependencies with `pnpm i`.

## Folder Structure

The project has the following folder structure.

```
With-FUWAMOCO/
├─ dist/
│  └─ Compiled files to be zipped up
├─ docs/
│  └─ Files only for the repo's documentation
├─ icons/
│  └─ The images for the extension's icon
├─ src/
│  └─ TypeScript files for compilation
├─ static/
│  └─ Files copied to dist with no processing done
└─ web-ext-artifacts
   └─ ZIP files ready to be distributed
```

In general, for developing code purposes only concern yourself with putting TypeScript files in `src` and any assets that requires no processing (images, HTML, etc) in `static`.

## npm Scripts

The following npm scripts are available to make your life easier. You can run these by `pnpm run <script>`

- `compile`: Deletes the `dist` folder, and runs `webpack` to compile the extension
- `build`: Runs the `compile` script, runs `web-ext build` with the correct source destination, and outputs in `web-ext-artifacts`
- `build:chrome`: Runs the `build` script for Chrome and outputs in `web-ext-artifacts/chrome`
- `build:firefox`: Runs the `build` script for Firefox and outputs in `web-ext-artifacts/firefox`
- `build:both`: Runs the `build:chrome` and `build:firefox` scripts consecutively.
- `lint`: Runs `eslint` on `src` to check for any linting issues
- `lint:fix`: Trys to fix any linting issues automatically. This can fail and return a list of linting issues.
- `watch`: Runs `webpack --watch` on the source directory
- `webext`: Helper to run `web-ext` with the correct source directory.

## Workflow

In general:

- When developing the app you should run `pnpm run watch` to have hot reloads and load the extension from `dist`.
- When building, you should run either `pnpm run build:chrome` or `pnpm run build:firefox` depending on whether you want the Chrome or Firefox icons or run `pnpm run build:both` for both
- If you want to run some `web-ext` command, you should use `pnpm run webext <your command>` instead.

After you've done all your edits, if you'd like to submit a pull request with your changes (always appreciated btw!) please run the `lint` script and fix all (if any) issues that it shows up. This helps ensure a clean and consistent coding style.
