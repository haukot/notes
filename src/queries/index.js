import {fromJS} from 'immutable';

function notesIterator(state, note, counter, acc, noteCallback, childCallback) {
    let newCounter = counter;
    const res = noteCallback(note, counter, acc);
    let newAcc = res.acc;
    let newNote = res.note
    if (!newNote.get('children') || newNote.get('children').count() <= 0) {
        return {counter: newCounter, acc: newAcc, note: newNote};
    }
    newNote = newNote
          .update('children', children =>
                  children
                  .map((childId, id) => {
                      let child = state.getIn(['notes', childId])
                      if (childCallback) {
                          child = childCallback(child, children, id, newCounter, acc); // callback
                      }
                      const expand = notesIterator(state, child, newCounter + 1,
                                                   newAcc, noteCallback, childCallback);
                      newCounter = expand.counter;
                      newAcc = Object.assign(newAcc, expand.acc);
                      return expand.note;
                  })
                 );
    return {counter: newCounter, note: newNote, acc: newAcc};
}

function rootNote(state, rootId) {
    if (!rootId) {
        rootId = 0;
    }
    let rootNote = state.getIn(['notes', Number(rootId)]);
    return rootNote;
}

export function pathToRoot(state, note, acc = []) {
    if (!note) return fromJS(acc);

    let newAcc = acc;
    newAcc.push({id: note.get('id'), title: note.get('title')});
    return pathToRoot(state, state.getIn(['notes', note.get('parentId')]), newAcc);
}

// TODO надо globalOrder и order засунуть в view стейт, чтобы не
// пересчитывать на каждое движение
export function globalOrder(state, rootId) {
    // let {counter, acc} = globalOrder0(state, state.getIn(['notes', 0]), 0, {});
    let noteCallback = (note, counter, acc) => {
        let newAcc = acc;
        newAcc[counter] = note;
        return {note, acc: newAcc};
    };
    let {counter, acc} = notesIterator(state, rootNote(state, rootId), 0, {},
                                        noteCallback, null);
    console.log("acc", fromJS(acc).toJS());
    return fromJS(acc);
}

export function notes(state, rootId) {
    // let {counter, note} = expandNoteChildren(state.getIn(['notes', 0]), state, 0);
    let childCallback = (child, children, id, counter, acc) => {
        let newChild = child
            .set('order', id)
            .set('prevId', children.get(id - 1));
        return newChild;
    };
    let noteCallback = (note, counter, acc) => {
        const newNote = note.set('globalOrder', counter);
        return {note: newNote, acc}
    };
    let {counter, note} = notesIterator(state, rootNote(state, rootId), 0, {},
                                        noteCallback, childCallback);
    console.log("notes", note.toJS());
    return note;
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
