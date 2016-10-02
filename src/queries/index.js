import {fromJS} from 'immutable';
import { createSelector } from 'reselect';


const notesSelector = (state) => state.present.getIn(['notes']);
const notesTreeSelector = (state) => state.present.getIn(['view', 'notesTree']);
const rootIdSelector = (state, props) => props.params.id || '0';

export const viewSelector = (state) => state.present.getIn(['view']);

export const currentRootNoteSelector = createSelector(
    notesTreeSelector,
    rootIdSelector,
    (notesTree, rootId) => {
        return notesTree.hash[rootId];
    }
);

export function pathToRoot(notes, note, acc = []) {
    if (!note) return fromJS(acc);

    let newAcc = acc;
    newAcc.push({id: note.get('id'), title: note.get('title')});
    let parentNoteId = note.get('parentId');
    parentNoteId = parentNoteId !== undefined && parentNoteId.toString();
    return pathToRoot(notes, notes.getIn([parentNoteId]), newAcc);
}

export const pathToRootSelector = createSelector(
    notesSelector,
    currentRootNoteSelector,
    (notes, rootNote) => {
        return pathToRoot(notes, rootNote);
    }
);

export const globalOrderSelector = createSelector(
    notesTreeSelector,
    (notesTree) => {
        return notesTree.order;
    }
);
