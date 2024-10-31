# Project KKP 
RESTful API untuk Back-End Inventaris APP menggunakan tools nodeJS, expressJS, mongodb, dan firebase 

## Installation
```sh
npm install
npm start
```

> Tambahkan file .env untuk Environment Variables dan isi (JWT_SECRET = mysecretkey), MONGODB_URI dan service account firebase dengan milikmu sendiri

## ROUTES USERS

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |
| LOGIN | http://localhost:8080/users/login | POST | USER |
| REGISTER | http://localhost:8080/users/register | POST | USER |
| LOGOUT | http://localhost:8080/users/logout | GET | USER |
| GET PROFILE | http://localhost:8080/users/:username | GET | USER/ADMIN |
| GET ALL PROFILE | http://localhost:8080/users/get/all | GET | ADMIN |
| UPDATE PROFILE | http://localhost:8080/users/updateProfile | PUT | USER/ADMIN |
| UPDATE USER BY ID | http://localhost:8080/users/:id | PUT | ADMIN |
| DELETE PROFILE | http://localhost:8080/users/deleteProfile | DELETE | USER/ADMIN |
| DELETE USER BY ID | http://localhost:8080/users/:id | DELETE | ADMIN |

## ROUTES PRODUCTS

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |
| GET ALL PRODUCTS | http://localhost:8080/products | GET | USER |
| GET PRODUCT BY NAME | http://localhost:8080/products/:productName | GET | USER |
| POST PRODUCT | http://localhost:8080/products | POST | USER |
| UPDATE PRODUCTS | http://localhost:8080/products/:id | PUT | USER/ADMIN |
| DELETE PRODUCTS | http://localhost:8080/products/:id | DELETE | USER/ADMIN |

