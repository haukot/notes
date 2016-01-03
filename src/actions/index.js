import * as types from 'constants/action-types';

export function addSection(attrs) {
    return {
        type: types.ADD_SECTION,
        attrs
    }
}

export function updateSection(attrs) {
    return {
        type: types.UPDATE_SECTION,
        attrs
    }
}

export function addCard(attrs) {
    return {
        type: types.ADD_CARD,
        attrs
    }
}

export function updateCard(attrs) {
    return {
        type: types.UPDATE_CARD,
        attrs
    }
}
