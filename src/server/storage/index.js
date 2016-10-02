import fileBackend from './fileBackend';
import sqliteBackend from './sqliteBackend';


function catchPromise(promise, callback, callbackFailure) {
    promise.then((data) => {
        console.log("Success!");
        callback(data);
    }).catch((err) => {
        console.error("Error!", err);
        callbackFailure();
    });
}

// TODO мб промисы использовать?
const save = (data, callback, callbackFailure) => {
    console.log("Save state");
    try {
        let res = sqliteBackend.save(data);
        if (res && res.then) {
            catchPromise(res, callback, callbackFailure);
        }
    } catch (ex) {
        console.error(ex);
        callbackFailure();
    }
}

const load = (callback, callbackFailure) => {
    console.log('Load state');
    return fileBackend.load().then((res) => {
        return res;
    }, (err) => {
        console.error('Error!', err);
        return new Promise().reject();
    });
};

export default {load, save};
