import React from 'react';

export default React.createClass({
    displayName: 'Card',

    render() {
        return (
            <div className="opened-card">
                <textarea className="heading"/>
                <textarea className="description"/>
                <div className="actions">
                    <div className="submit">save</div>
                    <div className="close">cancel</div>
                    <div className="delete">delete</div>
                </div>
            </div>
        )
    }
});
