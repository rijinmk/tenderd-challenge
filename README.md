# Tendered Full-Stack Web App Challenge

## Running the App

After cloning the project run this command on the cloned folder: 

```
cd server && npm i && nodemon index.js
```

This is to run the NodeJS Server

After this we have to run the React App server, for that run this command **on another terminal of the cloned project folder**: 

```
cd client && npm i && npm start
```

If the server doesn't run, click on this link: [localhost](http://localhost:3000/signin)

Also watch this video if things are not working properly or if the UX is confusing: [Video](https://github.com/rijinmk/tenderd-challenge/blob/main/Tendered%20Demo.mp4?raw=true)

## API

### Users API

The routes for the API can be found in: `server\routes\users.js`

The functionality of the API can be found in: `server\controller\users.js`

They are prefixed with `/api/users/`

- 🟩 `GET` /api/user/**all**
  - Get all the users information

- 🟩 `GET` /api/user/user/**:email**
  - Looks something like this: `/api/user/user/john@gmail.com`
  - Get a specific user information

- 🟨 `POST` /api/user/**add**
  - When the user logs-in their information is added to the users collection in the firestore
  - `{"name": "name", "email": "email","company": "company"}`
     
- 🟨 `POST` /api/users/**hasCompany**
  - When the user logs-in initially, they have to select a company
  - This API checks is the user has assigned any company to themself
  - `{"email": "users email id"}`

- 🟨 `POST` /api/users/**setCompany**
  - After the users selects a company
  - `{user: currentUser.email, companyID: selectedID}`

### Companies API

- 🟩 `GET` /api/company/**all**
  - Get all the company information

- 🟩 `GET` /api/company/select/**:companyID**
  - Looks something like this: `/api/company/select/34h39i93j9dj...`
  - Get a specific company information

### Requests API

- 🟩 `GET` /api/request/**add**
  - Add a requests
  - The information is sent through query variables

- 🟩 `GET` /api/request/company/**:companyID**
  - Looks something like this: `/api/request/company/34h39i93j9dj...`
  - Get a specific company requests information

- 🟩 `GET` /api/request/**edit**
  - Add a request
  - The information is sent through query variables

- 🟩 `GET` /api/request/**:requestID**
  - Looks something like this: `/api/request/34h39i93j9dj...`
  - Get a specific request information
