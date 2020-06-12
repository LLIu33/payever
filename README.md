# NodeJS Test Task
You have configured application with empty controller and service.
Use https://docs.nestjs.com/ to find resources about framework.

Run `npm i` to install packages.  
Run `npm run lint` to check code linting and cleanness.  
Run `npm run start` to run app.  

## Part one - database schema
Create Mongo DB schema for entities below using NestJS Mongoose module.
Docs: https://docs.nestjs.com/techniques/mongodb.

Application manages `users`, their `hobbies` and `friends`.  
User's settings are `hobby` and `city`.  
User can have many `hobbies`.  
User can have many `cities`.  
User can have other `users` as `friends`.  
`Cities` and `hobbies` are not predefined.

## Part two - endpoints to perform
List of necessary endpoints:
 - user creation
 - user deletion
 - friend assigning
 - retrieving friends of certain user
 - retrieving user's friends with certain hobby
 - retrieving user's friends from certain city with certain hobby
 - get hobbies existent in certain city
 - get cities which has users with certain hobby

## Part three - special features
Add field `features` for user's schema.
On user's creation field `features` should be automatically filled with an object.
Depending on hobby object should contain special property with plain list of some feature's stuff.
Just array of some strings. Data can be hardcoded in project.
Properties are:
 - for `guitar` - property `concerts` with list of guitar concerts
 - for `skiing` - property `resorts` with list of skiing resorts
 - for `stamp` collecting - property `stamps` with list of stamps

_Please, use strong TypeScript typing where possible._  

Good luck!
