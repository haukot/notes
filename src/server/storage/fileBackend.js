import fs from 'fs';

const fileBackend = {
    saveStateToFile(filename, data) {
        var filepath = ".saves/" + filename;
        fs.closeSync(fs.openSync(filepath, 'w'));
        fs.writeFile(filepath, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The state was saved! File %s", filename);
        });
    },

    save(data) {
        var body = JSON.stringify(data);
        var filename = new Date().toISOString() + "_save.json";
        this.saveStateToFile(filename, body);
        this.saveStateToFile("last_save.json", body);
    },

    load() {
        return JSON.parse(fs.readFileSync(".saves/last_save.json", "utf8"));
    }
}

export default fileBackend;
