import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
    displayName: 'NoteEdit',

    propTypes: {
        note: React.PropTypes.object.isRequired,
        // onChange: React.PropTypes.func.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    // handleHeadingChange(heading) {
    //     this.props.onChange({id: this.props.section.get('id'), heading});
    // },

    render() {
        const note = this.props.note
        return (
            <div className="note-edit">
                {note.get('title')}
            </div>
        );
    }
});
