const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// seriving static files
app.use(express.static(__dirname + "/client"));

// requiring routes
const admin = require("../server/routes/adminRouter");
const student = require("../server/routes/studentRouter");


// using avialable routes.
app.use("/admin", admin)
app.use("/student", student)











app.get("/", (req, res) => {
    res.json({
        "message": "Welcome"
    })
})


const port = process.env.NODE_ENV === "production" ?  process.env.PORT : 3000;
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})

