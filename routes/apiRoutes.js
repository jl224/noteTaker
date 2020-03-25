// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var fs = require("fs");
var db;
fs.readFile("db/db.json", "utf8", function (err, data) {
    db = JSON.parse(data)

})

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        console.log("api.get")

        res.json(db);

    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        console.log("app.post", req.body)

        var newID
        if (db.length === 0) {
            newID = 1
        } else {
            newID = parseInt(db[db.length - 1].id) + 1
        }
        // how we add an id before create the note
        req.body.id = newID
        db.push(req.body)

        fs.writeFile("db/db.json", JSON.stringify(db), function (err, data) {
            res.json(db)

        })




    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.delete("/api/notes/:id", function (req, res) {
        console.log("app.put", req.params.id)

        // how we can delete
        var newDB = []
        for (var i = 0; i < db.length; i++) {
            if (db[i].id !== parseInt(req.params.id)) {
                newDB.push(db[i])
            }
        }
        db = newDB


        fs.writeFile("db/db.json", JSON.stringify(db), function (err, data) {
            res.json(db)

        })

    });
    ;
};
