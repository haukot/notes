import sqlite3 from 'sqlite3';

function getConn() {
    let filePath = './.saves/save.db';
    var db = new sqlite3.Database(filePath);
    return db;
}

function dbPromise(dbFun) {
    return new Promise((resolve, reject) => {
        dbFun((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
}

const save = (data) => {
    const db = getConn();
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS saves (state TEXT, date TEXT)");
            db.run("CREATE TABLE IF NOT EXISTS snapshots (state TEXT, date TEXT)");

            let jsonData = JSON.stringify(data);
            let date = new Date().toISOString();
            let insertParams = {1: jsonData, 2: date};
            dbPromise((c) => db.run("INSERT OR REPLACE INTO saves VALUES (?,?)", insertParams, c))
                .then(() => {
                    return dbPromise((c) =>
                                     db.run("INSERT OR REPLACE INTO snapshots VALUES (?,?)",
                                            insertParams, c))
                })
                .then(() => {resolve(); db.close()})
                .catch((err) => {reject(err); db.close()});
        });
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
