# Income Expense App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1, and updated to version 16.1.3.
The design comes from [StarAdmin-Free-Bootstrap-Admin-Template](https://github.com/BootstrapDash/StarAdmin-Free-Bootstrap-Admin-Template), adapted to work in angular with small fixes.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Firebase
This projects uses Firebase to manage Authentication, and uses cloud firestore as the noSQL database.
this project works with [Angular fire](https://github.com/angular/angularfire) to provide the Firebase implementation in Angular. 
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).
Run `npm test` to execute the firebase emulators first and then the Jest tests.
Run `npm run test:frontend`to test only the frontend, and `npm run test:rules` to test only the firebase rules.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
