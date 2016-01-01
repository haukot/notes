import React from 'react';

export default React.createClass({
    render() {
        return (
            <ul className="kanban-board">
                <li className="kanban-section">
                    <div className="heading">TODO: scroll</div>
                    <ul className="kanban-cards">
                        <li className="kanban-card">Первая производная отражает интеграл по поверхности. </li>
                        <li className="kanban-card">Линейное уравнение, не вдаваясь в подробности, порождает комплексный степенной ряд.</li>
                        <li className="kanban-card">Критерий сходимости Коши, не вдаваясь в подробности, выведен.</li>
                        <li className="kanban-card">Прямоугольная матрица программирует интеграл от функции комплексной переменной.</li>
                        <li className="kanban-card">Доказательство отражает сходящийся ряд.</li>
                        <li className="kanban-card">Предел последовательности вполне вероятен.</li>
                        <li className="kanban-card">Очевидно проверяется, что теорема Гаусса - Остроградского осмысленно обуславливает экспериментальный вектор. </li>
                        <li className="kanban-card">Очевидно проверяется, что аффинное преобразование небезынтересно специфицирует косвенный контрпример. </li>
                        <li className="kanban-card">Огибающая семейства поверхностей, не вдаваясь в подробности, привлекает сходящийся ряд, что несомненно приведет нас к истине.</li>
                    </ul>
                    <div className="add">Add a card</div>
                </li>

                <li className="kanban-section">
                    <div className="kanban-section-edit-heading-form">
                        <textarea className="input" />
                        <div className="save">Save</div>
                        <div className="cancel">Cancel</div>
                    </div>
                    <ul className="kanban-cards">
                        <li className="kanban-card">Task 1</li>
                        <li className="kanban-card">Task 2</li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>


                <li className="kanban-section">
                    <div className="kanban-section-edit-header-form">
                        <div className="show">Новая задача</div>
                    </div>
                    <ul className="kanban-cards">
                        <li className="kanban-card">Task 1</li>
                        <li className="kanban-card">Task 2</li>
                    </ul>
                    <div className="kanban-card-new-form">
                        <textarea rows="4" placeholder="Type..." className="heading" />
                        <div className="add">Add</div>
                        <div className="cancel">Cancel</div>
                    </div>
                </li>

                <li className="kanban-section">
                    <div className="header">Drag</div>
                    <ul className="cards">
                        <li className="kanban-card -placeholder">Some task</li>
                        <li
                            className="kanban-card -grabbing"
                            style={{position: 'absolute',
                                    left: '650px',
                                    top: '50px',
                                    width: '270px'}}>
                            Task 1
                        </li>
                        <li className="kanban-card">Task 1</li>
                        <li className="kanban-card">Task 2</li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>

                <li className="kanban-list -placeholder">
                    <div className="header">Drag</div>
                    <ul className="cards">
                        <li className="kanban-card">Task 1</li>
                        <li className="kanban-card">Task 2</li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>

                <li
                    className="kanban-list -grabbing"
                    style={{position: 'absolute',
                            left: '1250px',
                            top: '20px',
                            width: '270px'}}>
                    <div className="header">Drag</div>
                    <ul className="cards">
                        <li className="kanban-card">Task 1</li>
                        <li className="kanban-card">Task 2</li>
                    </ul>
                    <div className="add">Add a card...</div>
                </li>

                <li className="add-kanban-list">Add a list...</li>
            </ul>
        )
    }
});
