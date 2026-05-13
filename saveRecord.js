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

router.post("/",checkApiKey,(req,res)=>{

    let data = {...req.body};

    const table = data.table;

    const mode = data.mode;

    delete data.table;
    delete data.mode;

    if(mode === "update"){

        const primaryKey =
        Object.keys(data)[0];

        const keyVal =
        data[primaryKey];

        let cols =
        Object.keys(data);

        let updateCols =
        cols.filter(c => c !== primaryKey);

        let vals =
        Object.values(data);

        const setPart =
        cols.map(c=>`${c}=?`).join(",");

        const sql =
        `UPDATE ${table}
        SET ${setPart}
        WHERE ${primaryKey}=?`;

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
    }
    else{

        let cols =
        Object.keys(data);

        let vals =
        Object.values(data);

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
    }
});

module.exports = router;