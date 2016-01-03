import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SectionHeading from './section-heading';
import Card from './card';

export default React.createClass({
    displayName: 'Section',

    propTypes: {
        section: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onCardChange: React.PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    handleHeadingChange(heading) {
        this.props.onChange({id: this.props.section.get('id'), heading});
    },

    render() {
        const sectionId = this.props.section.get('id');
        const heading = this.props.section.get('heading');
        const cards = this.props.section.get('cards');
        return (
            <li className="kanban-section">
                <SectionHeading heading={heading} onChange={this.handleHeadingChange} />
                <ul className="kanban-cards">
                    {cards.map((card, index) => {
                        return <Card key={card.get('id')}
                                     card={card}
                                     onChange={this.props.onCardChange}
                                />
                    })}
                </ul>
                <div className="add">Add a card</div>
            </li>
        );
    }
});
