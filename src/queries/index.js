import {fromJS} from 'immutable';
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
    return acc;
}
// TODO мб сделать функцию, которая будет global order отдельно навешивать
function expandNoteChildren(note, state, counter) {
    let newCounter = counter;
    // console.log(note.get("id"), newCounter);
    if (note.get('children').count() <= 0) return {counter: newCounter,
                                                   note: note.set('globalOrder', newCounter)};
    const newNote = note
          .set('globalOrder', newCounter)
          .update('children', children =>
                  children
                  .map((childId, id) => {
                      newCounter = newCounter + 1;
                      let childNote = state.getIn(['notes', childId])
                          .set('order', id)
                          .set('prevId', children.get(id - 1));
                      const expand = expandNoteChildren(childNote, state, newCounter);
                      newCounter = expand.counter;
                      // console.log("map", childNote.get("id"), newCounter);
                      return expand.note;
                  })
                  .sortBy(note => note.get('order'))
                 );
    return {counter: newCounter, note: newNote};
}

export function notes(state) {
    let {counter, note} = expandNoteChildren(state.getIn(['notes', 0]), state, 0);
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
