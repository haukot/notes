import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
    displayName: 'NoteItem',

    propTypes: {
        // section: React.PropTypes.object.isRequired,
        // onChange: React.PropTypes.func.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    handleClick() {
        this.props.onClick(this.props.note.get('id'));
    },

    render() {
        const note = this.props.note;
        return (
            <li className="notes-item" onClick={this.handleClick}>
                {note.get('title')}
            </li>
        );
    }
});
