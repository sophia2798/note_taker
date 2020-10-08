// DEPENDENCIES
const express = require("express");
const path = require("path");
const fs = require("fs");

// SET UP EXPRESS APP
const app = express();
const PORT = process.env.PORT || 8080;

// SET UP EXPRESS APP TO HANDLE DATA PARSING
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ROUTER TO POINT SERVER TOWARDS ROUTE FILES
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})