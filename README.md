# one-fits-all flavour

[Cycle-app](https://github.com/cyclejs-community/create-cycle-app) flavor.

## Installation

Run `create-cycle-app myAppName`.

If you use `create-cycle-app@<5.0.0` you will need this command:
`create-cycle-app myAppName --flavor cycle-scripts-one-fits-all`

To use different package manager, add either `--pnpm` or `--yarn` at the end.

## Template

An elementary SPA. Each page is a cycle component and has its own state.

Uses:
* xstream observables designed for Cycle.js apps
* @cycle/dom and snabbdom for HTML rendering and events
* @cycle/time for easy testing
* cycle-onionify and @cycle/isolate for fractal single state atom
* cyclic-router and switch-path for routing
* Custom HTML speech driver (write only) as example how to write a driver yourself

## Language

Typescript (strict) with TSLint or ES6, uses the Typescript compiler for both.

## How does this flavor work

My goal is to create a flavor where you don't have to eject if you want to customize the config. Thus, the template will create a `webpack.config.js` inside your app folder that defines the entry points of the app. You can add to that config and it will be merged with the config defined in this flavor.

## Bundler

Webpack is configured using [webpack-blocks](https://github.com/andywer/webpack-blocks)
* [Webpack dev server](https://webpack.js.org/configuration/dev-server)

## Scripts

- `npm start`: Start development server listening on port 8080
- `npm test`: Run the tests with mocha-webpack
- `npm run build`: Generate a production-ready build content, on the `build` folder (this folder is *gitignored*)
- `npm run eject`: Copy flavor's dependencies and configurations to the project folder, update `package.json` and remove the dependency on the flavored `cycle-scripts`. This is irreversible.
- `npm run clean`: Delete all the files and folders that were generated by the other commands (build, start and test)

### Config files
* webpack.config.js (Added to `config/` after running the eject script)
