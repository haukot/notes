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

    componentDidUpdate() {
        // after add new note focus title input
        let bodyHasFocus = this.refs.body === document.activeElement;
        if (this.props.note.get('title') === "" && !bodyHasFocus) {
            this.refs.title.focus();
        }
    },

    handleChange() {
        this.props.onNodeChange({
            id: this.props.note.get("id"),
            title: this.refs.title.value,
            body: this.refs.body.value
        });
    },

    render() {
        const note = this.props.note
        return (
            <div className="note-edit">
                <h5 className="note-edit_heading">
                <input className="clean" value={note.get('title')} ref='title' onChange={this.handleChange} />
                </h5>

                <div className="note-edit_body">
                <textarea className="clean _full-height" ref='body'
                          value={note.get('body')}
                          onChange={this.handleChange} />
                </div>
            </div>
        );
    }
});
