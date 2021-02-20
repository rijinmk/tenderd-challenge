const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");  

// Routes for the APIs
const companyRoutes = require("./routes/companies"); 
const userRoutes = require("./routes/users"); 

// Setting up Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));  

app.use('/api/company', companyRoutes.routes); 
app.use('/api/user', userRoutes.routes); 

const PORT = 5000; 
app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`);
});
