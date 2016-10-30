import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, ContentState, SelectionState, Modifier} from 'draft-js';

console.error = (function() {
    var error = console.error

    return function(exception) {
        if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
            error.apply(console, arguments)
        }
    }
})()

const NoteItemEditor = React.createClass({
    // getInitialState() {
    //     return {editorState: EditorState.createWithContent(this.props.value),
    //             contentState: this.props.value};
    // },

    componentDidMount() {
        if (this.props.needFocus) {
            this.refs.editor.focus();
        }
    },

    componentWillReceiveProps(newProps, oldProps) {
        if (newProps.needFocus && !this.props.needFocus) {
            this.refs.editor.focus();
        }
        // if (newProps.value !== this.state.contentState) {
        //     this.setState({
        //         editorState: EditorState.createWithContent(this.props.value),
        //         contentState: this.props.value
        //     });
        // }
    },

    // onChange(editorState) {
    //     this.setState({editorState: editorState, contentState: editorState.getCurrenContent()}, () => {
    //         this.props.onChange(this.state.contentState);
    //     });
    //     // let text = editorState.getCurrentContent().getPlainText();
    // },

    handleKeyCommand(command) {
        if (command === 'backspace' || command === 'backspace-word') {
            if (!this.props.html.getCurrentContent().hasText()) {
                this.props.onSuicide();
                return 'handled';
            }
            return 'not-handled';
        }
        console.log(command);
        return 'handled';
    },

    render() {
        // TODO заменить on(Up|Down)Arrow, onTab на чистый HotKeys. Сейчас после удаления ноты
        // эти хендлеры срабатывают, но HotKeys в note-item не ловит события
        return <Editor editorState={this.props.html}
                       ref='editor'
                       onUpArrow={this.props.onUpArrow}
                       onDownArrow={this.props.onDownArrow}
                       onTab={this.props.onTab}
                       handleReturn={this.props.onReturn}
                       onChange={this.props.onChange}
                       handleKeyCommand={this.handleKeyCommand}
            />;
    }
});
export default NoteItemEditor;
