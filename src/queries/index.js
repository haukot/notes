function expandNoteChildren(note, state) {
    console.log('note', note)
    if (note.get('children').count() <= 0) return note;
    return note
        .update('children', children =>
                children
                .map((childId, id) => {
                    console.log(state.getIn(['notes', childId]))
                    let childNote = state.getIn(['notes', childId]).set('order', id);
                    console.log('childNote', childNote)
                    return expandNoteChildren(childNote, state);
                })
                .sortBy(note => note.get('order'))
               );
}

export function notes(state) {
    console.log("hui", state)
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
