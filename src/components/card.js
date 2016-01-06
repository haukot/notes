import React from 'react';
import {History} from 'react-router';

export default React.createClass({
    displayName: 'Card',

    mixins: [History],

    handleClose() {
        this.history.push('/');
    },

    render() {
        return (
            <div className="opened-card">
                <textarea className="heading"/>
                <textarea className="description"/>
                <div className="actions">
                    <div className="submit">save</div>
                    <div className="close" onClick={this.handleClose}>cancel</div>
                    <div className="delete">delete</div>
                </div>
            </div>
        )
    }
});
