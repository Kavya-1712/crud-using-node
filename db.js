const mysql = require("mysql2");

const con = mysql.createConnection({

    host:"127.0.0.1",
    user:"kavya1",
    password:"Kavya1@##$$$",
    database:"dbKavya1"

});

con.connect((err)=>{

    if(err){
        console.log(err);
    }
    else{
        console.log("MySQL Connected");
    }

});

module.exports = con;