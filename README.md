# LearnEX Restful service

LearnEX Restful service
The service provides functionality to manage student affairs.
It allows you to get access to student details.
It allows you to send emails to students

## Getting Started

- git clonehttps://github.com/Collins33/learnEX-backend.git
- cd into the project folder
- run `npm install`

## Setting up mongo Atlas

- create an account on mongo DB atlas
- create a mongo atlas database
- ensure the IP security settings allow connctions from everywhere
- copy the connection url given to you.
- create nodemon.json file
- add the database connection given to you

```
  "MONGO_DATABASE_URL": "database url given"
```

- Contact me for credentials for using on the spreadsheet functionality

## Starting the application

Ensure the following is done before starting the server:

## Setting up spreadsheets

- Go to google account and generate credentials for your google account
- create .env file
- add the following

```
    "GOOGLE_SHEETS_KEY": "",
    "CLIENT_EMAIL": "",
    "EMAIL_USER": "",
    "EMAIL_PASSWORD": "",
    "PRIVATE_KEY": ""
```

- run `npm start`

## Running the tests

- create test database on mongo atlas
- ensure the IP security settings allow connctions from everywhere
- save the database url given

```
"MONGO_DATABASE_TEST_URL":"test database url given"
```

- run `npm test`

## endpoints

| Endpoint                        |                   FUNCTIONALITY                    |
| ------------------------------- | :------------------------------------------------: |
| GET /api/v1/emails/send         |       This will send emails to the students        |
| GET /api/V1/students            |         Get information about the students         |
| GET /api/V1/students/:studentId | This will get information about a specific student |

## Built With

- [NODE/EXPRESS](https://expressjs.com/) - The web framework used
- [npm](https://www.npmjs.com/) - Dependency Management
- [Mongo Atlas](https://www.mongodb.com/cloud/atlas)-Database

## Authors

- **COLLINS NJAU MURU**

## License

This project is licensed under the MIT License
