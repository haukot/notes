import React from 'react';
// maybe for more compicated hotkeys
import {HotKeys} from 'react-hotkeys';

const hotkeysMap = {
    'enter': 'enter',
    'tab': 'tab',
    'tabLeft': 'shift+tab',
    'up': 'up',
    'down': 'down',
    'undo': 'ctrl+z',
    'redo': 'ctrl+shift+z',
};

const NotesHotKeys = React.createClass({
    displayName: 'NotesHotKeys',

    render() {
        return <HotKeys keyMap={hotkeysMap} handlers={this.props.handlers}>
            { this.props.children }
        </HotKeys>;
    },
});
export default NotesHotKeys;
