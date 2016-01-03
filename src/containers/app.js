import React from 'react';
import {connect} from 'react-redux'

import Board from 'components/board';
import Window from 'components/window';
import {sections} from 'queries';
import {updateSection, updateCard} from 'actions';

const App = React.createClass({
    propTypes: {
        children: React.PropTypes.element,
        sections: React.PropTypes.object.isRequired
    },

    render() {
        const {dispatch, sections} = this.props;
        return (
            <div className="_full-height">
                <Board sections={sections}
                       onSectionChange={attrs => dispatch(updateSection(attrs))}
                       onCardChange={attrs => dispatch(updateCard(attrs))}
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
    return {sections: sections(state)};
}

export default connect(mapStateToProps)(App);
