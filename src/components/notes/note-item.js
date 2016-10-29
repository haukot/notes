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

    maybeFocusNote() {
        if (this.props.note.get('id') === this.props.activeNote.get('id')) {
            let input = ReactDOM.findDOMNode(this.refs.title);
            // проблема с этим, что после таба не фокусится. наверно лучше хранить ещё prevFocusedNote
            // if (document.activeElement.className !== input.className) {
            //     // чтобы другие элементы фокусились.
            //     return;
            // }
            if (this.props.activeNote.get('caretAtEnd')) {
                // placeCaretAtEnd(input);
            } else {
                // input.focus();
            }
        }
    },

    // FIXME как то объединить эти два метода?
    componentDidMount() {
        this.maybeFocusNote();
    },

    componentDidUpdate() {
        this.maybeFocusNote();
    },

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

    setActiveUpNote(opts={caretAtEnd: false}) {
        const upperElementOrderId = this.props.note.get('globalOrder') - 1;
        const upperElement = this.props.globalOrder.get(upperElementOrderId + "");
        if (upperElement.get('id') === 0) {
            return;
        }
        this.props.onSetActiveNote({id: upperElement.get('id'), caretAtEnd: opts.caretAtEnd});
    },

    handleGoToUpNote(e) {
        this.setActiveUpNote();
        e.preventDefault();
        e.stopPropagation();
    },

    handleGoToDownNote(e) {
        const bottomElementOrderId = this.props.note.get('globalOrder') + 1;
        const bottomElement = this.props.globalOrder.get(bottomElementOrderId + "");
        // последний элемент в списке
        if (bottomElement === undefined) {
            return;
        }
        this.props.onSetActiveNote({id: bottomElement.get('id')});
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
        this.setActiveUpNote({caretAtEnd: true});
        this.props.onNoteDelete({id: this.props.note.get('id')});
    },

    handleToggleChildren() {
        this.props.onToggleNoteChildren({id: this.props.note.get('id')});
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
                        <div className="notes-item_title">
                        <NoteItemEditor html={note.get('title')} needFocus={needFocus}
                                        onChange={this.handleNoteUpdate}
                        />
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
