import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {HotKeys} from 'react-hotkeys';

import NotesList from './list'

export default React.createClass({
    displayName: 'NoteItem',

    propTypes: {
        // section: React.PropTypes.object.isRequired,
        // onChange: React.PropTypes.func.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentDidMount() {
        if (this.props.note.get('id') === this.props.activeNoteId) {
            this.refs.title.focus();
        }
    },

    handleNoteUpdate() {
        this.props.onNoteUpdate({
            id: this.props.note.get("id"),
            title: this.refs.title.value,
        });
    },

    handleSetActiveNote() {
        this.props.onSetActiveNote({id: this.props.note.get('id')});
    },

    handleAddNote(opts) {
        this.props.onNoteAdd(Object.assign(opts, {
            parentId: this.props.note.get('parentId'),
        }));
    },

    handleRemoveNote() {
        this.props.onNoteDelete({id: this.props.note.get('id')});
    },

    handleKeyDown(e) {
        switch(e.key) {
        case "Tab":
            // set parent note to prev note id
            break;
        case "Backspace":
            if (this.props.note.get('title') === "") {
                this.handleRemoveNote();
                e.preventDefault();
            }
            break;
        }
    },

    handleKeyUp(e) {
        switch(e.key) {
        case "Enter":
            this.handleAddNote({after: this.props.note.get('id')});
            break;
        case "Backspace":
            e.preventDefault();
            break;
        }
    },

    handleClick() {
        this.props.onClick(this.props.note.get('id'));
    },

    render() {
        const note = this.props.note;
        let children = "";
        if (note.get('children').count() > 0) {
            children = (<NotesList
                        notes={note.get('children')}
                        activeNoteId={this.props.activeNoteId}
                        onNoteAdd={this.props.onNoteAdd}
                        onNoteDelete={this.props.onNoteDelete}
                        onNoteUpdate={this.props.onNoteUpdate}
                        onSetActiveNote={this.props.onSetActiveNote} />);
        }
        return (
                <li className="notes-item" key={note.get('id')}>
                 <input className="clean notes-item_inner" value={note.get('title')}
                            ref='title'
                            onClick={this.handleSetActiveNote}
                            onKeyUp={this.handleKeyUp}
                            onKeyDown={this.handleKeyDown}
                            onChange={this.handleNoteUpdate} />
                {children}
               </li>
        );
    }
});
