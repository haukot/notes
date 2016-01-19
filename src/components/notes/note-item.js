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

    handleTabNoteLeft(e) {
        // TODO мб добавить before или after какой ноды
        // вставлять(parentId ноды)
        // менее вложенным, чем зависеть от parentId=0 нельзя
        if (this.props.note.get('parentId') !== 0) {
            this.props.onNoteUpdatePosition({
                id: this.props.note.get("id"),
                parentId: this.props.parentNote.get('parentId'),
                after: this.props.parentNote.get('id')
            });
        }
        e.preventDefault();
    },


    handleTabNoteRight(e) {
        // note with order 0 - самая верхняя в своем ряду, и не может стать более вложенной
        if (this.props.note.get('order') !== 0) {
            this.props.onNoteUpdatePosition({
                id: this.props.note.get("id"),
                parentId: this.props.note.get('prevId')
            });
        }
        e.preventDefault();
    },

    handleSetActiveNote() {
        this.props.onSetActiveNote({id: this.props.note.get('id')});
    },

    handleAddNote(e, opts) {
        this.props.onNoteAdd(Object.assign(opts, {
            parentId: this.props.note.get('parentId'),
        }));
        e.preventDefault();
        e.stopPropagation();
    },

    handleRemoveNote() {
        this.props.onNoteDelete({id: this.props.note.get('id')});
    },

    handleKeyDown(e) {
        switch(e.key) {
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
        case "Backspace":
            e.preventDefault();
            break;
        }
    },

    handleClick() {
        this.props.onClick(this.props.note.get('id'));
    },

    render() {
        const handlers = {
            'addNote': (e) => this.handleAddNote(e, {after: this.props.note.get('id')}),
            'tabNoteRight': this.handleTabNoteRight,
            'tabNoteLeft': this.handleTabNoteLeft,
            'goToUpNote': this.hui,
            'goToDownNote': this.hui,
        };
        const note = this.props.note;
        let children = "";
        if (note.get('children').count() > 0) {
            children = (<NotesList
                        notes={note.get('children')}
                        parentNote={note}
                        activeNoteId={this.props.activeNoteId}
                        onNoteAdd={this.props.onNoteAdd}
                        onNoteUpdate={this.props.onNoteUpdate}
                        onNoteUpdatePosition={this.props.onNoteUpdatePosition}
                        onNoteDelete={this.props.onNoteDelete}
                        onSetActiveNote={this.props.onSetActiveNote} />);
        }
        return (
                <HotKeys handlers={handlers}>
                <li className="notes-item" key={note.get('id')}>
                 <input className="clean notes-item_inner" value={note.get('title')}
                            ref='title'
                            onClick={this.handleSetActiveNote}
                            onKeyUp={this.handleKeyUp}
                            onKeyDown={this.handleKeyDown}
                            onChange={this.handleNoteUpdate} />
                {children}
               </li>
               </HotKeys>
        );
    }
});
