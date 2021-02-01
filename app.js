const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// middleware 
app.use(express.static(__dirname + "/client"));
app.use(cookieParser());
// requiring routes
const admin = require("./routes/adminRouter");
const student = require("./routes/studentRouter");
const books = require("./routes/booksRouter")


// using avialable routes.
app.use("/api", admin)
app.use("/api", student)
app.use("/api", books)







app.get("/", (req, res) => {
    res.send("Welcome")
})


const port = process.env.NODE_ENV === "production" ?  process.env.PORT : 3000;
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})

