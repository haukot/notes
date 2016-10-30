import {fromJS} from 'immutable';
import undoable, {excludeAction} from 'redux-undo';
import * as ActionTypes from 'constants/action-types';
import {getNotesTree} from './tree_utils.js';
import {EditorState, convertToRaw, ContentState} from 'draft-js';

function createReducer(initialState, handlers) {
    const reducer = (state, action) => {
        if (typeof state === 'undefined') return initialState;
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
    const excludedActions = [
        ActionTypes.SET_ACTIVE_NOTE,
        ActionTypes.TOGGLE_NOTE_CHILDREN,
        ActionTypes.SAVE_STATE,
    ];
    let withUndo = undoable(reducer, { filter: excludeAction(excludedActions) });
    return withUndo;
}

function increaseSequence(state) {
    return state.updateIn(['sequence'], seq => seq + 1);
}

function getSequenceValue(state) {
    return state.getIn(['sequence']).toString();
}

const initialState = fromJS({
    sequence: 0,
    view: {
        notesTree: {
            tree: null, //notesTree
            order: null, //hash order => note,
            hash: null, //hash noteId => noteInTree
        },
        /*
           activeNote: {id:, caretAtEnd: false},
         */
    },
    notes: {
        /*
          id: {
             id, title, body, date, parentId: 0, children: [ids],
    hiddenChildren: false
          }
         */
    }
}).setIn(['notes', "0"], fromJS({
            id: "0",
            title: convertToRaw(ContentState.createFromText("root")),
            body: "",
            children: []
        }));

export default createReducer(initialState, {
    [ActionTypes.ADD_NOTE](state, {attrs}) {
        let stateWithIncSeq = increaseSequence(state);
        const id = getSequenceValue(stateWithIncSeq);

        const fullAttrs = Object.assign(attrs, {id});
        const insertIndex = 0;

        // console.log("parentId", fullAttrs);
        // console.log("hui", state);
        const newState = stateWithIncSeq
              .setIn(['notes', id], fromJS(fullAttrs))
              .updateIn(['notes', fullAttrs.parentId.toString(), 'children'],
                        (children) => {
                            return insertElement(id, 0, children, attrs);
                        })
              .setIn(['view', 'activeNote', 'id'], id);

        const notesTree = getNotesTree(newState.getIn(['notes']));
        return newState.setIn(['view', 'notesTree'], notesTree);
    },

    [ActionTypes.UPDATE_NOTE](state, {attrs}) {
        return state.mergeIn(['notes', attrs.id.toString()], attrs);
    },

    [ActionTypes.UPDATE_NOTE_POSITION](state, {attrs}) {
        const oldParentId = state.getIn(['notes', attrs.id.toString(), 'parentId']);
        const newState = state.setIn(['notes', attrs.id.toString(), 'parentId'], attrs.parentId.toString())
            .updateIn(['notes', oldParentId.toString(), 'children'],
                      children => children.splice(children.indexOf(attrs.id.toString()), 1))
            .updateIn(['notes', attrs.parentId.toString(), 'children'],
                      children => {
                          return insertElement(attrs.id.toString(), children.length, children, attrs);
                      });
        const notesTree = getNotesTree(newState.getIn(['notes']));
        return newState.setIn(['view', 'notesTree'], notesTree);
    },

    [ActionTypes.DELETE_NOTE](state, {attrs}) {
        const note = state.getIn(['notes', attrs.id.toString()]);
        const newState = state.deleteIn(['notes', attrs.id.toString()])
            .updateIn(['notes', note.get('parentId').toString(), 'children'],
                      (children) => children.splice(children.indexOf(attrs.id.toString()), 1)
                     );
        const notesTree = getNotesTree(newState.getIn(['notes']));
        return newState.setIn(['view', 'notesTree'], notesTree);
    },

    [ActionTypes.SET_ACTIVE_NOTE](state, {attrs}) {
        console.log("SET ACTIVE NOTE");
        return state.setIn(['view', 'activeNote', 'id'], attrs.id.toString())
            .setIn(['view', 'activeNote', 'caretAtEnd'], attrs.caretAtEnd || false);
    },

    [ActionTypes.TOGGLE_NOTE_CHILDREN](state, {attrs}) {
        let oldVal = state.getIn(['notes', attrs.id.toString(), 'hiddenChildren']);
        return state.setIn(['notes', attrs.id.toString(), 'hiddenChildren'], !oldVal)
            .setIn(['view', 'activeNote', 'id'], attrs.id.toString());
    },

    [ActionTypes.IMPORT_OPML](state, {attrs}) {
        const {data} = attrs;
        let newState = parseWorkflowyOMPL(data, state);
        return newState;
    },

    [ActionTypes.SAVE_STATE](state) {
        let stateJson = JSON.stringify(state);
        fetch('/save', {method: 'post', body: stateJson,
                        headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    alert("Saved ok!");
                } else {
                    alert(`ERROR in save! ${response.status} : ${response.statusText}`);
                }
            }).catch(() => alert("ERROR in save, request failed!"));
        localStorage['my_state'] = stateJson;
        return state;
    },

    [ActionTypes.LOAD_STATE](state, {attrs}) {
        return fromJS(attrs.state);
    },

});

// for immutable.js list
function insertElement(el, initialIndex, arr, attrs) {
    let insertIndex = initialIndex;
    if (attrs.after !== undefined) {
        insertIndex = arr.indexOf(attrs.after) + 1;
    } else if (attrs.before) {
        insertIndex = arr.indexOf(attrs.before);
    }
    return arr.splice(insertIndex, 0, el);
}


function parseWorkflowyOMPL(data, state) {
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(data, "text/xml");
    if (oDOM.documentElement.nodeName == "parsererror") {
        console.error('Error while parsing opml data');
        return [];
    }
    let root = oDOM.documentElement.getElementsByTagName('body')[0];

    return createNoteFromXML(root, state, null);
}

function createNoteFromXML(xmlNote, state, parentId="0") {
    let {state: newState, id} = parentId !== null // == null if xmlNote - <body>
        ? createNote(
            {
                title: EditorState.createWithContent(ContentState.createFromText(xmlNote.getAttribute('text'))),
                body: xmlNote.getAttribute('note'),
                children: [],
                hiddenChildren: false,
                parentId
            }, state)
        : {state: state, id: 0};
    console.log(id);
    const children = xmlNote.children;
    for (var i = children.length - 1; i >= 0; i--) {
        const afterChildState = createNoteFromXML(children[i], newState, id);
        newState = afterChildState;
    }
    return newState;
}

// use this in ADD_NOTE
function createNote(attrs, state) {
    let stateWithIncSeq = increaseSequence(state);
    const id = getSequenceValue(stateWithIncSeq);

    const fullAttrs = Object.assign(attrs, {id});
    const insertIndex = 0;

    // console.log("parentId", fullAttrs);
    // console.log("hui", state);
    return {state: stateWithIncSeq
            .setIn(['notes', id], fromJS(fullAttrs))
            .updateIn(['notes', fullAttrs.parentId.toString(), 'children'],
                      (children) => {
                          return insertElement(id, 0, children, attrs)
                      }),
                      id};
}
