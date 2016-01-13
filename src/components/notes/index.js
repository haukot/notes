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
        const {notes, onNoteAdd, onNoteUpdate} = this.props;
        const note = notes.first();
        return (
            <div>
                <NotesList notes={notes} onNoteAdd={onNoteAdd} />
                <NoteEdit note={note} onChange={onNoteUpdate} />
            </div>
        )
    }
});
// export default DragDropContext(HTML5Backend)(NotesApp);
export default NotesApp;
