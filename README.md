# AskMe - Dev Frontend 

AskMe is a web app, PWA in reactJs for Trivia questions with several categories using the API from https://opentdb.com/.
My first experience with redux, unitary test and PWA Applications. The main objective is learn and have a little fun on my smartphone while my code compile.

## Getting Started

For to have this project running on your computer you just need to clone the the repo and run $ yarn or $ npm install.

### Prerequisites

First of all you will need NodeJs, a browser that can run V8 engine like Chrome and a packege manager like NPM (but I strongly recommend to use Yarn)


[Get Node Here](https://nodejs.org/en/) 

[Get Yarn Here](https://yarnpkg.com/) 

This project uses DataBase from MongoDB, for use that you will need to have an Cluster with a database "askMe" on atlas MongoDB.

[SingUp MongoDB Here](https://cloud.mongodb.com/)


## Installing

To open the Dev mode you need to clone the repo, install and initialize both, backend and frontend.


### preparing;

You will need to set some environment variables:
Create an ".env" file on the backend folder that contains these variables;

```
DB_CONNECTION="mongodb+srv://<username>:<password>@cluster0-xfzvp.mongodb.net/askMe?retryWrites=true&w=majority"
PORT=3001
CONSUMO = "http://localhost:3000/"
```

Create an ".env" file on the folder frontend that contains this variable;

```
DB_CONNECTION="http://localhost:3001/api/testResults/001"
```

### install;

Open your terminal and navigate to the backend folder on the cloned repo folder and install the dependencies with this command line;

```
$ npm install    (or)       $ yarn 
```
(wait till finished)

Now navigate to frontend folder and use the same;

```
$ npm install    (or)       $ yarn 
```
(wait till finished)


### run the server;

With all the installation finished, now open the backend folder on your terminal again and run the next command line;

```
$ npm run server   (or)       $ yarn server
```

It will prepare the server. When you receive the port info your server is ready to go.


### run the app;

Now open another terminal and past the following command line;

```
$ npm run start   (or)       $ yarn start
```

Now the application is running. It will open on your browser.(if not just open http://localhost:3000/ and wait till load)


## Running the tests

There is unitary tests for the difficulty level change and for the finalize counter.
it can be run with the following command line at the frontend folder:

```
$ npm run test    (or)       $ yarn test
```

## Deployment

The app is deployed on heroku in the following url:


[frontend](https://askme-frontend-maraoliveira.herokuapp.com/) 

[backend](https://askme-backend-maraoliveira.herokuapp.com/)

## Supported on

```
Chrome
Safari
Firfox
```
```
Android 
IOS - With PWA exception
```

## Made With

* reactJs ^16.13.1
* Redux ^4.0.5
* Sass (node-sass) ^4.14.1


* axios ^0.19.2
* Express 4.17.1
* mongoose 5.9.19
* mongoDB 3.5.9


* git
* opentdb
* heroku

-See more at packege.json on backend and frontend folder

## Authors

**Mara Oliveira** 


## License

 MIT
