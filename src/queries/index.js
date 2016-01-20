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
                      child = childCallback(child, children, id, newCounter, acc); // callback
                      const expand = notesIterator(state, child, newCounter + 1,
                                                   newAcc, noteCallback, childCallback);
                      newCounter = expand.counter;
                      newAcc = Object.assign(newAcc, expand.acc);
                      return expand.note;
                  })
                 );
    return {counter: newCounter, note: newNote, acc: newAcc};
}

// global order должен быть отдельной функцией или индексом в стейте,
// соответствием order: note
function globalOrder0(state, note, counter, acc) {
    let newCounter = counter;
    let newAcc = acc;
    newAcc[newCounter] = note;
    console.log(note.get("id"), newCounter);
    if (!note.get('children') || note.get('children').count() <= 0) {
        console.log('if', newAcc, newCounter);
        return {counter: newCounter,
                acc: newAcc};
    }
    const newNote = note
          .update('children', children =>
                  children
                  .map((childId, id) => {
                      let childNote = state.getIn(['notes', childId])
                      const expand = globalOrder0(state, childNote, newCounter + 1, newAcc);
                      newCounter = expand.counter;
                      newAcc = Object.assign(newAcc, expand.acc);
                      // console.log("map", childNote.get("id"), fromJS(newAcc).toJS());
                      return childNote;
                  })
                 );
    console.log('noif', newAcc, newCounter);
    return {counter: newCounter, acc: newAcc};
}
export function globalOrder(state) {
    let {counter, acc} = globalOrder0(state, state.getIn(['notes', 0]), 0, {});
    console.log("acc", fromJS(acc).toJS());
    return fromJS(acc);
}

export function notes(state) {
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
    let {counter, note} = notesIterator(state, state.getIn(['notes', 0]), 0, {},
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
