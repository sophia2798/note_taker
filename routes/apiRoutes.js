// DEPENDENCIES
const fs = require("fs");
const path = require("path");

// SET DATA VARIABLES AND PULL FROM DB.JSON
let dbData = fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf8");
dbData = JSON.parse(dbData);

// EXPORT THE ROUTING TO BE PULLED BY INDEX.JS
module.exports = function(app) {
    app.get("/api/notes", function(req,res) {
        res.json(dbData);
    });

    app.post("/api/notes", function(req,res) {
        let newNote = req.body;
        // ADD UNIQUE ID
        let savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf8"));
        let ID = (savedNotes.length).toString();
        newNote.id = ID;
        // ADD NEW NOTE TO EXISTING NOTES
        savedNotes.push(newNote);
        fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify(savedNotes,null,2));
        res.json(savedNotes);
        console.log("Saved new note to database json file");
    });

    // BEFORE DELETE ROUTE IS CREATED, CREATE GET ROUTE FOR ID PARAMETER SO NOTES CAN BE VIEWED BY ID
    app.get("/api/notes/:id", function(req,res) {
        const currentID = req.params.id;
        let savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf8"));
        res.json(savedNotes[currentID]);
    });

    app.delete("/api/notes/:id", function(req,res) {
        const currentID = req.params.id;
        let savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf8"));
        // FUNCTION TO REMOVE NOTE OF CURRENT ID
        for (var i=0;i<savedNotes.length;i++) {
            if (savedNotes[i].id === currentID.toString()) {
                savedNotes.splice(i,1);
            }
        }
        fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify(savedNotes,null,2));
    });
}