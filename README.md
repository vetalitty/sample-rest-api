# sample-rest-api

This is the program which can using for authenticate users into the system.

There are few middlewares: 
- for admin
- for all users
- without authenticate

The main provider of authenticate is JWT. I using it because this is stateless auth. 
It allows running a few server instances, for example in the docker swarm, kubernetes or something else.

Each request contains JWT token in headers. Like 'authorization': 

`JWT ${token}` or `Bearer ${token}`

Server receiving this request and decode jwt token. If signature is okay then request will be proccessing, else unauthorized.

# How to install
1. ```yarn```
2. ```yarn start```

# Guide
You can use postman or something else to send the requests. 
Body should be urlencoded format or json.

## (POST) Login user
URL:
`http://127.0.0.1:3333/v1/user/login`

body: 

`username: admin`

`password: root`

As you can see 
## (POST) Register user
URL:
`http://127.0.0.1:3333/v1/user/register`

body: 

`username: newuser`

`password: qwerty`

## (GET) Private route
URL:
`http://127.0.0.1:3333/v1/private`

headers: 

`Authorization: 'JWT your_token_here'`

## (GET) Public route
URL:
`http://127.0.0.1:3333/v1/public`
