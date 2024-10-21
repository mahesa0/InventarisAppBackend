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
| LOGIN | inventaris-app-backend.vercel.app/users/login | POST | USER |
| REGISTER | inventaris-app-backend.vercel.app/users/register | POST | USER |
| LOGOUT | inventaris-app-backend.vercel.app/users/logout | GET | USER |
| GET PROFILE | inventaris-app-backend.vercel.app/users/:username | GET | USER/ADMIN |
| GET ALL PROFILE | inventaris-app-backend.vercel.app/users/get/all | GET | ADMIN |
| UPDATE PROFILE | inventaris-app-backend.vercel.app/users/updateProfile | PUT | USER/ADMIN |
| UPDATE USER BY ID | inventaris-app-backend.vercel.app/users/:id | PUT | ADMIN |
| DELETE PROFILE | inventaris-app-backend.vercel.app/users/deleteProfile | DELETE | USER/ADMIN |
| DELETE USER BY ID | inventaris-app-backend.vercel.app/users/:id | DELETE | ADMIN |

## ROUTES PRODUCTS

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |
| GET ALL PRODUCTS | inventaris-app-backend.vercel.app/products | GET | USER |
| GET PRODUCT BY NAME | inventaris-app-backend.vercel.app/products/:productName | GET | USER |
| POST PRODUCT | inventaris-app-backend.vercel.app/products | POST | USER |
| UPDATE PRODUCTS | inventaris-app-backend.vercel.app/products/:id | PUT | USER/ADMIN |
| DELETE PRODUCTS | inventaris-app-backend.vercel.app/products/:id | DELETE | USER/ADMIN |

