## UI Component Development

This is a shared component library meant to be used across Canyon's multi-app ecosystem. Please keep these components generic, reusable, and free of business logic.

### Development

To develop a component, you should:

1. Create a new file in the `src/components` directory.
2. Run `bun run codegen` to export the component in `package.json` so that it can be consumed.

#### Exporting Static Files
If you need to export a static file, such as a config, you can add the file to the `staticImports` object in `export-components.js`.

### Installing Dependencies

Bun currently doesn't have great support for installing a package into a workspace using the command line. You can install the package by adding it to the `package.json` file and running `bun install`. Make sure that the dependency does not get hoisted into the root `package.json` file.
