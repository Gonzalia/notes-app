# Notes APP

#### This app was builded with Typescript, using NodeJS, ExpressJS, React and Mongo

## How to run

1. On /frontend folder run `npm i`
2. On /backend folder run `npm i`

- Configurate the database

1. On backend folder create .env file
2. Add the next lines:

```
MONGO_CONNECTION_STRING = stringToConnect to mongo
PORT=5000
SESSION_SECRET=jHducKw&4$dL
```

Then run `npm start` on backend folder and `npm run dev` on frontend folder.

- If you see

```
DATABASE CONNECTED
Server running on port 5000
```

on your terminal, then congratulations! You can start to making sessions and add Notes

In the future, every session can have their own notes, without see the rest of notes
