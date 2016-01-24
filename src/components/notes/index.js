import React from 'react';
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// maybe for more compicated hotkeys
import {HotKeys} from 'react-hotkeys';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Search from './search';
import NotesList from './list';
import NoteEdit from './note-edit';


const hotkeysMap = {
    'addNote': 'enter',
    'tabNoteRight': 'tab',
    'tabNoteLeft': 'shift+tab',
    'goToUpNote': 'up',
    'goToDownNote': 'down'

};

const NotesApp = React.createClass({
    displayName: 'NotesApp',

    mixins: [PureRenderMixin],

    // FIXME duplicate with list
    handleAddNote() {
        this.props.onNoteAdd({parentId: this.props.curRootNote.get('id')});
    },

    render() {
        const {curRootNote, view, onNoteAdd,
               onNoteUpdate, onNoteDelete,
               onSetActiveNote, onNoteUpdatePosition,
               pathToRoot, onToggleNoteChildren} = this.props;
        const activeNote = view.get('activeNote');
        return (
            <HotKeys keyMap={hotkeysMap}>
                {
                    pathToRoot.reverse().map((path) => {
                        return (
                            <Link className="_link-without-decorations" to={`/root/${path.get('id')}`}>
                                { path.get('title') }
                            </Link>
                        );
                    }).interpose(" > ")
                }
            <div className="row panel _full-height">
                <div className="column column-20 _full-height">
                <Search onChange={this.handleSearch} />
                <button className="button" onClick={this.handleAddNote}>Add a note</button>

                <div className="notes-sidebar">
                <NotesList notes={curRootNote.get('children')}
                           cantBeDropTarget={false}
                           globalOrder={this.props.globalOrder}
                           parentNote={curRootNote}
                           activeNoteId={view.get('activeListNoteId')}
                           onNoteAdd={onNoteAdd}
                           onNoteUpdate={onNoteUpdate}
                           onNoteUpdatePosition={onNoteUpdatePosition}
                           onNoteDelete={onNoteDelete}
                           onSetActiveNote={onSetActiveNote}
                           onToggleNoteChildren={onToggleNoteChildren}
                />
                </div>

                </div>
                <div className="column column-75 _full-height">
                    <NoteEdit note={activeNote} onNodeChange={onNoteUpdate} />
                </div>
            </div>
            </HotKeys>
        )
    }
});
export default DragDropContext(HTML5Backend)(NotesApp);
