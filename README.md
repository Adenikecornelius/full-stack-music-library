# 🎵 Full-Stack Music Library

A full-stack music management application developed as part of my
Computer Science & Software Engineering coursework at Maynooth University.

The application allows users to manage artists, albums and songs through
a web interface connected to a REST API and SQLite database.

## ✨ Features

- View artists, albums and songs
- Add new artists, albums and songs
- Edit existing records
- Delete records
- Manage relationships between artists, albums and songs
- Dynamically populate artist and album selections
- Play music through the web interface
- Store application data using SQLite

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- REST API

### Database
- SQLite
- SQL
- Foreign-key relationships

## 🏗️ Architecture

Frontend → REST API → Express Server → SQLite Database

The frontend communicates with the Express backend using asynchronous
Fetch API requests. The backend provides REST endpoints for artists,
albums and songs and performs CRUD operations against the SQLite database.
