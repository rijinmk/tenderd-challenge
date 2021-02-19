const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");  

// Setting up Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());  

const PORT = 5000; 
app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`);
});
