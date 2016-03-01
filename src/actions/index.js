import * as types from 'constants/action-types';

export function addNote(attrs) {
    return {
        type: types.ADD_NOTE,
        attrs: Object.assign({title: "", body: "", parentId: 0,
                              children: [], hiddenChildren: false}, attrs)
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
export function toggleNoteChildren(attrs) {
    return {
        type: types.TOGGLE_NOTE_CHILDREN,
        attrs
    }
}

export function importOPML(attrs) {
    return {
        type: types.IMPORT_OPML,
        attrs
    }
}

export function saveState(attrs) {
    return {
        type: types.SAVE_STATE,
        attrs
    }
}

export function loadState(attrs) {
    return {
        type: types.LOAD_STATE,
        attrs
    }
}

// function makeActionCreator(type, ...argNames) {
//   return function(...args) {
//     let action = { type }
//     argNames.forEach((arg, index) => {
//       action[argNames[index]] = args[index]
//     })
//     return action
//   }
// }

// const ADD_TODO = 'ADD_TODO'
// const EDIT_TODO = 'EDIT_TODO'
// const REMOVE_TODO = 'REMOVE_TODO'

// export const addTodo = makeActionCreator(ADD_TODO, 'todo')
// export const editTodo = makeActionCreator(EDIT_TODO, 'id', 'todo')
// export const removeTodo = makeActionCreator(REMOVE_TODO, 'id')
