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

module.exports = router;