const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const artistRoutes = require("./routes/artists");
const albumRoutes = require("./routes/albums");
const songRoutes = require("./routes/songs");

app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/songs", songRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));