import React from 'react';
import {Link} from 'react-router';

const Card = React.createClass({
    render() {
        const id = this.props.card.get('id');
        const heading = this.props.card.get('heading');
        return (
            <li className="kanban-card">
                <Link className="_link-without-decorations" to={`/${id}`}>
                    <div className="heading">{heading}</div>
                </Link>
            </li>
        );
    }
});

const Section = React.createClass({
    render() {
        const heading = this.props.section.get('heading');
        const cards = this.props.section.get('cards');
        return (
            <li className="kanban-section">
                <div className="heading">{heading}</div>
                <ul className="kanban-cards">
                    {cards.map(card => <Card key={card.get('id')} card={card} />)}
                </ul>
                <div className="add">Add a card</div>
            </li>
        );
    }
});

export default React.createClass({
    displayName: 'Board',

    render() {
        const {sections} = this.props;
        return (
            <ul className="kanban-board">
                {sections.map(section => <Section key={section.get('id')} section={section} />)}
            </ul>
        )
    }
});


//export default React.createClass({
//    displayName: 'Board',
//
//    render() {
//        return (
//            <ul className="kanban-board">
//                <Section />
//
//                <li className="kanban-section">
//                    <div className="kanban-section-edit-heading-form">
//                        <textarea className="input" />
//                        <div className="submit">Save</div>
//                        <div className="cancel">Cancel</div>
//                    </div>
//                    <ul className="kanban-cards">
//                        <li className="kanban-card"><div className="heading">Task 1</div></li>
//                        <li className="kanban-card"><div className="heading">Task 2</div></li>
//                    </ul>
//                    <div className="add">Add a card...</div>
//                </li>
//
//
//                <li className="kanban-section">
//                    <div className="heading">Новая задача</div>
//                    <ul className="kanban-cards">
//                        <li className="kanban-card"><div className="heading">Task 1</div></li>
//                        <li className="kanban-card"><div className="heading">Task 2</div></li>
//                    </ul>
//                    <div className="kanban-card-new-form">
//                        <textarea rows="4" placeholder="Type..." className="input" />
//                        <div className="submit">Add</div>
//                        <div className="cancel">Cancel</div>
//                    </div>
//                </li>
//
//                <li className="kanban-section">
//                    <div className="heading">Drag</div>
//                    <ul className="kanban-cards">
//                        <li className="kanban-card -placeholder"><div className="heading">Some task</div></li>
//                        <li
//                            className="kanban-card -grabbing"
//                            style={{position: 'absolute',
//                                    left: '870px',
//                                    top: '50px',
//                                    width: '270px'}}>
//                            <div className="heading">Task 1</div>
//                        </li>
//                        <li className="kanban-card"><div className="heading">Task 1</div></li>
//                        <li className="kanban-card"><div className="heading">Task 2</div></li>
//                    </ul>
//                    <div className="add">Add a card...</div>
//                </li>
//
//                <li className="kanban-section -placeholder">
//                    <div className="heading">Drag</div>
//                    <ul className="kanban-cards">
//                        <li className="kanban-card"><div className="heading">Task 1</div></li>
//                        <li className="kanban-card"><div className="heading">Task 2</div></li>
//                    </ul>
//                    <div className="add">Add a card...</div>
//                </li>
//
//                <li
//                    className="kanban-section -grabbing"
//                    style={{position: 'absolute',
//                            left: '1150px',
//                            top: '20px',
//                            width: '270px'}}>
//                    <div className="heading">Drag</div>
//                    <ul className="kanban-cards">
//                        <li className="kanban-card"><div className="heading">Task 1</div></li>
//                        <li className="kanban-card"><div className="heading">Task 2</div></li>
//                    </ul>
//                    <div className="add">Add a card...</div>
//                </li>
//
//                <li className="add">Add a list...</li>
//
//                <li className="kanban-section-new-form">
//                    <textarea rows="4" placeholder="Type..." className="input" />
//                    <div className="submit">Add</div>
//                    <div className="cancel">Cancel</div>
//                </li>
//            </ul>
//        )
//    }
//});
