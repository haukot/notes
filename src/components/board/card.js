import React from 'react';
import {Link} from 'react-router';
import {DragSource, DropTarget} from 'react-dnd';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as ItemTypes from './item-types';

const source = {
    beginDrag(props) {
        return {
            id: props.card.get('id')
        };
    },

    isDragging(props, monitor) {
        return props.card.get('id') === monitor.getItem().id
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const target = {
    hover(props, monitor, component) {
        const dragId = monitor.getItem().id;
        const hoverCard = props.card;
        const hoverId = hoverCard.get('id');

        if (dragId === hoverId) { return }
        props.onChange({id: dragId, sectionId: hoverCard.get('sectionId'), index: hoverCard.get('index')});
    }
};

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

let Card = React.createClass({
    displayName: 'Card',

    propTypes: {
        card: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        const id = this.props.card.get('id');
        const heading = this.props.card.get('heading');

        const {connectDragSource, connectDropTarget, isDragging} = this.props;

        const classes = classNames({
            'kanban-card': true,
            '-placeholder': isDragging
        });

        return connectDropTarget(connectDragSource(
            <li className={classes}>
                <Link className="_link-without-decorations" to={`/${id}`}>
                    <div className="heading">{heading}</div>
                </Link>
            </li>
        ));
    }
});
Card = DragSource(ItemTypes.CARD, source, collectSource)(Card);
Card = DropTarget(ItemTypes.CARD, target, collectTarget)(Card);

export default Card;
