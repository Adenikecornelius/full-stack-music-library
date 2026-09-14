const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
    const sql = "SELECT * FROM albums";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


router.get("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE album_id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json(row);
    });
});


router.post("/", (req, res) => {
    const { name, release_year, listens, artist_id } = req.body;

    const sql = `
        INSERT INTO albums (name, release_year, listens, artist_id)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [name, release_year, listens, artist_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Album created",
            album_id: this.lastID
        });
    });
});


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, release_year, listens, artist_id } = req.body;

    const sql = `
        UPDATE albums
        SET name = ?, release_year = ?, listens = ?, artist_id = ?
        WHERE album_id = ?
    `;

    db.run(sql, [name, release_year, listens, artist_id, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Album updated",
            changes: this.changes
        });
    });
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM albums WHERE album_id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Album deleted",
            changes: this.changes
        });
    });
});


module.exports = router;