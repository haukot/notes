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
           activeNoteId: id
         */
    },
    notes: {
        /*
          id: {
             id, title, body, date, parentId: 0, children: [ids]
          }
         */
    }
});

export default createReducer(initialState, {
    [ActionTypes.ADD_NOTE](state, {attrs}) {
        let stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq);

        const fullAttrs = Object.assign(attrs, {id});

        if (fullAttrs.parentId !== 0) {
            stateWithIncSeq = stateWithIncSeq
                .updateIn(['notes', fullAttrs.parentId, 'children'],
                          (children) => children.push(id))
        }

        return stateWithIncSeq
            .setIn(['notes', id], fromJS(fullAttrs))
            .setIn(['view', 'activeNoteId'], id);
    },

    [ActionTypes.UPDATE_NOTE](state, {attrs}) {
        return state.mergeIn(['notes', attrs.id], attrs);
    },

    [ActionTypes.SET_ACTIVE_NOTE](state, {attrs}) {
        return state.setIn(['view', 'activeNoteId'], attrs.id);
    }

});
