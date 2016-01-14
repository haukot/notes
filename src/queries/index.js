export function notes(state) {
    return state.getIn(['notes']);
}

export function view(state) {
    let viewState = state.getIn(['view']);
    if (viewState.get('activeNoteId') === undefined) {
        viewState = viewState.set('activeNoteId', state.get('notes').last().get('id'));
    }
    return viewState;
}
