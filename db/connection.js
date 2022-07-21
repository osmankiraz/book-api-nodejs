let mongoose = require("mongoose");
const dotenv = require("dotenv").config();

let dbCon=process.env.mongodb_cloud_connection
const connection=mongoose.connect(dbCon,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log("veritabanına bağlanıldı"))
.catch((hata) => console.log("db bağlantısında hata! => ", hata));

exports.connection=connection;