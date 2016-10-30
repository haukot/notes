import {fromJS} from 'immutable';
import {serialize, deserialize} from './editor';

export function serializeState(state) {
    let serializeNote = note => note.updateIn(['title'], serialize);
    let serializedState = state.updateIn(['notes'], (notes) => notes.map(serializeNote));
    let stateJson = JSON.stringify(serializedState.toJS());
    return stateJson;
}

export function deserializeState(stateJson) {
    let state = stateJson;
    if (typeof state === 'string') {
        state = JSON.parse(state);
    }
    state = fromJS(state);
    let deserializeNote = (note) => note.updateIn(['title'], deserialize);
    let deserializedState = state.updateIn(['notes'], (notes) => notes.map(deserializeNote));
    return {present: deserializedState};
}
