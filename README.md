# Poke-Poll
Code Foo 2023 Application (Engineering)

## Introduction
Poke Poll is a polling application where users can create an account and log in to vote on their favorite Gen 1 Pokemon!

## Setup
- [ ]  Make sure you have Node.js and npm downloaded and installed on your own local workstation
- [ ]  Fork & Clone Repo onto your own local workstation
- [ ]  Navigate to the root directory of your project using the terminal 
- [ ]  Run the command `npm install` to install dependencies
- [ ]  If VSCode asks if you would like to add node_modules into .gitignore, click `Yes`
- [ ]  Run the command `npm run build` to run the Webpack compiler in production mode and bundle assets to be served
- [ ]  Run the command `npm start` to start our server on port 3000

## Optional - Unit Testing
- [ ]  Run `npm test` to run unit controller test suite

## How to use the application
1. Access your browser and go to the following url: http://localhost:3000/. 
- [ ] You are able to directly see poll results without logging in.
- [ ] You are able to create a new account and log in.

Or you can use one of the existing test accounts to log in if you do not feel like creating a new account: 
- [ ]  Username: 'test' / Password: 'test'
- [ ]  Username: 'test1' / Password: 'test1'
- [ ]  Username: 'test2' / Password: 'test2'
- [ ]  Username: 'test3' / Password: 'test3'

2. After you are logged in, you will be on the vote page: http://localhost:3000/Vote. 
On this page, you are able to search for the specific Gen 1 Pokemon of your choice and vote for your favorite.
To vote, you will need to use your cursor and click on the pokemon of your choice. 
Feel free to change your choice at any time. After all... We Gotta Catch Em' All!

3. To access the poll results of every users' favorite Gen 1 Pokemon, you can either click the Poll Results button on the top right of the Vote page or directly go to the following url: http://localhost:3000/results

## Regarding the .env file
I have included the .env as you will need my MongoDBURI in order to use this application. The database has been initialized to include the necesarry collections for this application to function.
