import React from 'react';

export default React.createClass({
    displayName: 'Window',

    componentDidMount() {
        document.body.classList.add('_window-is-opened');
    },

    componentWillUnmount() {
        document.body.classList.remove('_window-is-opened');
    },

    render() {
        return (
            <div className="opened-window">
                {this.props.children}
            </div>
        )
    }
});
