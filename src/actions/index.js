import * as types from 'constants/action-types';

export function addNote(attrs) {
    return {
        type: types.ADD_NOTE,
        attrs
    }
}
export function updateNote(attrs) {
    return {
        type: types.UPDATE_NOTE,
        attrs
    }
}
