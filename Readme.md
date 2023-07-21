# Node Express Backend Boilerplate

## NOTES From Narcis:
The application works, all the endpoints for CRUD are implemented, I added validation, error handling, unit and integration tests

An asset has the following structure:
```{
"type":"picture",
"name":"aa",
"content":"bb"
}
```
when creating it, the uuid will be returned with which you can perform all the other actions

Given the limited time I tried to do only the minimal of what was necessary, a lot of other improvements could have been made.

--------------------------------


Welcome to the DemoUp Cliplister Coding Challenge Backend. 

This is the practical part of the assignment. 

## Setup
* have node, npm and docker installed
* copy `.env.sample` to `.env`
* start db with `docker-compose up -d`
* initialize schema with `npm run init-schema`
  
## Run
* `npm run start` 
