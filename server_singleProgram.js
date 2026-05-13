// server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

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


// API KEY

function checkApiKey(req,res,next){

    const apiKey = req.headers["x-api-key"];

    if(apiKey !== "kavya123"){

        return res.json({
            status:0,
            error:"Invalid API Key"
        });
    }

    next();
}



// SHOW ALL

app.get("/showAll",checkApiKey,(req,res)=>{

    const table = req.query.table;

    con.query(
        `SELECT * FROM ${table}`,
        (err,rows,fields)=>{

            if(err){

                return res.json({
                    status:0,
                    error:err.message
                });
            }

            let columns =
            fields.map(f=>f.name);

            res.json({
                status:1,
                columns:columns,
                rows:rows
            });

        }
    );

});



// SAVE RECORD

app.post("/saveRecord",checkApiKey,(req,res)=>{

    const data = req.body;

    const table = data.table;

    delete data.table;

    const cols = Object.keys(data);

    const vals = Object.values(data);

    const sql =
    `INSERT INTO ${table}
    (${cols.join(",")})
    VALUES
    (${cols.map(()=>"?").join(",")})`;

    con.query(sql,vals,(err)=>{

        if(err){

            return res.json({
                status:0,
                error:err.message
            });
        }

        res.json({
            status:1,
            message:"Saved"
        });

    });

});




// UPDATE RECORD

app.post("/updateRecord",checkApiKey,(req,res)=>{

    const data = req.body;

    const table = data.table;

    const key = data.key;

    const keyVal = data.keyVal;

    delete data.table;
    delete data.key;
    delete data.keyVal;

    const cols = Object.keys(data);

    const vals = Object.values(data);

    const setPart =
    cols.map(c=>`${c}=?`).join(",");

    const sql =
    `UPDATE ${table}
    SET ${setPart}
    WHERE ${key}=?`;

    vals.push(keyVal);

    con.query(sql,vals,(err)=>{

        if(err){

            return res.json({
                status:0,
                error:err.message
            });
        }

        res.json({
            status:1,
            message:"Updated"
        });

    });

});




// DELETE RECORD

app.get("/deleteRecord",checkApiKey,(req,res)=>{

    const table = req.query.table;

    const idCol = req.query.idCol;

    const idVal = req.query.idVal;

    const sql =
    `DELETE FROM ${table}
    WHERE ${idCol}=?`;

    con.query(sql,[idVal],(err)=>{

        if(err){

            return res.json({
                status:0,
                error:err.message
            });
        }

        res.json({
            status:1,
            message:"Deleted"
        });

    });

});



app.listen(4000,()=>{

    console.log("Server Running On Port 4000");

});