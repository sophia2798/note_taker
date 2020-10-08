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

// FOR STYLING, LOOK FOR FILE CALLED PUBLIC
app.use(express.static("public"));

