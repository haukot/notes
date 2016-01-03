import React from 'react';
import {connect} from 'react-redux'

import Board from 'components/board';
import Window from 'components/window';
import {sections} from 'queries';

const App = React.createClass({
    displayName: 'App',

    propTypes: {
        children: React.PropTypes.element,
        sections: React.PropTypes.object.isRequired
    },

    render() {
        const {sections} = this.props;
        return (
            <div className="_full-height">
                <Board sections={sections} />

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
    return {sections: sections(state)};
}

export default connect(mapStateToProps)(App);
