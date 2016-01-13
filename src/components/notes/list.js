import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Search from './search';
import NoteItem from './note-item';

export default React.createClass({
    displayName: 'NotesList',

    propTypes: {
        notes: React.PropTypes.object.isRequired,
        // onChange: React.PropTypes.func.isRequired,
        // onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    // handleHeadingChange(heading) {
    //     this.props.onChange({id: this.props.section.get('id'), heading});
    // },

    render() {
        return (
            <div className="notes-list">
                <Search onChange={this.handleHeadingChange} />
                <div className="add">Add a note</div>
                {this.props.notes.map((note, index) => {
                    return <NoteItem key={note.get('id')}
                    note={note}
                        />
                })}
            </div>
        );
    }
});
