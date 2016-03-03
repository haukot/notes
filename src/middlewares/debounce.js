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

    if (!time || !key) {
        flushDebounced();
        return dispatch(action);
    }

    if (!debouncedFuns[key]) {
        debouncedFuns[key] = {
            fun: _.throttle(dispatch, time),
            flushed: false
        };
    }

    debouncedFuns[key].flushed = false;
    debouncedFuns[key].fun(action);
};
