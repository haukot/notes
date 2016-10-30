import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import NoteItem from './note';


let NotesList = React.createClass({
    displayName: 'NotesList',

    propTypes: {
        notes: React.PropTypes.object.isRequired,
    },

    mixins: [PureRenderMixin],

    renderNotes() {
        let children = this.props.parentNote.get('children');
        return children.map((noteId, index) => {
            let note = this.props.notes.get(noteId);
            return (
                <NoteItem key={note.get('id')}
                          note={note}
                          notes={this.props.notes}
                          order={index}
                          cantBeDropTarget={this.props.cantBeDropTarget}
                          globalOrder={this.props.globalOrder}
                          parentNote={this.props.parentNote}
                          activeNote={this.props.activeNote}
                          onNoteAdd={this.props.onNoteAdd}
                          onNoteUpdate={this.props.onNoteUpdate}
                          onNoteUpdatePosition={this.props.onNoteUpdatePosition}
                          onNoteDelete={this.props.onNoteDelete}
                          onSetActiveNote={this.props.onSetActiveNote}
                          onToggleNoteChildren={this.props.onToggleNoteChildren}
                />
            );
        });
    },

    render() {
        return (
            <div className="notes-list">
                {this.renderNotes()}
            </div>
        );
    }
});
export default NotesList;
