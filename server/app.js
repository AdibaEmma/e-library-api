const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// seriving static files
app.use(express.static(__dirname + "/client"));

// requiring routes
const admin = require("./routes/adminRouter");


app.use("/api", admin)











app.get("/", (req, res) => {
    res.json({
        "message": "Welcome"
    })
})


const PORT = process.env.NODE_ENV === "local" ?  process.env.port : 3000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})

