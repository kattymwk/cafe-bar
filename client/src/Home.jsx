import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './main.css'

function Home() {
    const [visitors, setVisitors] = useState([]);
    const [visitorsVisible, setVisitorsVisible] = useState(false); // Состояние видимости списка посетителей

    const [employees, setEmployees] = useState([]);
    const [employeesVisible, setEmployeesVisible] = useState(false);

    const [posts, setPosts] = useState([]);
    const [postsVisible, setPostsVisible] = useState(false);

    const [dishes, setDishes] = useState([]);
    const [dishesVisible, setDishesVisible] = useState(false);

    const [orders, setOrders] = useState([]);
    const [ordersVisible, setOrdersVisible] = useState(false);

    const [tables, setTables] = useState([]);
    const [tablesVisible, setTablesVisible] = useState(false);

    const [query, setQuery] = useState(''); // Состояние для хранения введенного запроса
    const [data0, setData] = useState([]);


    useEffect(() => {
        if (visitorsVisible) {
            // Получение списка посетителей
            fetch('/visitors')
                .then(response => response.json())
                .then(data => setVisitors(data))
                .catch(error => console.error('Ошибка:', error));
        }

        if (employeesVisible) {
            fetch('/employees')
                .then(response => response.json())
                .then(data => setEmployees(data))
                .catch(error => console.error('Ошибка:', error));
        }

        if (postsVisible) {
            fetch('/posts')
                .then(response => response.json())
                .then(data => setPosts(data))
                .catch(error => console.error('Ошибка:', error));
        }

        if (dishesVisible) {
            fetch('/dishes')
                .then(response => response.json())
                .then(data => setDishes(data))
                .catch(error => console.error('Ошибка:', error));
        }

        if (ordersVisible) {
            fetch('/orders')
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(error => console.error('Ошибка:', error));
        }

        if (tablesVisible) {
            fetch('/tables')
                .then(response => response.json())
                .then(data => setTables(data))
                .catch(error => console.error('Ошибка:', error));
        }
    }, [visitorsVisible, employeesVisible, postsVisible, dishesVisible, ordersVisible, tablesVisible]);

    const toggleVisitors = () => {
        setVisitorsVisible(!visitorsVisible);
    };

    const toggleEmployees = () => {
        setEmployeesVisible(!employeesVisible);
    };

    const togglePosts = () => {
        setPostsVisible(!postsVisible);
    };

    const toggleDishes = () => {
        setDishesVisible(!dishesVisible);
    };

    const toggleOrders = () => {
        setOrdersVisible(!ordersVisible);
    };

    const toggleTables = () => {
        setTablesVisible(!tablesVisible);
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Обновление состояния при изменении ввода
    };

    const executeQuery = () => {
        // Выполнение запроса при нажатии кнопки
        fetch(`/custom-query?query=${encodeURIComponent(query)}`) // Предполагается, что ваш сервер обрабатывает запросы по этому маршруту и использует query в качестве параметра
            .then(response => response.json())
            .then(data0 => setData(data0))
            .catch(error => console.error('Ошибка:', error));
    };

    return (
        <div className="myBody">
            <div className="buttons">
                <Link to="/lab4">
                    <button className="myButtonToLabs">Запросы 4 лабы</button>
                </Link>
                <Link to="/lab5">
                    <button className="myButtonToLabs">Запросы 5 лабы</button>
                </Link>
            </div>
            <h2>Введите пользовательский запрос:</h2>
            <div className="request">
                <input type="text" value={query} onChange={handleInputChange} className="input" />
                <button onClick={executeQuery} className="myButton">Выполнить запрос</button>
                <table className="myTable">
                    <tbody>
                    {data0.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <h1>Таблицы:</h1>
            <h2>Список посетителей</h2>
            <button onClick={toggleVisitors} className="myButton">{visitorsVisible ? 'Свернуть' : 'Развернуть'}</button>
            {visitorsVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Номер телефона</th>
                        <th>Возраст</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visitors.map(visitor => (
                        <tr>
                            <td>{visitor.visitor_id}</td>
                            <td>{visitor.name}</td>
                            <td>{visitor.phone_number}</td>
                            <td>{visitor.age}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Список сотрудников</h2>
            <button onClick={toggleEmployees} className="myButton">{employeesVisible ? 'Свернуть' : 'Развернуть'}</button>
            {employeesVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Номер паспорта</th>
                        <th>Имя</th>
                        <th>Номер телефона</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr>
                            <td>{employee.passport_number}</td>
                            <td>{employee.name}</td>
                            <td>{employee.phone_number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Список должностей</h2>
            <button onClick={togglePosts} className="myButton">{postsVisible ? 'Свернуть' : 'Развернуть'}</button>
            {postsVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Обязанности</th>
                        <th>Зарплата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post => (
                        <tr>
                            <td>{post.post_id}</td>
                            <td>{post.name}</td>
                            <td>{post.responsibilities}</td>
                            <td>{post.salary}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Список блюд</h2>
            <button onClick={toggleDishes} className="myButton">{dishesVisible ? 'Свернуть' : 'Развернуть'}</button>
            {dishesVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dishes.map(dish => (
                        <tr>
                            <td>{dish.dish_id}</td>
                            <td>{dish.name}</td>
                            <td>{dish.price}</td>
                            <td>{dish.weight}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>


            )}

            <h2>Список заказов</h2>
            <button onClick={toggleOrders} className="myButton">{ordersVisible ? 'Свернуть' : 'Развернуть'}</button>
            {ordersVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Время заказа</th>
                        <th>Сумма счета</th>
                        <th>Способ оплаты</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr>
                            <td>{order.order_number}</td>
                            <td>{order.order_time}</td>
                            <td>{order.sum}</td>
                            <td>{order.payment_method}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>


            )}

            <h2>Список столов</h2>
            <button onClick={toggleTables} className="myButton">{tablesVisible ? 'Свернуть' : 'Развернуть'}</button>
            {tablesVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Номер стола</th>
                        <th>Вместимость</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tables.map(table => (
                        <tr>
                            <td>{table.table_number}</td>
                            <td>{table.capacity}</td>
                            <td>{table.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}


        </div>
    );
}

export default Home;
