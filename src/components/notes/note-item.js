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

    render() {
        const note = this.props.note;
        return (
                <li> {note.get('title')} </li>
        );
    }
});
