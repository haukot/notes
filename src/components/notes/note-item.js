import React from 'react';
import ReactDOM from 'react-dom';
import {History} from 'react-router';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {HotKeys} from 'react-hotkeys';
import NotesList from './list'
import NoteItemEditor from './note-item-editor'

import {placeCaretAtEnd} from '../../utils'

import connectDragNDrop from '../../connectors/item_drag_drop_connect'

let NoteItem = React.createClass({
    displayName: 'NoteItem',

    propTypes: {
        note: React.PropTypes.object.isRequired,
        cantBeDropTarget: React.PropTypes.bool.isRequired,
        // from connectDragNDrop:
        isDragging: React.PropTypes.bool.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        isOverTop: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired,
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin, History],

    handleNoteUpdate(changedTitle) {
        if (this.props.note.get('title') !== changedTitle) {
            this.props.onNoteUpdate({
                id: this.props.note.get("id"),
                title: changedTitle,
            });
        }
    },

    handleTabNoteLeft(e) {
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

    getPrevNoteId(note) {
        const upperElementOrderId = this.props.globalOrder.indexOf(note.get('id')) - 1;
        return this.props.globalOrder[upperElementOrderId];
    },

    getNextNoteId(note) {
        const bottomElementOrderId = this.props.globalOrder.indexOf(note.get('id')) + 1;
        return this.props.globalOrder[bottomElementOrderId];
    },

    handleTabNoteRight(e) {
        // note with order 0 - самая верхняя в своем ряду, и не может стать более вложенной
        if (this.props.order !== 0) {
            this.props.onNoteUpdatePosition({
                id: this.props.note.get('id'),
                parentId: this.getPrevNoteId(this.props.note),
            });
        }
        e.preventDefault();
    },

    setActiveUpNote(opts={caretAtEnd: false}) {
        const upperElementId = this.getPrevNoteId(this.props.note);
        if (upperElementId === '0') {
            return;
        }
        this.props.onSetActiveNote({id: upperElementId, caretAtEnd: opts.caretAtEnd});
    },

    handleGoToUpNote(e) {
        this.setActiveUpNote();
        e.preventDefault();
        e.stopPropagation();
    },

    handleGoToDownNote(e) {
        const bottomElementId = this.getNextNoteId(this.props.note);
        // последний элемент в списке
        if (bottomElementId === undefined) {
            return;
        }
        this.props.onSetActiveNote({id: bottomElementId});
        e.preventDefault();
        e.stopPropagation();
    },

    handleSetActiveNote() {
        this.props.onSetActiveNote({id: this.props.note.get('id')});
    },

    handleAddNote(e) {
        this.props.onNoteAdd({
            parentId: this.props.parentNote.get('id'),
            after: this.props.note.get('id')
        });
        e.preventDefault();
        e.stopPropagation();
    },

    handleRemoveNote() {
        // и ещё пара ебучих условий\
        if (!(this.props.order === 0 && this.props.note.get('children').count() > 0)) {
            this.setActiveUpNote({caretAtEnd: true});
            // надо ещё всех чайлдов переводить к верхней ноте
            this.props.onNoteDelete({id: this.props.note.get('id')});
        }
    },

    handleToggleChildren() {
        this.props.onToggleNoteChildren({id: this.props.note.get('id')});
    },

    render() {
        const note = this.props.note;
        const {connectDragSource, connectDropTarget,
               isDragging, isOver, canDrop} = this.props;

        let children = "";
        let expandButtonSpan = "";
        let noteHasChildren = note.get('children').count() > 0;
        if (noteHasChildren) {
            expandButtonSpan = note.get('hiddenChildren')
                ? <span className="plus">+</span>
                : <span className="minus">-</span>;
            if (!note.get('hiddenChildren')) {
                children = (<NotesList
                            notes={this.props.notes}
                            parentNote={note}
                            cantBeDropTarget={this.props.cantBeDropTarget}
                            globalOrder={this.props.globalOrder}
                            activeNote={this.props.activeNote}
                            onNoteAdd={this.props.onNoteAdd}
                            onNoteUpdate={this.props.onNoteUpdate}
                            onNoteUpdatePosition={this.props.onNoteUpdatePosition}
                            onNoteDelete={this.props.onNoteDelete}
                            onSetActiveNote={this.props.onSetActiveNote}
                            onToggleNoteChildren={this.props.onToggleNoteChildren}
                            />);
            }
        }

        const classes = classNames({
            'notes-item': true,
            '-dragging': isDragging,
            '-over-bottom': isOver && !this.props.isOverTop,
            '-over-top': isOver && this.props.isOverTop,
        });
        const bulletClasses = classNames({
            "notes-item_bullet": true,
            "-canExpandChildren": noteHasChildren && note.get('hiddenChildren')
        });
        let needFocus = this.props.note.get('id') === this.props.activeNote.get('id');
        let goToRoot = () => this.history.pushState(null, `/root/${note.get('id')}`);

        let hotKeysHandlers = {
            'addNote': this.handleAddNote,
            'tabNoteRight': this.handleTabNoteRight,
            'tabNoteLeft': this.handleTabNoteLeft,
            'goToUpNote': this.handleGoToUpNote,
            'goToDownNote': this.handleGoToDownNote,
        };

        return (
                connectDropTarget(
                    <div className={classes} key={note.get('id')}>
                        { noteHasChildren &&
                        <a className="notes-item_expand_children" onClick={this.handleToggleChildren}>
                             { expandButtonSpan }
                        </a> }
                        {connectDragSource(<a onClick={goToRoot} className={bulletClasses}>
                                           </a>)}
                        <div className="notes-item_inner">
                        <div className="notes-item_title" onClick={this.handleSetActiveNote}>

                        <HotKeys handlers={hotKeysHandlers}>
                        <NoteItemEditor html={note.get('title')} needFocus={needFocus}
                                        onChange={this.handleNoteUpdate}
                                        onSuicide={this.handleRemoveNote}
                                        onUpArrow={this.handleGoToUpNote}
                                        onDownArrow={this.handleGoToDownNote}
                                        onTab={this.handleTabNoteRight}
                                        onReturn={this.handleAddNote}
                        />
                        </HotKeys>
                        </div>
                        {children}
                        </div>
                    </div>
                )
        );
    }
});


NoteItem = connectDragNDrop(NoteItem);
export default NoteItem;
