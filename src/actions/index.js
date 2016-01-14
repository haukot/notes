import * as types from 'constants/action-types';

export function addNote(attrs) {
    return {
        type: types.ADD_NOTE,
        attrs: Object.assign({title: "", body: ""}, attrs)
    }
}
export function updateNote(attrs) {
    return {
        type: types.UPDATE_NOTE,
        attrs
    }
}
export function setActiveNote(attrs) {
    return {
        type: types.SET_ACTIVE_NOTE,
        attrs
    }
}
