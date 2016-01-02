import React from 'react';
import Board from 'components/board';
import Window from 'components/window';

export default React.createClass({
    displayName: 'App',

    propTypes: {
        children: React.PropTypes.element
    },

    render() {
        return (
            <div className="_full-height">
                <Board />

                {React.Children.count(this.props.children) == 1 &&
                <Window>
                    {this.props.children}
                </Window>
                }
            </div>
        )
    }
});
