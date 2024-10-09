# Project KKP 
RESTful API untuk Back-End Inventaris APP

## Installation
```sh
npm install
npm start
```

> Tambahkan file .env untuk Environment Variables dan isi (JWT_SECRET = mysecretkey) dan PORT, MONGODB_URI dengan milikmu sendiri

## ROUTES USERS

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |
| LOGIN | localhost:8080/users/login | POST | NO |
| REGISTER | localhost:8080/users/register | POST | NO |
| LOGOUT | localhost:8080/users/logout | GET | NO |
| GET PROFILE | localhost:8080/users/profile | GET | USER/ADMIN |
| GET ALL PROFILE | localhost:8080/users/all | GET | ADMIN |
| UPDATE PROFILE | localhost:8080/users/updateProfile | PUT | USER/ADMIN |
| UPDATE USER BY ID | localhost:8080/users/:id | PUT | ADMIN |
| DELETE PROFILE | localhost:8080/users/deleteProfile | DELETE | ADMIN |
| DELETE USER BY ID | localhost:8080/users/:id | DELETE | ADMIN |

## ROUTES PRODUCTS

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |

