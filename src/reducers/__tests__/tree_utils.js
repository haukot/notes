/* global expect, test */
import {fromJS} from 'immutable';
import {getNotesTree, notesIterator, tree, order} from '../tree_utils';

let notes = {'0': {id: '0', children: ['1', '3']},
             '1': {id: '1', children: ['4', '5']},
             '2': {id: '2', children: []},
             '3': {id: '3', children: []},
             '4': {id: '4', children: ['2', '6']},
             '5': {id: '5', children: []},
             '6': {id: '6', children: ['7', '8', '9']},
             '7': {id: '7', children: []},
             '8': {id: '8', children: []},
             '9': {id: '9', children: []}};
notes = fromJS(notes);

let expectedTree = {
    id: '0',
    children: [
        {
            id: '1', children: [
                {
                    id: '4', children: [
                        {id: '2', children: []},
                        {id: '6', children: [
                            {id: '7', children: []},
                            {id: '8', children: []},
                            {id: '9', children: []}
                        ]}
                    ]
                },
                {id: '5', children: []}
            ]
        },
        {id: '3', children: []}
    ]
};
expectedTree = fromJS(expectedTree);
let expectedOrder = ['0', '1', '4', '2', '6', '7', '8', '9', '5', '3'];

test('notesIterator basic', () => {
    let note = fromJS({});
    let acc = 'newacc';
    let noteCallback = (_note, _counter, _acc) => { return {acc, note}; };
    expect(notesIterator([], null, 0, 'oldacc', noteCallback, null))
        .toEqual({counter: 0, acc, note});
});

test('tree', () => {
    expect(tree(notes)).toEqual(expectedTree);
});

test('order', () => {
    expect(order(notes)).toEqual(expectedOrder);
});

test('getNotesTree', () => {
    let all = getNotesTree(notes);
    expect(all.tree).toEqual(expectedTree);
    expect(all.order).toEqual(expectedOrder);
});
