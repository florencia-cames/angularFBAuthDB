# Template for Angular 15 with Firebase, Auth Service, Guards, Basic DB Interactions, TESTING, and Angular Material.

This is a project template for building Angular 15 applications with Firebase. The template comes with an Auth Service, Guards to protect routes, basic DB interactions. Additionally, Angular Material has been integrated to provide a more pleasant and consistent user experience.

To get started, make sure you have the necessary dependencies installed and follow the instructions in the README file to set up Firebase and the Auth Service. Examples of how to interact with the database are also included.

Start building your Angular 15 application with Firebase today with this template!

# Plantilla para Angular 15 con Firebase, servicio de autenticación, guards, interacciones básicas con la base de datos, TESTING y Angular Material.

Este es un proyecto de plantilla para crear aplicaciones en Angular 15 con Firebase. La plantilla viene con un servicio de autenticación, guards para proteger rutas, interacciones básicas con la base de datos. Además, se ha integrado Angular Material para una experiencia de usuario más agradable y coherente.

Para empezar, asegúrate de tener las dependencias necesarias instaladas y sigue las instrucciones en el archivo de README para configurar Firebase y el servicio de autenticación. También se incluyen ejemplos de cómo interactuar con la base de datos.

## arrayUnion & arrayRemove

You can find examples of these two functions (arrayUnion and increment) in Firebase's documentation. One limitation that you might encounter when using arrayUnion is that it doesn't allow duplicate values in the array. Similarly, when using increment, you need to be careful not to increment the same value multiple times, as this could result in unexpected behavior. However, these functions can be very useful when working with arrays and numeric values in your Firebase database.

## Increment

(in Progress)

# Environments

Please note that for security reasons, I am not uploading the environments file. To set up your environments, create a file in the `src/environments` folder with the following information:

Recuerda que por razones de seguridad no estoy subiendo el archivo de entornos. Para configurar tus entornos, crea un archivo en la carpeta `src/environments` con la siguiente información:

```
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'xxx',
    authDomain: 'xxx',
    projectId: 'xxx',
    storageBucket: 'xxx',
    messagingSenderId: 'xxx',
    appId: 'xxx',
    measurementId: 'xxx',
  },
};
```

# AngularFBAuthDB

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
