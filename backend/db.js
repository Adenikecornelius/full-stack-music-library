const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const db = new sqlite3.Database("./data/app.db", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");

        const schema = fs.readFileSync(
            path.join(__dirname, "model.sql"),
            "utf-8"
        );

        const seed = fs.readFileSync(
            path.join(__dirname, "seed.sql"),
            "utf-8"
        );

        db.serialize(() => {
            db.exec("PRAGMA foreign_keys = ON;");

            // Create tables
            db.exec(schema, (err) => {
                if (err) {
                    console.log("Schema error:", err.message);
                } else {
                    console.log("Database initialized");
                }
            });

      
            db.exec(seed, (err) => {
                if (err) {
                    console.log("Seed error (ignore if already exists):", err.message);
                } else {
                    console.log("Database seeded");
                }
            });
        });
    }
});

module.exports = db;