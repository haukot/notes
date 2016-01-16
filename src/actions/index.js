import * as types from 'constants/action-types';

export function addNote(attrs) {
    return {
        type: types.ADD_NOTE,
        attrs: Object.assign({title: "", body: "", parentId: 0, children: []}, attrs)
    }
}
export function updateNote(attrs) {
    return {
        type: types.UPDATE_NOTE,
        attrs
    }
}
export function updateNotePosition(attrs) {
    return {
        type: types.UPDATE_NOTE_POSITION,
        attrs
    }
}
export function deleteNote(attrs) {
    return {
        type: types.DELETE_NOTE,
        attrs
    }
}
export function setActiveNote(attrs) {
    return {
        type: types.SET_ACTIVE_NOTE,
        attrs
    }
}
