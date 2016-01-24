import {fromJS} from 'immutable';
import * as ActionTypes from 'constants/action-types';

function createReducer(initialState, handlers) {
    return function reducer(state, action) {
        if (typeof state === 'undefined') return initialState;
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

function increaseSequence(state) {
    return state.updateIn(['sequence'], seq => seq + 1);
}

function getSequenceValue(state) {
    return state.getIn(['sequence']);
}

const initialState = fromJS({
    sequence: 0,
    view: {
        /*
           activeNoteId: id,
           activeListNoteId: id
         */
    },
    notes: {
        /*
          id: {
             id, title, body, date, parentId: 0, children: [ids],
    hiddenChildren: false
          }
         */
    }
}).setIn(['notes', 0], fromJS({
            id: 0,
            title: "root",
            body: "",
            children: []
        }));

export default createReducer(initialState, {
    [ActionTypes.ADD_NOTE](state, {attrs}) {
        let stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq);

        const fullAttrs = Object.assign(attrs, {id});
        const insertIndex = 0;

        // console.log("parentId", fullAttrs);
        // console.log("hui", state);
        return stateWithIncSeq
            .setIn(['notes', id], fromJS(fullAttrs))
            .updateIn(['notes', fullAttrs.parentId, 'children'],
                      (children) => {
                          return insertElement(id, 0, children, attrs)
                      })
            .setIn(['view', 'activeNoteId'], id)
            .setIn(['view', 'activeListNoteId'], id);
    },

    [ActionTypes.UPDATE_NOTE](state, {attrs}) {
        return state.mergeIn(['notes', attrs.id], attrs);
    },

    [ActionTypes.UPDATE_NOTE_POSITION](state, {attrs}) {
        const oldParentId = state.getIn(['notes', attrs.id, 'parentId']);
        return state.setIn(['notes', attrs.id, 'parentId'], attrs.parentId)
            .updateIn(['notes', oldParentId, 'children'],
                      children => children.splice(children.indexOf(attrs.id), 1))
            .updateIn(['notes', attrs.parentId, 'children'],
                      children => {
                          return insertElement(attrs.id, children.length, children, attrs);
                      })
    },

    [ActionTypes.DELETE_NOTE](state, {attrs}) {
        const note = state.getIn(['notes', attrs.id]);
        return state.deleteIn(['notes', attrs.id])
            .updateIn(['notes', note.get('parentId'), 'children'],
                      (children) => children.splice(children.indexOf(attrs.id), 1)
                     )
            .setIn(['view', 'activeNoteId'], state.get('notes').first.id);
    },

    [ActionTypes.SET_ACTIVE_NOTE](state, {attrs}) {
        return state.setIn(['view', 'activeNoteId'], attrs.id)
            .setIn(['view', 'activeListNoteId'], attrs.id);
    },

    [ActionTypes.TOGGLE_NOTE_CHILDREN](state, {attrs}) {
        let oldVal = state.getIn(['notes', attrs.id, 'hiddenChildren']);
        return state.setIn(['notes', attrs.id, 'hiddenChildren'], !oldVal);
    }

});

// for immutable.js list
function insertElement(el, initialIndex, arr, attrs) {
    let insertIndex = initialIndex;
    if (attrs.after !== undefined) {
        insertIndex = arr.indexOf(attrs.after) + 1;
    } else if (attrs.before) {
        insertIndex = arr.indexOf(attrs.before);
    }
    return arr.splice(insertIndex, 0, el);
}
