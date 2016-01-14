import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Search from './search';
import NoteItem from './note-item';

export default React.createClass({
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

    handleAddNote() {
        this.props.onNoteAdd({});
    },

    handleSetActiveNote(noteId) {
        this.props.onSetActiveNote({id: noteId});
    },

    render() {
        return (
            <div className="notes-list">
                <Search onChange={this.handleSearch} />
                <button className="button" onClick={this.handleAddNote}>Add a note</button>
                {this.props.notes.reverse().map((note, index) => {
                    return <NoteItem key={note.get('id')}
                                     onClick={this.handleSetActiveNote}
                                     note={note}
                        />
                })}
            </div>
        );
    }
});
