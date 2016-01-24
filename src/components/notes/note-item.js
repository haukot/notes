import React from 'react';
import {Link} from 'react-router';
import {DragSource, DropTarget} from 'react-dnd';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {HotKeys} from 'react-hotkeys';

import NotesList from './list'

let NoteItem = React.createClass({
    displayName: 'NoteItem',

    propTypes: {
        // section: React.PropTypes.object.isRequired,
        // onChange: React.PropTypes.func.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
        note: React.PropTypes.object.isRequired,
        cantBeDropTarget: React.PropTypes.bool.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        isOver: React.PropTypes.bool.isRequired,
        canDrop: React.PropTypes.bool.isRequired,
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    // FIXME как то объединить эти два метода?
    componentDidMount() {
        if (this.props.note.get('id') === this.props.activeNoteId) {
            this.refs.title.focus();
        }
    },

    componentDidUpdate() {
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

    handleGoToUpNote(e) {
        const upperElementOrderId = this.props.note.get('globalOrder') - 1;
        const upperElement = this.props.globalOrder.get(upperElementOrderId + "");
        if (upperElement.get('id') === 0) {
            return;
        }
        this.props.onSetActiveNote({id: upperElement.get('id')});
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
        const handlers = {
            'addNote': (e) => this.handleAddNote(e, {after: this.props.note.get('id')}),
            'tabNoteRight': this.handleTabNoteRight,
            'tabNoteLeft': this.handleTabNoteLeft,
            'goToUpNote': this.handleGoToUpNote,
            'goToDownNote': this.handleGoToDownNote,
        };
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
                const cantBeDropTarget = this.props.cantBeDropTarget || isDragging;
                children = (<NotesList
                            notes={note.get('children')}
                            parentNote={note}
                            cantBeDropTarget={cantBeDropTarget}
                            globalOrder={this.props.globalOrder}
                            activeNoteId={this.props.activeNoteId}
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
            '-over': !isDragging && canDrop && isOver,
        });
        // if (canDrop && isOver) debugger;
        return connectDropTarget(connectDragSource(
                <div className={classes} key={note.get('id')}>
                <a className="notes-item_expand_children" onClick={this.handleToggleChildren}>
                    { expandButtonSpan }
                </a>
                <Link className="_link-without-decorations notes-item_bullet" to={`/root/${note.get('id')}`}>
                </Link>
                <div className="notes-item_inner">
                <div className="notes-item_title">
                  <HotKeys handlers={handlers}>
                     <input className="clean notes-item_input" value={note.get('title')}
                            ref='title'
                            onClick={this.handleSetActiveNote}
                            onKeyUp={this.handleKeyUp}
                            onKeyDown={this.handleKeyDown}
                            onChange={this.handleNoteUpdate} />
                  </HotKeys>
                </div>
                {children}
                </div>
               </div>
        ));
    }
});

// Drag'n'Drop vars
const source = {
    beginDrag(props) {
        return {
            id: props.note.get('id')
        };
    },

    isDragging(props, monitor) {
        return props.note.get('id') === monitor.getItem().id
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const target = {
    canDrop(props, monitor) {
        // not allow drop on nested
        // FIXME need recursive check parent, no one children cant be drop target
        return !props.cantBeDropTarget;
        // return props.note.get('parentId') !== monitor.getItem().id;
    },
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            console.info("HUI");
            return;
        }

        const dragId = monitor.getItem().id;
        const hoverNote = props.note;
        const hoverId = hoverNote.get('id');

        if (dragId === hoverId) { return }

        props.onNoteUpdatePosition({
            id: dragId,
            parentId: hoverNote.get('parentId'),
            before: hoverId
        });
    }
};

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    };
}

NoteItem = DragSource('NOTE_ITEM', source, collectSource)(NoteItem);
NoteItem = DropTarget('NOTE_ITEM', target, collectTarget)(NoteItem);

export default NoteItem;
