# Poke-Poll
Code Foo 2023 Application (Engineering)

## Introduction
Poke Poll is a polling application where users can create an account and log in to vote on their favorite Gen 1 Pokemon!

## Setup
- [ ]  Clone Repo
- [ ]  run `npm install` to install dependencies
- [ ]  If VSCode asks if you would like to add node_modules into .gitignore, click 'Yes'
- [ ]  run `npm test` to run your test suite
- [ ] `npm run dev` to start your server on port 3000 and your client on port 8080

## How to use the application
1. Access your browser and go to the following url: http://localhost:8080/. You are able to create a new account and log in.

Or you can use one of the existing test accounts: 

Username: test

Password: test

2. After you are logged in, you will be on the vote page: http://localhost:8080/Vote. 
On this page, you are able to search for the specific Gen 1 Pokemon of your choice and vote for your favorite.
To vote, you will need to use your cursor and click on the pokemon of your choice.

3. To access the poll results of every users' favorite Gen 1 Pokemon, you can either click the Poll Results button on the top right of the Vote page or directly go to the following url: http://localhost:8080/results

## Regarding the .env file
I have included the .env as you will need my MongoDBURI in order to use this application. The database has been initialized to include the necesarry collections for this application to function.
