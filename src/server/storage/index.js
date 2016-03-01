import fileBackend from './fileBackend';

const save = (data) => {
    console.log("Save state");
    fileBackend.save(data);
}

const load = () => {
    console.log("Load state");
    return fileBackend.load();
}

export default {load, save};
