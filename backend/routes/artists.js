const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    const sql = "SELECT * FROM artists";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE artist_id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.json(row);
    });
});


router.post("/", (req, res) => {
    const { name, genre, monthly_listeners } = req.body;

    const sql = `
        INSERT INTO artists (name, genre, monthly_listeners)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [name, genre, monthly_listeners], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Artist created",
            artist_id: this.lastID
        });
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, genre, monthly_listeners } = req.body;

    const sql = `
        UPDATE artists
        SET name = ?, genre = ?, monthly_listeners = ?
        WHERE artist_id = ?
    `;

    db.run(sql, [name, genre, monthly_listeners, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Artist updated",
            changes: this.changes
        });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM artists WHERE artist_id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Artist deleted",
            changes: this.changes
        });
    });
});


module.exports = router;