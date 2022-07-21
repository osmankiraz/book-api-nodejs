let express = require("express");
let bodyParser = require("body-parser");
require('./db/connection')

const dotenv = require("dotenv").config();
let cors = require("cors");

let port = process.env.port;


let app = new express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res) =>{
    res.send("hello world ! ")
})

app.listen(port,()=>{
    console.log(`Server ${port} portundan çalıştı!` );
})