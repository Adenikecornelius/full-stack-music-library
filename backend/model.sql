PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT,
    monthly_listeners INTEGER
);

CREATE TABLE IF NOT EXISTS albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER,
    listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);

-- SEED DATA

-- ARTISTS (2 minimum)
INSERT INTO artists (name, genre, monthly_listeners)
VALUES 
('Drake', 'Hip Hop', 50000000),
('Beyoncé', 'Pop', 45000000);

-- ALBUMS (5 minimum)
INSERT INTO albums (name, release_year, listens, artist_id)
VALUES
('Scorpion', 2018, 1000000, 1),
('Certified Lover Boy', 2021, 2000000, 1),
('Renaissance', 2022, 3000000, 2),
('Lemonade', 2016, 2500000, 2),
('Views', 2016, 1500000, 1);

-- SONGS (10 minimum)
INSERT INTO songs (name, release_year, album_id)
VALUES
('God’s Plan', 2018, 1),
('Nice For What', 2018, 1),
('Champagne Poetry', 2021, 2),
('Hotline Bling', 2015, 5),
('Energy', 2022, 3),
('Break My Soul', 2022, 3),
('Alien Superstar', 2022, 3),
('Formation', 2016, 4),
('Love On Top', 2011, 4),
('Freedom', 2016, 4);