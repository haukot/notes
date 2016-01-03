import * as types from 'constants/action-types';

export function addSection({heading}) {
    return {
        type: types.ADD_SECTION,
        heading
    }
}

export function addCard({heading, sectionId}) {
    return {
        type: types.ADD_CARD,
        heading,
        sectionId
    }
}
