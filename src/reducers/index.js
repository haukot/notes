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

const initialState = fromJS({
    sections: [/*sectionId*/],
    sectionsByCards: {
        /*cardId: sectionId*/
    },
    entities: {
        sections: {
            /*id: {
                id,
                heading,
                cards: [cardId]
            }*/
        },
        cards: {
            /*id: {
                id,
                heading,
                description
            }*/
        }
    }
});

export default createReducer(initialState, {
    [ActionTypes.ADD_SECTION](state, {id, heading}) {
        return state
            .setIn(['entities', 'sections', id], fromJS({id, heading}))
            .updateIn(['sections'], sections => sections.push(id));
    }
});
