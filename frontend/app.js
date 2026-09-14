const ARTIST_API = "http://localhost:5000/artists";
const ALBUM_API = "http://localhost:5000/albums";
const SONG_API = "http://localhost:5000/songs";


async function loadArtists() {
    const table = document.getElementById("artistTable");
    if (!table) return;

    const res = await fetch(ARTIST_API);
    const data = await res.json();

    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.artist_id}</td>
                <td>${a.name}</td>
                <td>${a.genre}</td>
                <td>${a.monthly_listeners}</td>
                <td>
                    <button onclick="editArtist(${a.artist_id}, '${a.name}', '${a.genre}', ${a.monthly_listeners})">Edit</button>
                    <button onclick="deleteArtist(${a.artist_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function createArtist() {
    const name = document.getElementById("artist-name").value;
    const genre = document.getElementById("artist-genre").value;
    const listeners = document.getElementById("artist-listeners").value;

    await fetch(ARTIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            genre,
            monthly_listeners: Number(listeners)
        })
    });

    loadArtists();
}

async function editArtist(id, name, genre, listeners) {
    const newName = prompt("Edit name:", name);
    const newGenre = prompt("Edit genre:", genre);
    const newListeners = prompt("Edit listeners:", listeners);

    await fetch(`${ARTIST_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            genre: newGenre,
            monthly_listeners: Number(newListeners)
        })
    });

    loadArtists();
}

async function deleteArtist(id) {
    await fetch(`${ARTIST_API}/${id}`, { method: "DELETE" });
    loadArtists();
}


async function loadAlbums() {
    const table = document.getElementById("albumTable");
    if (!table) return;

    const res = await fetch(ALBUM_API);
    const data = await res.json();

    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.album_id}</td>
                <td>${a.name}</td>
                <td>${a.release_year}</td>
                <td>${a.listens}</td>
                <td>${a.artist_id}</td>
                <td>
                    <button onclick="editAlbum(${a.album_id}, '${a.name}', ${a.release_year}, ${a.listens}, ${a.artist_id})">Edit</button>
                    <button onclick="deleteAlbum(${a.album_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function createAlbum() {
    const name = document.getElementById("album-name").value;
    const year = document.getElementById("album-year").value;
    const listens = document.getElementById("album-listens").value;
    const artist_id = document.getElementById("album-artist-id").value;

    await fetch(ALBUM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            release_year: Number(year),
            listens: Number(listens),
            artist_id: Number(artist_id)
        })
    });

    loadAlbums();
}

async function editAlbum(id, name, year, listens, artist_id) {
    const newName = prompt("Edit name:", name);
    const newYear = prompt("Edit year:", year);
    const newListens = prompt("Edit listens:", listens);
    const newArtist = prompt("Edit artist ID:", artist_id);

    await fetch(`${ALBUM_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            release_year: Number(newYear),
            listens: Number(newListens),
            artist_id: Number(newArtist)
        })
    });

    loadAlbums();
}

async function deleteAlbum(id) {
    await fetch(`${ALBUM_API}/${id}`, { method: "DELETE" });
    loadAlbums();
}


async function loadSongs() {
    const table = document.getElementById("songTable");
    if (!table) return;

    const res = await fetch(SONG_API);
    const data = await res.json();

    table.innerHTML = "";

    data.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.song_id}</td>
                <td>${s.name}</td>
                <td>${s.release_year}</td>
                <td>${s.album_id}</td>
                <td>
                    <button onclick="editSong(${s.song_id}, '${s.name}', ${s.release_year}, ${s.album_id})">Edit</button>
                    <button onclick="deleteSong(${s.song_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function createSong() {
    const name = document.getElementById("song-name").value;
    const year = document.getElementById("song-year").value;
    const album_id = document.getElementById("song-album-id").value;

    await fetch(SONG_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            release_year: Number(year),
            album_id: Number(album_id)
        })
    });

    loadSongs();
}

async function editSong(id, name, year, album_id) {
    const newName = prompt("Edit name:", name);
    const newYear = prompt("Edit year:", year);
    const newAlbum = prompt("Edit album ID:", album_id);

    await fetch(`${SONG_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            release_year: Number(newYear),
            album_id: Number(newAlbum)
        })
    });

    loadSongs();
}

async function deleteSong(id) {
    await fetch(`${SONG_API}/${id}`, { method: "DELETE" });
    loadSongs();
}

async function loadArtistDropdown() {
    const dropdown = document.getElementById("album-artist-id");
    if (!dropdown) return;

    const res = await fetch(ARTIST_API);
    const data = await res.json();

    dropdown.innerHTML = "";

    data.forEach(a => {
        dropdown.innerHTML += `
            <option value="${a.artist_id}">
                ${a.name}
            </option>
        `;
    });
}

async function loadAlbumDropdown() {
    const dropdown = document.getElementById("song-album-id");
    if (!dropdown) return;

    const res = await fetch(ALBUM_API);
    const data = await res.json();

    dropdown.innerHTML = "";

    data.forEach(a => {
        dropdown.innerHTML += `
            <option value="${a.album_id}">
                ${a.name}
            </option>
        `;
    });
}


loadArtists();
loadAlbums();
loadSongs();
loadArtistDropdown();
loadAlbumDropdown();