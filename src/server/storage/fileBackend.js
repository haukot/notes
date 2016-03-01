import fs from 'fs';

function saveStateToFile(filename, data) {
    var filepath = ".saves/" + filename;
    fs.closeSync(fs.openSync(filepath, 'w'));
    fs.writeFile(filepath, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The state was saved! File %s", filename);
    });
}

const fileBackend = {
    save(data) {
        var body = JSON.stringify(data);
        var filename = new Date().toISOString() + "_save.json";
        saveStateToFile(filename, body);
        saveStateToFile("last_save.json", body);
    },

    load() {
        return new Promise((resolve, reject) => {
            let res = JSON.parse(fs.readFileSync(".saves/last_save.json", "utf8"));
            resolve(res);
        });
    }
}

export default fileBackend;
