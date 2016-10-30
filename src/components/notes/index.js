import React from 'react';
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modal from 'react-modal';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Search from './search';
import NotesList from './list';
import NoteEdit from './edit';
import NotesHotKeys from './hotkeys';
import ImportModal from './import-modal';

const NotesApp = React.createClass({
    displayName: 'NotesApp',

    mixins: [PureRenderMixin],

    getInitialState() {
        return {importModalIsOpen: false, leftSide: 'nestedList'};
    },

    // FIXME duplicate with list
    handleAddNote() {
        this.props.onNoteAdd({
            parentId: this.props.curRootNote.get('id'),
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

    renderBreadcrumbs(pathToRoot) {
        return pathToRoot.reverse().map((note) => {
            let path = `/root/${note.get('id')}`;
            return (
                <Link key={note.get('id')} className="_link-without-decorations" to={path}>
                { note.get('title') }
                </Link>
            );
        }).interpose(' > ');
    },

    handleRenderLeftSide(type) {
        this.setState({leftSide: type});
    },

    render() {
        const {
            curRootNote, view, onNoteAdd,
            onNoteUpdate, onNoteDelete,
            onSetActiveNote, onNoteUpdatePosition,
            pathToRoot, onToggleNoteChildren,
            saveState, notes
        } = this.props;
        const hotkeysHandlers = {
            'undo': this.props.onUndo,
            'redo': this.props.onRedo,
        };
        let leftSide = null;
        if (this.state.leftSide === 'editor') {
            leftSide = <NoteEdit onNodeChange={onNoteUpdate} />;
        } else if (this.state.leftSide === 'nestedList') {
            leftSide = <NotesList notes={notes}
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
                       />;
        }
        return (
            <div>
                <NotesHotKeys handlers={hotkeysHandlers}>
                    { this.renderBreadcrumbs(pathToRoot) }
                    <div className="row _full-height">
                        <div className="column column-50 notes-page _full-height">
                            <Search onChange={this.handleSearch} heading='search'/>
                            <button className="button" onClick={this.handleAddNote}>Add a note</button>

                            <button className="button float-right" onClick={this.openImportModal}>Import</button>
                            <button className="button float-right" onClick={saveState}>Save</button>
                            <span className="delimiter float-right"></span>
                            <Link to="/editor" className="button button-black float-right"> Editor </Link>

                            <div className="notes-sidebar">
                                { leftSide }
                            </div>

                        </div>
                        <div className="column column-50 _full-height">
                        </div>
                    </div>
                </NotesHotKeys>
                <ImportModal isOpen={this.state.importModalIsOpen}
                             onRequestClose={this.closeImportModal}
                             onImportOPML={this.props.onImportOPML}
                />
            </div>
        );
    },
});
export default DragDropContext(HTML5Backend)(NotesApp);
