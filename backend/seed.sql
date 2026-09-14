-- ARTISTS
INSERT OR IGNORE INTO artists (artist_id, name, genre, monthly_listeners)
VALUES 
(1, 'Drake', 'Hip Hop', 75000000),
(2, 'Taylor Swift', 'Pop', 90000000);

-- ALBUMS
INSERT OR IGNORE INTO albums (album_id, name, release_year, listens, artist_id)
VALUES
(1, 'Scorpion', 2018, 5000000, 1),
(2, 'CLB', 2021, 4500000, 1),
(3, '1989', 2014, 8000000, 2),
(4, 'Lover', 2019, 6000000, 2),
(5, 'Midnights', 2022, 7000000, 2);

-- SONGS
INSERT OR IGNORE INTO songs (song_id, name, release_year, album_id)
VALUES
(1, 'Gods Plan', 2018, 1),
(2, 'In My Feelings', 2018, 1),
(3, 'Way 2 Sexy', 2021, 2),
(4, 'Champagne Poetry', 2021, 2),
(5, 'Blank Space', 2014, 3),
(6, 'Style', 2014, 3),
(7, 'Lover', 2019, 4),
(8, 'Cruel Summer', 2019, 4),
(9, 'Anti-Hero', 2022, 5),
(10, 'Bejeweled', 2022, 5);