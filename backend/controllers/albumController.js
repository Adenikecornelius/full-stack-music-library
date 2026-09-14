const db = require("../db");
exports.getAllAlbums = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};
exports.getAlbumById = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM albums WHERE album_id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.json(row);
    });
};
exports.createAlbum = (req, res) => {
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
};
exports.updateAlbum = (req, res) => {
    const id = req.params.id;
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
};
exports.deleteAlbum = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM albums WHERE album_id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Album deleted",
            changes: this.changes
        });
    });
};