# Backend
Backend system for vattenbagarna

# Workflow
- clone the repo `git@github.com:vattenbagarna/Backend.git`
- install npm modules `npm install`
- code
- run `npm test` to run linters etc.
- start the server with `node index.js`
- create a branch, commit and push to it
- Create pull request to merge with master

# Project structure
This is the file structure of the project, use this as a reference when adding more code.

## Index file
This is the file that starts everything up, it will probably be pretty much unchanged.

## Routers
A router keeps track of it's routes and is mounted in the index file. The router shall not contain any logic
besides responding with data.

## Src / Functions
The src directory is where most things happen. Here is all logic stored, split up to relevant files.
This is where things such as database calls and calculations stored.

## middleware
A middleware activates before the request meets the router. This can be used to log
to console or file.

## Setup database
Login as a user: `mongo -u <username> -p <password> <database>`  
to login as admin, make sure to connect to the `admin` database.

# Licence
For licensing in for-profit purposes or in an enterprise environment contact [BAGA](http://baga.se/).
