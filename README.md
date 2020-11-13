# DemocraticWebView
Since the development of the git protocol, the amount of open-source project increases year by year.
For supporting this, many hosting platforms exist, which allow string of a project master and collaborating with other developers.
But in all hosting platforms, the project depends on the behavior of the project owner.
He can decide to integrate source code sections without asking anyone about it, the same way as he can prevent others from performing changes in the project.
In the thesis "Development of a blockchain based access control protocol for GitHub repositories as Open-Source project" by Torben Ulrich , the question if it is possible to develop a protocol, which uses a decentralized access control for these centralized source code hosting platforms is discussed.
In consequence, a protocol is designed, which removes the power from a project owner and passes all code changing decisions into a community of developers.
The community, which can decide about the code changes is defined as an open group of developers, which can permanently change.
To reach this permission transfer a smart contract is implemented, that offers a democratic voting process.
The vote which is performed in the blockchain results in the decision of a pull request being merged.
By doing this, this smart contract allows transparent verifying of all changes that are performed on the source code of an open-source project.
Moreover, this permission transfer completely removes the project owner and therefore removes possibilities to bypass decisions which are met by the community.
The protocol is implemented against the gitHub API on an Ethereum blockchain and is shared here an open-source project itself.


The democratic oracle represents the project source code for a sample web view, of that thesis

The smart contract details are available at https://github.com/flensburger88/DemocraticVotes
The transfer oracle is available at https://github.com/flensburger88/DemocraticOracle


# Deployment
For deploying the blockchain needs to be deployed.
The smart contract adress has to be configured in src/app/services/connection/connectin.service.ts
The ABI File needs to be inserted into src/app/services/connection/connection.json

Additional in the connection.service.ts file, the access configuration for the blockchain and the hosting platform need to be configured.
With an entered private key in this file, the user of the web application is able to perform "fake votes" for demonstrating the functionality.
A sample configuration is available in the file (this is of cause not valid ;) )




## Start the webapplication

```cd client/DemocraticWebView```

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
