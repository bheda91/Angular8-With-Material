# Angular 21 With Material

This project uses [Angular CLI](https://github.com/angular/angular-cli) 21.2 and Angular Material 21.2.
It needs Node.js 20.19+, 22.12+ or 24+.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4210/`. The app will automatically reload if you change any of the source files.

Log in with username `bheda91` and password `password`.

## Runtime configuration

`src/config.json` is copied to the build output and loaded before the app starts.
It sets the page title, company name and API host. Edit the deployed copy to change them without rebuilding.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/angular-7-with-material` directory.
Builds use the production configuration by default. Run `npm run watch` for a development build that rebuilds on change.

## Running unit tests

Run `npm test` to execute the unit tests with [Vitest](https://vitest.dev/).

## Linting

Run `npm run lint` to lint the project with [angular-eslint](https://github.com/angular-eslint/angular-eslint).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
