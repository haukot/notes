import React from 'react';
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// maybe for more compicated hotkeys
import {HotKeys} from 'react-hotkeys';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Modal from 'react-modal';


import Search from './search';
import NotesList from './list';
import NoteEdit from './note-edit';
import ImportModal from './import-modal';
import {EditorState} from 'draft-js';



const hotkeysMap = {
    'addNote': 'enter',
    'tabNoteRight': 'tab',
    'tabNoteLeft': 'shift+tab',
    'goToUpNote': 'up',
    'goToDownNote': 'down',
    'undo': 'ctrl+z',
    'redo': 'ctrl+shift+z'
};

const NotesApp = React.createClass({
    displayName: 'NotesApp',

    mixins: [PureRenderMixin],

    getInitialState() {
        return {importModalIsOpen: false};
    },

    // FIXME duplicate with list
    handleAddNote() {
        this.props.onNoteAdd({
            parentId: this.props.curRootNote.get('id'),
            title: EditorState.createEmpty()
        });
    },

    openImportModal() {
        this.setState({importModalIsOpen: true});
    },

    closeImportModal() {
        this.setState({importModalIsOpen: false});
    },

    handleSearch() {
        // TODO implement
    },

    render() {
        const {
            curRootNote, view, onNoteAdd,
            onNoteUpdate, onNoteDelete,
            onSetActiveNote, onNoteUpdatePosition,
            pathToRoot, onToggleNoteChildren,
            saveState, notes
        } = this.props;
        const activeNote = view.get('activeNote');
        const hotkeysHandlers = {
            'undo': this.props.onUndo,
            'redo': this.props.onRedo
        };
        return (
           <div>
            <HotKeys keyMap={hotkeysMap} handlers={hotkeysHandlers}>
                {
                    pathToRoot.reverse().map((path) => {
                        return (
                                <Link key={`link_${path.get('id')}`} className="_link-without-decorations" to={`/root/${path.get('id')}`}>
                                { path.get('title') }
                            </Link>
                        );
                    }).interpose(" > ")
                }
            <div className="row _full-height">
                <div className="column column-50 notes-page _full-height">
                <Search onChange={this.handleSearch} heading='search'/>
                <button className="button" onClick={this.handleAddNote}>Add a note</button>

                <button className="button float-right" onClick={this.openImportModal}>Import</button>
                <button className="button float-right" onClick={saveState}>Save</button>

                <div className="notes-sidebar">
                <NotesList notes={notes}
                           cantBeDropTarget={false}
                           globalOrder={this.props.globalOrder}
                           parentNote={curRootNote}
                           activeNote={view.get('activeNote')}
                           onNoteAdd={onNoteAdd}
                           onNoteUpdate={onNoteUpdate}
                           onNoteUpdatePosition={onNoteUpdatePosition}
                           onNoteDelete={onNoteDelete}
                           onSetActiveNote={onSetActiveNote}
                           onToggleNoteChildren={onToggleNoteChildren}
                />
                </div>

                </div>
                {/*
                <div className="column column-50 _full-height">
                    <NoteEdit note={activeNote} onNodeChange={onNoteUpdate} />
                </div>
                 */}
                </div>
            </HotKeys>
             <ImportModal isOpen={this.state.importModalIsOpen}
                          onRequestClose={this.closeImportModal}
                          onImportOPML={this.props.onImportOPML}
             />
          </div>
        )
    }
});
export default DragDropContext(HTML5Backend)(NotesApp);
