import React from 'react';
import {Link} from 'react-router';

function Section({heading, cards}) {
    return <li className="kanban-section">
        <div className="heading">TODO: scroll</div>
        <ul className="kanban-cards">
            <li>
                <Link className="kanban-card _link-without-decorations" to="/123">
                    <div className="heading">__ОТКРЫТЬ КАРТОЧКУ__</div>
                </Link>
            </li>
            <li className="kanban-card"><div className="heading">Линейное уравнение, не вдаваясь в подробности, порождает комплексный степенной ряд.</div></li>
            <li className="kanban-card"><div className="heading">Критерий сходимости Коши, не вдаваясь в подробности, выведен.</div></li>
            <li className="kanban-card"><div className="heading">Прямоугольная матрица программирует интеграл от функции комплексной переменной.</div></li>
            <li className="kanban-card"><div className="heading">Доказательство отражает сходящийся ряд.</div></li>
            <li className="kanban-card"><div className="heading">Предел последовательности вполне вероятен.</div></li>
            <li className="kanban-card"><div className="heading">Очевидно проверяется, что теорема Гаусса - Остроградского осмысленно обуславливает экспериментальный вектор. </div></li>
            <li className="kanban-card"><div className="heading">Очевидно проверяется, что аффинное преобразование небезынтересно специфицирует косвенный контрпример. </div></li>
            <li className="kanban-card"><div className="heading">Огибающая семейства поверхностей, не вдаваясь в подробности, привлекает сходящийся ряд, что несомненно приведет нас к истине.</div></li>
        </ul>
        <div className="add">Add a card</div>
    </li>;
}


export default React.createClass({
    displayName: 'Board',

    render() {
        return (
            <ul className="kanban-board">
                <Section />

                <li className="kanban-section">
                    <div className="kanban-section-edit-heading-form">
                        <textarea className="input" />
                        <div className="submit">Save</div>
                        <div className="cancel">Cancel</div>
                    </div>
                    <ul className="kanban-cards">
                        <li className="kanban-card"><div className="heading">Task 1</div></li>
                        <li className="kanban-card"><div className="heading">Task 2</div></li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>


                <li className="kanban-section">
                    <div className="heading">Новая задача</div>
                    <ul className="kanban-cards">
                        <li className="kanban-card"><div className="heading">Task 1</div></li>
                        <li className="kanban-card"><div className="heading">Task 2</div></li>
                    </ul>
                    <div className="kanban-card-new-form">
                        <textarea rows="4" placeholder="Type..." className="input" />
                        <div className="submit">Add</div>
                        <div className="cancel">Cancel</div>
                    </div>
                </li>

                <li className="kanban-section">
                    <div className="heading">Drag</div>
                    <ul className="kanban-cards">
                        <li className="kanban-card -placeholder"><div className="heading">Some task</div></li>
                        <li
                            className="kanban-card -grabbing"
                            style={{position: 'absolute',
                                    left: '870px',
                                    top: '50px',
                                    width: '270px'}}>
                            <div className="heading">Task 1</div>
                        </li>
                        <li className="kanban-card"><div className="heading">Task 1</div></li>
                        <li className="kanban-card"><div className="heading">Task 2</div></li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>

                <li className="kanban-section -placeholder">
                    <div className="heading">Drag</div>
                    <ul className="kanban-cards">
                        <li className="kanban-card"><div className="heading">Task 1</div></li>
                        <li className="kanban-card"><div className="heading">Task 2</div></li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>

                <li
                    className="kanban-section -grabbing"
                    style={{position: 'absolute',
                            left: '1150px',
                            top: '20px',
                            width: '270px'}}>
                    <div className="heading">Drag</div>
                    <ul className="kanban-cards">
                        <li className="kanban-card"><div className="heading">Task 1</div></li>
                        <li className="kanban-card"><div className="heading">Task 2</div></li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>

                <li className="add">Add a list...</li>

                <li className="kanban-section-new-form">
                    <textarea rows="4" placeholder="Type..." className="input" />
                    <div className="submit">Add</div>
                    <div className="cancel">Cancel</div>
                </li>
            </ul>
        )
    }
});
