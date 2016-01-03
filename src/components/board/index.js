import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Section from './section';

const Board = React.createClass({
    displayName: 'Board',

    mixins: [PureRenderMixin],

    render() {
        const {sections, onSectionChange, onCardChange} = this.props;
        return (
            <ul className="kanban-board">
                {sections.map(section => {
                    return <Section key={section.get('id')}
                                    section={section}
                                    onChange={onSectionChange}
                                    onCardChange={onCardChange}
                           />
                })}
            </ul>
        )
    }
});
export default DragDropContext(HTML5Backend)(Board);

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
