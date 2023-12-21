import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT,
    reaction TEXT,
    likes INT
)`);

db.exec(
  `INSERT INTO guestbook (username, message, reaction) VALUES
('Filip', 'Wow, such a guestbook', '😍'),
('notFilip', 'Wow, such a guestbook', '🥲'),
('ALSOnotFilip', 'Wow, such a guestbook', '😡'),
('!Filip', 'Wow, such a guestbook', '😀')`
);
