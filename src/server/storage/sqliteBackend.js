import sqlite3 from 'sqlite3';

function getConn() {
    let filePath = './.saves/save.db';
    var db = new sqlite3.Database(filePath);
    return db;
}

const save = (data) => {
    const db = getConn();
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS saves (state TEXT, date TEXT)");

            var stmt = db.prepare("INSERT INTO saves VALUES (?,?)");
            stmt.run(JSON.stringify(data), new Date().toISOString());
            stmt.finalize();
            resolve();
        });
        db.close();
    });
}

const load = () => {
    const db = getConn();
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS saves (state TEXT, date TEXT)");

            db.get("SELECT state FROM saves ORDER BY date DESC LIMIT 1", function(err, row) {
                if (err) reject(err);
                let result = row ? JSON.parse(row.state) : null;
                resolve(result);
            });
        });
        db.close();
    });
}

export default {load, save};
