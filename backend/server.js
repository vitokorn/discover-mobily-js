const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path = __dirname + '/views/'

app.use(express.static(path))

var corsOptions = {
    origin: "http://localhost:5555"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {

    res.json({ message: "Welcome to DM." });
});

require("./routers/user.router.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.sequelize.sync();