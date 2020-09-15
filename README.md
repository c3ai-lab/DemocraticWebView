# DemocraticOracle
The democratic oracle represents the project source code for a sample web view, of the thesis
Development of a blockchain based access control protocol for
GitHub repositories as Open-Source project.

The smart contract details are available at https://github.com/flensburger88/DemocraticVotes
The transfer oracle is available at https://github.com/flensburger88/DemocraticOracle


# Deployment
For deploying the blockchain needs to be deployed.
The smart contract adress has to be configured in src/environment/ConstValues.ts

Additional in this file, the access configuration for the blockchain and the hosting platform need to be configured.
A sample configuration is available in the file (this is of cause not valid ;) )




## Start the webapplication

```cd client/request-polling-layout```

```ng serve```

The application runs under localhost:4200


after these two commands, the service should start up with some messages.

In case you see some error messages, the credentials you provided in the ConstValues file, might be wrong





## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
