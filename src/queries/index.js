export function sectionsIds(state) {
    return state.getIn(['sections']);
}

export function sections(state) {
    return state
        .getIn(['sections'])
        .map(sectionId => state
            .getIn(['entities', 'sections', sectionId])
            .updateIn(['cards'], cardsIds => cardsIds
                .map(cardId => state.getIn(['entities', 'cards', cardId.toString()]))));
}
