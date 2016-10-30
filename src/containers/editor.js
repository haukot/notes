import React from 'react';
import Editor from 'components/notes/edit';

const EditorApp = React.createClass({
    render() {
        const {dispatch, notes, curRootNote, pathToRoot, view, globalOrder} = this.props;
        return (
            <div className="container">
                <div className="row _full-height">
                    <div className="column column-50 column-offset-25 notes-page notes-editor _full-height">
                        <Editor />
                    </div>
                </div>
            </div>
        );
    },
});

export default EditorApp;
