import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'


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

    handleAddNote(opts) {
        this.props.onNoteAdd(opts);
    },

    handleSetActiveNote(noteId) {
        this.props.onSetActiveNote({id: noteId});
    },

    renderNotes(notes) {
        return (notes.reverse().map((note, index) => {
            let children = "";
            if (note.get('children').count() > 0) {
                children = (<NotesList
                            notes={note.get('children')}
                            onNoteAdd={this.props.onNoteAdd}
                            onSetActiveNote={this.props.onSetActiveNote} />)
            }
            return (
                <li className="notes-item" key={note.get('id')}>
                    <span className="notes-item_inner" onClick={() => this.handleSetActiveNote(note.get('id'))}>
                        {note.get('title')}
                    </span>

                    <a className="notes-add_children"
                       onClick={() => this.handleAddNote({parentId: note.get('id')})}>+</a>
                    {children}
                </li>
            );
        }));
    },

    render() {
        return (
            <ul className="notes-list">
                {this.renderNotes(this.props.notes)}
            </ul>
        );
    }
});
export default NotesList;
