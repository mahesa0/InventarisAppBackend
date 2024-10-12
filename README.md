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
| LOGIN | localhost:8080/users/login | POST | USER |
| REGISTER | localhost:8080/users/register | POST | USER |
| LOGOUT | localhost:8080/users/logout | GET | USER |
| GET PROFILE | localhost:8080/users/:username | GET | USER/ADMIN |
| GET ALL PROFILE | localhost:8080/users/all | GET | ADMIN |
| UPDATE PROFILE | localhost:8080/users/updateProfile | PUT | USER/ADMIN |
| UPDATE USER BY ID | localhost:8080/users/:id | PUT | ADMIN |
| DELETE PROFILE | localhost:8080/users/deleteProfile | DELETE | USER/ADMIN |
| DELETE USER BY ID | localhost:8080/users/:id | DELETE | ADMIN |

## ROUTES PRODUCTS

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |
| GET ALL PRODUCTS | localhost:8080/products | GET | USER |
| GET PRODUCT BY NAME | localhost:8080/products/:productName | GET | USER |
| POST PRODUCT | localhost:8080/products | POST | USER |
| UPDATE PRODUCTS | localhost:8080/products/:id | PUT | USER/ADMIN |
| DELETE PRODUCTS | localhost:8080/products/:id | DELETE | USER/ADMIN |

