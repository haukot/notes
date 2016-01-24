import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import NoteItem from './note-item';


let NotesList = React.createClass({
    displayName: 'NotesList',

    propTypes: {
        notes: React.PropTypes.object.isRequired,
        // onChange: React.PropTypes.func.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    // handleHeadingChange(heading) {
    //     this.props.onChange({id: this.props.section.get('id'), heading});
    // },

    renderNotes(notes) {
        return (notes.map((note, index) => {
            return (
                    <NoteItem key={note.get('id')}
                            note={note}
                            cantBeDropTarget={this.props.cantBeDropTarget}
                            globalOrder={this.props.globalOrder}
                            parentNote={this.props.parentNote}
                            activeNoteId={this.props.activeNoteId}
                            onNoteAdd={this.props.onNoteAdd}
                            onNoteUpdate={this.props.onNoteUpdate}
                            onNoteUpdatePosition={this.props.onNoteUpdatePosition}
                            onNoteDelete={this.props.onNoteDelete}
                            onSetActiveNote={this.props.onSetActiveNote}
                            onToggleNoteChildren={this.props.onToggleNoteChildren}
                    />
            );
        }));
    },

    render() {
        return (
            <div className="notes-list">
                {this.renderNotes(this.props.notes)}
            </div>
        );
    }
});
export default NotesList;
