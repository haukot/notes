import {fromJS} from 'immutable';
import { createSelector } from 'reselect'

function notesIterator(notes, note, counter, acc, noteCallback, childCallback) {
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
                      let child = notes.getIn([childId])
                      if (childCallback) {
                          child = childCallback(child, children, id, newCounter, acc); // callback
                      }
                      const expand = notesIterator(notes, child, newCounter + 1,
                                                   newAcc, noteCallback, childCallback);
                      newCounter = expand.counter;
                      newAcc = Object.assign(newAcc, expand.acc);
                      return expand.note;
                  })
                 );
    return {counter: newCounter, note: newNote, acc: newAcc};
}

const notesSelector = (state) => state.present.getIn(['notes'])
const rootIdSelector = (state, props) => props.params.id;

const rootNoteSelector = createSelector(
    notesSelector,
    rootIdSelector,
    (notes, rootId) => {
        if (!rootId) {
            rootId = 0;
        }
        let rootNote = notes.getIn([Number(rootId)]);
        return rootNote;
    }
);


export const viewSelector = (state) => state.present.getIn(['view']);

export const currentRootNoteSelector = createSelector(
    notesSelector,
    rootNoteSelector,
    (notes, rootNote) => {
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
        let {counter, note} = notesIterator(notes, rootNote, 0, {},
                                            noteCallback, childCallback);
        console.log("notes", note.toJS());
        return note;
    }
)


export function pathToRoot(notes, note, acc = []) {
    if (!note) return fromJS(acc);

    let newAcc = acc;
    newAcc.push({id: note.get('id'), title: note.get('title')});
    return pathToRoot(notes, notes.getIn([note.get('parentId')]), newAcc);
}

export const pathToRootSelector = createSelector(
    notesSelector,
    currentRootNoteSelector,
    (notes, rootNote) => {
        return pathToRoot(notes, rootNote);
    }
);


// TODO надо globalOrder и order засунуть в view стейт, чтобы не
// пересчитывать на каждое движение
export const globalOrderSelector = createSelector(
    notesSelector,
    rootNoteSelector,
    (notes, rootNote) => {
        let noteCallback = (note, counter, acc) => {
            let newAcc = acc;
            newAcc[counter] = note;
            return {note, acc: newAcc};
        };
        let {counter, acc} = notesIterator(notes, rootNote, 0, {},
                                           noteCallback, null);
        console.log("acc", fromJS(acc).toJS());
        return fromJS(acc);
    }
);
