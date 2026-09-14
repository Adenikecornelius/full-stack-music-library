const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


router.get("/:id", (req, res) => {
    db.get(
        "SELECT * FROM songs WHERE song_id = ?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });

            if (!row) {
                return res.status(404).json({ message: "Song not found" });
            }

            res.json(row);
        }
    );
});


router.post("/", (req, res) => {
    const { name, release_year, album_id } = req.body;

    const sql = `
        INSERT INTO songs (name, release_year, album_id)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [name, release_year, album_id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            message: "Song created",
            song_id: this.lastID
        });
    });
});

router.put("/:id", (req, res) => {
    const { name, release_year, album_id } = req.body;

    const sql = `
        UPDATE songs
        SET name = ?, release_year = ?, album_id = ?
        WHERE song_id = ?
    `;

    db.run(sql, [name, release_year, album_id, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            message: "Song updated",
            changes: this.changes
        });
    });
});

router.delete("/:id", (req, res) => {
    db.run(
        "DELETE FROM songs WHERE song_id = ?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                message: "Song deleted",
                changes: this.changes
            });
        }
    );
});

module.exports = router;