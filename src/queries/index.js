function expandNoteChildren(note, state) {
    if (note.get('children').count() <= 0) return note;
    return note
        .update('children', children =>
                children
                .map((childId, id) => {
                    let childNote = state.getIn(['notes', childId])
                        .set('order', id)
                        .set('prevId', children.get(id - 1));
                    return expandNoteChildren(childNote, state);
                })
                .sortBy(note => note.get('order'))
               );
}

export function notes(state) {
    let a = expandNoteChildren(state.getIn(['notes', 0]), state)
        .get('children');
    console.log("notes", a.toJS());
    return a;
}

export function view(state) {
    let viewState = state.getIn(['view']);
    if (viewState.get('activeNoteId') === undefined) {
        viewState = viewState.set('activeNote', state.get('notes').last());
    } else {
        viewState = viewState.set('activeNote',
                                  state.getIn(['notes', viewState.get('activeNoteId')])
                                 );
    }
    return viewState;
}
