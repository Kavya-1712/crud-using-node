//server.js
const express = require("express");

const path = require("path");

const cors = require("cors");

const showAll =
require("./routes/showAll");

const saveRecord =
require("./routes/saveRecord");

const deleteRecord =
require("./routes/deleteRecord");

const app = express();

app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname,"public")
    )
);

app.use("/showAll",showAll);

app.use("/saveRecord",saveRecord);

app.use("/deleteRecord",deleteRecord);

app.listen(4000,()=>{
    console.log(
    "Server Running On Port 4000."
    );
});
