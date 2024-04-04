## Introduction

Site is currently hosted using AWS Amplify at https://master.d2me4xc262rlfx.amplifyapp.com/

Welcome to my serverless REST API project "pet-site". This personal project aims to increase my understanding of REST APIs as 
well as javascript front/back end development. The frontend uses the React JS framework, and the backend uses the nodejs18.x 
Lambda runtime.

The architecture of the application is as below:

AWS Amplify -> API Gateway -> Lambda -> DynamoDB

The definition of the React App can be found at src\App.js

The functions which call the API can be found at src\services\petService.js

You can find the repositories for the other components of the application below -

API Gateway: https://github.com/tonylu0/pets-api

Lambda: https://github.com/tonylu0/pets-lambda

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
