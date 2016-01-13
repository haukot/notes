import React from 'react';
import {connect} from 'react-redux'

import Notes from 'components/notes';
import Window from 'components/window';
import {notes} from 'queries';
import {addNote, updateNote} from 'actions';

const App = React.createClass({
    propTypes: {
        children: React.PropTypes.element,
        sections: React.PropTypes.object.isRequired
    },

    render() {
        const {dispatch, notes} = this.props;
        return (
            <div className="_full-height">
                <Notes notes={notes}
                       onNoteAdd={attrs => dispatch(addNote(attrs))}
                       onNoteUpdate={attrs => dispatch(updateNote(attrs))}
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
    return {notes: notes(state)};
}

export default connect(mapStateToProps)(App);
