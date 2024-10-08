# Project KKP 
RESTful API for Back-End Inventaris APP

## Installation
```sh
npm install
npm start
```
## Routes

| ACTION | API | METHOD | AUTH |
| ------ | ------ | ------ | ------ |
| LOGIN | localhost:8080/users/login | POST | NO |
| REGISTER | localhost:8080/users/register | POST | NO |
| LOGOUT | localhost:8080/users/logout | GET | NO |
| GET PROFILE | localhost:8080/users/profile | GET | USER/ADMIN |
| GET ALL PROFILE | localhost:8080/users/all | GET | ADMIN |
| UPDATE PROFILE | localhost:8080/users/all | PUT | ADMIN |


