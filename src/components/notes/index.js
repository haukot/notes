import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// import {DragDropContext} from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';


import NotesList from './list';
import NoteEdit from './note-edit';

const NotesApp = React.createClass({
    displayName: 'NotesApp',

    mixins: [PureRenderMixin],

    render() {
        const {notes, view, onNoteAdd, onNoteUpdate, onSetActiveNote} = this.props;
        const activeNote = this.props.notes.get(view.get('activeNoteId'));
        return (
            <div className="row panel _full-height">
                <div className="column column-20 _full-height">
                <NotesList notes={notes}
                           onNoteAdd={onNoteAdd}
                           onSetActiveNote={onSetActiveNote}
                />
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
