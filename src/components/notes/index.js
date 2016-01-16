import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// maybe for more compicated hotkeys
// import {HotKeys} from 'react-hotkeys';

// for drag'n drop
// import {DragDropContext} from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';


import Search from './search';
import NotesList from './list';
import NoteEdit from './note-edit';


const NotesApp = React.createClass({
    displayName: 'NotesApp',

    mixins: [PureRenderMixin],

    // FIXME duplicate with list
    handleAddNote() {
        this.props.onNoteAdd({});
    },

    render() {
        const {notes, view, onNoteAdd,
               onNoteUpdate, onNoteDelete,
               onSetActiveNote} = this.props;
        const activeNote = view.get('activeNote');
        return (
            <div className="row panel _full-height">
                <div className="column column-20 _full-height">
                <Search onChange={this.handleSearch} />
                <button className="button" onClick={this.handleAddNote}>Add a note</button>

                <div className="notes-sidebar">
                <NotesList notes={notes}
                           activeNoteId={view.get('activeListNoteId')}
                           onNoteAdd={onNoteAdd}
                           onNoteUpdate={onNoteUpdate}
                           onNoteDelete={onNoteDelete}
                           onSetActiveNote={onSetActiveNote}
                />
                </div>

                </div>
                <div className="column column-75 _full-height">
                    <NoteEdit note={activeNote} onNodeChange={onNoteUpdate} />
                </div>
            </div>
        )
    }
});
// export default DragDropContext(HTML5Backend)(NotesApp);
export default NotesApp;
