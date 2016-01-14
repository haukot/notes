import React from 'react';
import {connect} from 'react-redux'

import Notes from 'components/notes';
import Window from 'components/window';
import {notes, view} from 'queries';
import {addNote, updateNote, setActiveNote} from 'actions';

const App = React.createClass({
    propTypes: {
        children: React.PropTypes.element,
        sections: React.PropTypes.object.isRequired
    },

    render() {
        const {dispatch, notes, view} = this.props;
        return (
            <div className="container">
                <Notes notes={notes}
                       view={view}
                       onNoteAdd={attrs => dispatch(addNote(attrs))}
                       onNoteUpdate={attrs => dispatch(updateNote(attrs))}
                       onSetActiveNote={attrs => dispatch(setActiveNote(attrs))}
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

function mapStateToProps(state) {
    return {notes: notes(state), view: view(state)};
}

export default connect(mapStateToProps)(App);
