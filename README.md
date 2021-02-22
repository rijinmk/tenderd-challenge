# Tenderd Full-Stack Web App Challenge

## Running the App

After cloning the project run this command on the cloned folder: 

**Note: I have send the `.env` files through mail, please paste them in the `/server` folder `/client` respectively.**

```
cd server && npm i && nodemon index.js
```

This is to run the NodeJS Server

After this we have to run the React App server, for that run this command **on another terminal of the cloned project folder**: 

```
cd client && npm i && npm start
```

If the server doesn't run, click on this link: [localhost](http://localhost:3000/signin)

Installation process [Video](https://github.com/rijinmk/tenderd-challenge/raw/main/Tendered%20Demo.mp4)

Also watch this video if things are not working properly or if the UX is confusing: [Video](https://github.com/rijinmk/tenderd-challenge/blob/main/Tendered%20Demo.mp4?raw=true)

## Gulp Tasks

- `css-css-libraries`
  - This takes all the CSS files from the public folder
  - Then minifies, concats, creates `libraries.styles.min.css` and places it in `/src` folder

- `scss-css-components`
  - This takes all the SCSS files that styles the React Components
  - Then it converts it all into CSS
  - It's concatinates after the library CSS (bootstrap,...which ever libraries), so that the libraries are given priority to run first
  - Then minifies, concats, creates `component.styles.min.css` and places it in the react `/src` folder

- `combine-css`
  - This combines the files created above
  - Into one big bundle of CSS, `bundle.min.css`
  - Then deletes the `libraries.styles.min.css` and `component.styles.min.css`
  - Then places `bundle.min.css` in the react `/src` folder

- `clean-bundle`
  - This task deletes the old `bundle.min.css` for the incoming new `bundle.min.css`

- `watch`
  - This task watches all the above tasks whenever a change is made in any of the SCSS files

## React File Structure

The pages folder uses the components in the components folder to build its app, I used this structure to add a layer of abstraction while making each component and not be bothered by other component / pages code. 

![](https://raw.githubusercontent.com/rijinmk/image-store/main/file-structure.jpg)

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

The routes for the API can be found in: `server\routes\company.js`

The functionality of the API can be found in: `server\controller\company.js`

They are prefixed with `/api/company/`

- 🟩 `GET` /api/company/**all**
  - Get all the company information

- 🟩 `GET` /api/company/select/**:companyID**
  - Looks something like this: `/api/company/select/34h39i93j9dj...`
  - Get a specific company information

### Requests API

The routes for the API can be found in: `server\routes\request.js`

The functionality of the API can be found in: `server\controller\request.js`

They are prefixed with `/api/request/`

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
  
  
## DB Schema
  
### Companies

- id (auto-id by firebase)
  - image (string)
  - name (string)
  - requests (array of references)  

![](https://raw.githubusercontent.com/rijinmk/image-store/main/company-firestore.jpg)

---

### Requests

- id (NodeJS uuid)
  - assignedBy (string)
  - assignedTo (string)
  - description (string)  
  - status (string)
  - type (string)
  - requestID (string - reference)
  - history (array)

![](https://raw.githubusercontent.com/rijinmk/image-store/main/request.jpg)

---

### Users

- id (NodeJS - email-id)
  - company (string reference)
  - email (string)
  - name (string)  
  - requestsThatAreAssignedToYou (array or maps)
  - requestsThatYouAssigned (array of maps)

![](https://raw.githubusercontent.com/rijinmk/image-store/main/users.jpg)
  
  
  
