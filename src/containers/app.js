import React from 'react';
import {connect} from 'react-redux'

import Notes from 'components/notes';
import Window from 'components/window';
import {currentRootNoteSelector, viewSelector,
        globalOrderSelector, pathToRootSelector} from 'queries';
import {addNote, updateNote, deleteNote,
        setActiveNote, updateNotePosition,
        toggleNoteChildren, importOPML} from 'actions';

const App = React.createClass({
    propTypes: {
        notes: React.PropTypes.object.isRequired
    },

    render() {
        const {dispatch, curRootNote, pathToRoot, view, globalOrder} = this.props;
        return (
            <div className="container">
                <Notes curRootNote={curRootNote}
                       pathToRoot={pathToRoot}
                       globalOrder={globalOrder}
                       view={view}
                       onNoteAdd={attrs => dispatch(addNote(attrs))}
                       onNoteUpdate={attrs => dispatch(updateNote(attrs))}
                       onNoteUpdatePosition={attrs => dispatch(updateNotePosition(attrs))}
                       onNoteDelete={attrs => dispatch(deleteNote(attrs))}
                       onSetActiveNote={attrs => dispatch(setActiveNote(attrs))}
                       onToggleNoteChildren={attrs => dispatch(toggleNoteChildren(attrs))}
                       onImportOPML={attrs => dispatch(importOPML(attrs))}
                />

                {React.Children.count(this.props.children) == 1 &&
                <Window>
                    {this.props.children}
                </Window>
                }
            </div>
        )
    }
});

function mapStateToProps(state, props) {
    return {curRootNote: currentRootNoteSelector(state, props),
            pathToRoot: pathToRootSelector(state, props),
            view: viewSelector(state, props),
            globalOrder: globalOrderSelector(state, props)};
}

export default connect(mapStateToProps)(App);
