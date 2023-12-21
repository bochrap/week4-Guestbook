import database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS guestbook (
    username TEXT,
    message TEXT,
    reaction TEXT,
    likes INT
)`);

db.exec(
  `INSERT INTO guestbook (username, message, reaction, likes) VALUES ('Filip', 'Wow, such a guestbook', '😍', '1000')`
);
