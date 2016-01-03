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
    sections: [/*sectionId*/],
    sectionsByCard: {
        /*'cardId': sectionId*/
    },
    entities: {
        sections: {
            /*'id': {
                id,
                heading,
                cards: [cardId]
            }*/
        },
        cards: {
            /*'id': {
                id,
                heading,
                description
            }*/
        }
    }
});

export default createReducer(initialState, {
    [ActionTypes.ADD_SECTION](state, {heading}) {
        const stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq).toString();
        return stateWithIncSeq
            .updateIn(['sections'], sections => sections.push(id))
            .setIn(['entities', 'sections', id], fromJS({id, heading, cards: []}));
    },
    [ActionTypes.ADD_CARD](state, {heading, sectionId}) {
        const stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq).toString();
        return stateWithIncSeq
            .setIn(['sectionsByCard', id], sectionId)
            .updateIn(['entities', 'sections', sectionId, 'cards'], cards => cards.push(id))
            .setIn(['entities', 'cards', id], fromJS({id, heading, description: ''}));
    },
});
