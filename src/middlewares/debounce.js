import _ from 'lodash';

let debouncedFuns = {};

function flushDebounced() {
    Object.keys(debouncedFuns).map((k) => {
        let deb = debouncedFuns[k]
        if (!deb.flushed) {
            deb.fun.flush();
            deb.flushed = true;
        }
    });
}
// many copy from https://github.com/ryanseddon/redux-debounced/blob/master/src/index.js
export default () => dispatch => action => {
    const {
        meta: { debounce={} }={},
        type
    } = action;

    const {
        time,
        key = type
    } = debounce;

    return dispatch(action);
    // if (type == "@@redux-undo/UNDO") console.log(type);
    if (!time || !key) {
        flushDebounced();
        return dispatch(action);
    }

    if (!debouncedFuns[key]) {
        // let fun = (action) => { console.info('debounced dispatch', action.attrs.title); return dispatch(action) };
        debouncedFuns[key] = {
            fun: _.debounce(dispatch, time),
            flushed: false
        };
    }

    debouncedFuns[key].flushed = false;
    debouncedFuns[key].fun(action);
};
