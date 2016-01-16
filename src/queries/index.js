function expandNoteChildren(note, state) {
    if (note.get('children').count() <= 0) return note;
    return note
        .update('children', children =>
                children
                .map(childId =>
                     expandNoteChildren(state.getIn(['notes', childId]), state)
                    )
               );
}

export function notes(state) {
    let a = state.getIn(['notes'])
        .filter(note => note.get('parentId') == 0)
        .map((note, id) => {
            return expandNoteChildren(note, state)
        });
    console.log("hui", a);
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
