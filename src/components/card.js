import React from 'react';

export default React.createClass({
    displayName: 'Card',

    componentDidMount() {
        document.body.classList.add('_card-is-opened');
    },

    componentWillUnmount() {
        document.body.classList.remove('_card-is-opened');
    },

    render() {
        return (
            <div className="opened-window">
                <div className="opened-card">
                    <textarea className="heading"/>
                    <textarea className="description"/>
                    <div className="actions">
                        <div className="submit">save</div>
                        <div className="close">cancel</div>
                        <div className="delete">delete</div>
                    </div>
                </div>
            </div>
        )
    }
});
