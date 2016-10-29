import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, ContentState, SelectionState, Modifier} from 'draft-js';

const NoteItemEditor = React.createClass({
    initialEditorState(text) {
        let state = text
            ? EditorState.createWithContent(ContentState.createFromText(this.props.html))
            : EditorState.createEmpty();
        return state;
    },

    updateEditorState(editorState, newText) {
        let selectionState = editorState.getSelection();
        let offset = selectionState.getStartOffset();

        let contentState = editorState.getCurrentContent();
        let block = contentState.getLastBlock();
        let newBlock = block.merge({text: newText});

        var newContentState = contentState.merge({
            blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
            // selectionAfter: selectionState.merge({
            //     anchorOffset: offset + newText.length,
            //     focusOffset: offset + newText.length,
            // })
        });
        // let newSelectionState = selectionState.merge({anchorOffset: 0, focusOffset: newText.length});
        // let newContentState = Modifier.replaceText(contentState, newSelectionState, newText);
        return EditorState.push(editorState, newContentState, 'change-text');
    },

    // getInitialState() {
    //     let initialEditorState = this.initialEditorState(this.props.html);
    //     // let editorState = this.updateEditorState(initialEditorState, this.props.html);
    //     return {editorState: this.updateEditorState(initialEditorState, this.props.html), html: this.props.html};
    // },

    // shouldComponentUpdate(nextProps) {
    //     return this.state.html !== nextProps.html;
    // },

    // componentDidUpdate() {
    //     console.log('update');
    //     this.setState({editorState: this.updateEditorState(this.state.editorState, this.props.html),
    //                    html: this.props.html})
    // },

    onChange(editorState) {
        // console.log(editorState.toJS());
        this.setState({editorState: editorState});
        // let text = editorState.getCurrentContent().getPlainText();
        // this.props.onChange(text);
    },


    render() {
        // const {editorState} = this.state;
        // let editorState = {editorState: thisgetEditorState(this.props.html)};
        // <HotKeys handlers={handlers}>

        // </HotKeys>
        return <Editor editorState={this.props.html} ref='editor' onChange={this.props.onChange} />;
    }
});
export default NoteItemEditor;

// this.hotKeysHandlers = {
//     'addNote': (e) => this.handleAddNote(e, {after: this.props.note.get('id')}),
//     'tabNoteRight': this.handleTabNoteRight,
//     'tabNoteLeft': this.handleTabNoteLeft,
//     'goToUpNote': this.handleGoToUpNote,
//     'goToDownNote': this.handleGoToDownNote,
// };

// <ContentEditable className="clean notes-item_input" html={note.get('title') || ""}
//     ref='title'
//     onClick={this.handleSetActiveNote}
//     onKeyUp={this.handleKeyUp}
//     onKeyDown={this.handleKeyDown}
//     onChange={this.handleNoteUpdate} />
