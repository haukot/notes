import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localforage from 'localforage';

const STORE_KEY = 'editorText';
export default React.createClass({
    displayName: 'NoteEdit',

    propTypes: {
        // note: React.PropTypes.object.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return {text: ''};
    },

    componentDidMount() {
        this.refs.editor.focus();
        return localforage.getItem(STORE_KEY).then((value) => {
            this.setState({text: value});
        }).catch((err) => {
            console.log('There not have text in localForage', err);
        });
    },

    componentDidUpdate() {
        // after add new note focus title input

        // comment пока не разберусь с остальной логикой
        // let bodyHasFocus = this.refs.body === document.activeElement;
        // if (this.props.note.get('title') === "" && !bodyHasFocus) {
        //     this.refs.title.focus();
        // }
    },

    handleChange() {
        // this.props.onNodeChange({
        //     id: this.props.note.get("id"),
        //     title: this.refs.title.value,
        //     body: this.refs.body.value
        // });
        let value = this.refs.editor.value;
        localforage.setItem(STORE_KEY, value).catch((err) => {
            console.log('Error in save editor', err);
        });
        this.setState({text: value});
    },

    render() {
        // const note = this.props.note;
        return (
            <div className="note-edit">
                {/*
                <h5 className="note-edit_heading">
                <input className="clean" value={note.get('title')} ref='title' onChange={this.handleChange} />
                </h5>
                 */}

                <div className="note-edit_body">
                <textarea className="clean _full-height" ref='editor'
                          value={this.state.text}
                          onChange={this.handleChange} />
                </div>
            </div>
        );
    }
});
