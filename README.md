# "Y" a practice express and mongoose project
## What does this do?
This is an example project that uses express and mongoose to demonstrate CRUD route creation and usage when developing a backend or API

## How do I run this? 
After cloning this repo, first add a valid .env file at the root of the project with a valid MONGO_URL connection string 

(if you don't have a local version of mongoDB installed or your own deployment of MongoDB atlas you can try to paste in `MONGO_URL=mongodb+srv://inceptionU:iv3zg3en7kQmPQTt@cluster0.rn8gnex.mongodb.net/` into the .env file)![alt text](img/dotenvimage.png)

 perform the following commands:
`npm install` then
`npm run dev` or `node index.js`

## How do I access the routes
######  Once running the following routes should be available:
- localhost:5000/test
- localhost:5000/ynot (get and post)
- localhost:5000/ynot/:id (get, put, and delete)

you can use any perfered method to test the routes (such as postman)

#### Example with creating a new ynot (post to localhost:5000/ynot)
![alt text](img/createYnot.png)

#### Example with reading a specific ynot (get to localhost:5000/:id)
![alt text](img/readYnot.png)

#### Example with updating a specific ynot (put to localhost:5000/:id)
![alt text](img/updateYnot.png)

#### Example with deleting a specific ynot (delete to localhost:5000/:id)
![alt text](img/deleteYnot.png)

#### Example with listing all ynots (get to localhost:5000/)
![alt text](img/listYnots.png)

#### Example with creating a ynot with invalid input (post to localhost:5000/)
![alt text](img/badCreateYnot.png)