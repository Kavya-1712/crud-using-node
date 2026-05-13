const express = require("express");

const router = express.Router();

const con = require("../db");

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

router.get("/",checkApiKey,(req,res)=>{

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

module.exports = router;