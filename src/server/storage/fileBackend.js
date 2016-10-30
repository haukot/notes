import fs from 'fs';

function saveStateToFile(filename, data) {
    var filepath = '.saves/' + filename;
    fs.closeSync(fs.openSync(filepath, 'w'));
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, function(err) {
            if(err) {
                return reject(err);
            }
            console.log('The state was saved! File %s', filename);
            return resolve();
        });
    });
}

const fileBackend = {
    save(data) {
        var body = JSON.stringify(data);
        var filename = new Date().toISOString() + '_save.json';
        return saveStateToFile(filename, body).then(() => {
            return saveStateToFile('last_save.json', body);
        });
    },

    load() {
        return new Promise((resolve, reject) => {
            let res = JSON.parse(fs.readFileSync('.saves/last_save.json', 'utf8'));
            resolve(res);
        });
    },
};

export default fileBackend;
