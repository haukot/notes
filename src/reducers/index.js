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
    sections: [/*'sectionId'*/],
    entities: {
        sections: {
            /*'id': {
                'id',
                heading,
                cards: [cardId]
            }*/
        },
        cards: {
            /*'id': {
                'id',
                'sectionId',
                heading,
                description
            }*/
        }
    }
});

export default createReducer(initialState, {
    [ActionTypes.ADD_SECTION](state, {attrs}) {
        const stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq).toString();

        const fullAttrs = Object.assign({heading: '', cards: []}, attrs, {id});

        return stateWithIncSeq
            .updateIn(['sections'], sections => sections.push(id))
            .setIn(['entities', 'sections', id], fromJS(fullAttrs));
    },

    [ActionTypes.UPDATE_SECTION](state, {attrs}) {
        return state.mergeIn(['entities', 'sections', attrs.id], attrs);
    },

    [ActionTypes.ADD_CARD](state, {attrs}) {
        const stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq).toString();

        const cardsPath = ['entities', 'sections', attrs.sectionId, 'cards'];
        const fullAttrs = Object.assign(
            {heading: '', description: ''},
            attrs,
            {id, index: state.getIn(cardsPath).size});

        return stateWithIncSeq
            .updateIn(cardsPath, cards => cards.push(id))
            .setIn(['entities', 'cards', id], fromJS(fullAttrs));
    },

    [ActionTypes.UPDATE_CARD](state, {attrs}) {
        const {id, sectionId, index} = attrs;
        const fullAttrs = Object.assign({}, attrs);
        delete fullAttrs.index;

        const oldSectionId = state.getIn(['entities', 'cards', id, 'sectionId']);
        const oldIndex = state.getIn(['entities', 'sections', oldSectionId, 'cards']).indexOf(id);

        return state
            .deleteIn(['entities', 'sections', oldSectionId, 'cards', oldIndex])
            .updateIn(['entities', 'sections', sectionId, 'cards'], cards => cards.splice(index, 0, id))
            .mergeIn(['entities', 'cards', id], fromJS(fullAttrs));
    }
});
