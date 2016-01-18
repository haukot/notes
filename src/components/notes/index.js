import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// maybe for more compicated hotkeys
import {HotKeys} from 'react-hotkeys';

// for drag'n drop
// import {DragDropContext} from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';


import Search from './search';
import NotesList from './list';
import NoteEdit from './note-edit';


const hotkeysMap = {
    'addNote': 'enter',
    'tabNoteRight': 'tab',
    'tabNoteLeft': 'shift+tab'
};

const NotesApp = React.createClass({
    displayName: 'NotesApp',

    mixins: [PureRenderMixin],

    // FIXME duplicate with list
    handleAddNote() {
        this.props.onNoteAdd({});
    },

    render() {
        const {rootNote, view, onNoteAdd,
               onNoteUpdate, onNoteDelete,
               onSetActiveNote, onNoteUpdatePosition} = this.props;
        const activeNote = view.get('activeNote');
        return (
            <HotKeys keyMap={hotkeysMap}>
            <div className="row panel _full-height">
                <div className="column column-20 _full-height">
                <Search onChange={this.handleSearch} />
                <button className="button" onClick={this.handleAddNote}>Add a note</button>

                <div className="notes-sidebar">
                <NotesList notes={rootNote.get('children')}
                           parentNote={rootNote}
                           activeNoteId={view.get('activeListNoteId')}
                           onNoteAdd={onNoteAdd}
                           onNoteUpdate={onNoteUpdate}
                           onNoteUpdatePosition={onNoteUpdatePosition}
                           onNoteDelete={onNoteDelete}
                           onSetActiveNote={onSetActiveNote}
                />
                </div>

                </div>
                <div className="column column-75 _full-height">
                    <NoteEdit note={activeNote} onNodeChange={onNoteUpdate} />
                </div>
            </div>
            </HotKeys>
        )
    }
});
// export default DragDropContext(HTML5Backend)(NotesApp);
export default NotesApp;
