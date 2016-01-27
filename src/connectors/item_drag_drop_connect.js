// drag n drop for NoteItem component
// can be more generic if remove note-specific props(like props.note
// and props.onNoteUpdatePosition. But that will be like pure
// react-dnd connect without isOverTop prop
import React from 'react';
import ReactDOM from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';

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

const target = {
    canDrop(props, monitor) {
        // not allow drop on nested
        return !props.cantBeDropTarget;
    },
    hover(props, monitor, component) {
        let offset = monitor.getClientOffset()
        let rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        let isOverTop = offset.y - rect.top < (rect.bottom - rect.top)/2;
        component.getDecoratedComponentInstance().setState({isOverTop: isOverTop});
    },
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return;
        }
        const dragId = monitor.getItem().id;
        const hoverNote = props.note;
        const hoverId = hoverNote.get('id');

        if (dragId === hoverId) { return }

        const position = component.getDecoratedComponentInstance().state.isOverTop
              ? {before: hoverId}
              : {after: hoverId};

        props.onNoteUpdatePosition(Object.assign({
            id: dragId,
            parentId: hoverNote.get('parentId')
        }, position));
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    };
}
// end Drag'n'Drop vars


export default function connectDragNDrop(Component) {
    let DragDropItem = React.createClass({
        getInitialState() {
            return {isOverTop: false};
        },
        render() {
            const {connectDragSource, connectDropTarget,
                   isDragging, isOver, canDrop} = this.props;
            const isSelectedOver =  !isDragging && canDrop && isOver;
            const newProps = {
                cantBeDropTarget: this.props.cantBeDropTarget || isDragging,
                isOver: isSelectedOver,
                isOverTop: this.state.isOverTop
            };
            let oldProps = Object.assign({}, this.props); // this because this.props is readonly
            const props = Object.assign(oldProps, newProps);
            return <Component {...props}
                              {...this.state} />;
        }
    });

    DragDropItem = DragSource('NOTE_ITEM', source, collectSource)(DragDropItem);
    DragDropItem = DropTarget('NOTE_ITEM', target, collectTarget)(DragDropItem);

    return DragDropItem;
};
