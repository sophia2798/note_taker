// DEPENDENCIES
const fs = require("fs");

// SET DATA VARIABLES AND PULL FROM DB.JSON
let dbData = fs.readFileSync("./db/db.json","utf8");
dbData = JSON.parse(dbData);
console.log(dbData);

// EXPORT THE ROUTING TO BE PULLED BY INDEX.JS
module.exports = function(app) {

    const writeJSON = data => {
        data = JSON.stringify(data);
        fs.writeFileSync("./db/db.json", data, function(err) {
            if (err) {
                return console.log(err);
            }
        })
    };

    app.get("/api/notes", function(req,res) {
        res.json(dbData);
    });

    app.post("/api/notes", function(req,res) {
        let newNote = req.body;
        // ADD UNIQUE ID
        let ID = (dbData.length).toString();
        newNote.id = ID;
        // ADD NEW NOTE TO EXISTING NOTES
        dbData.push(newNote);
        writeJSON(dbData);
        res.json(newNote);
        console.log("Saved new note to database json file");
    });

    // BEFORE DELETE ROUTE IS CREATED, CREATE GET ROUTE FOR ID PARAMETER SO NOTES CAN BE VIEWED BY ID
    app.get("/api/notes/:id", function(req,res) {
        let currentID = req.params.id;
        res.json(dbData[currentID]);
        console.log(`You are viewing your note of ID ${currentID}`);
    });

    app.delete("/api/notes/:id", function(req,res) {
        let currentID = req.params.id;
        // FUNCTION TO REMOVE NOTE OF CURRENT ID
        for (var i=0;i<dbData.length;i++) {
            if (dbData[i].id === currentID.toString()) {
                dbData.splice(i,1);
                console.log(`Deleting note of ID ${i}`);
                res.send(dbData[i]);
                break;
            }
        }
        writeJSON(dbData);
    });
}