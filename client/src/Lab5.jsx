import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css'

function Lab5() {
    const [dishes, setDishes] = useState([]);
    const [dishesVisible, setDishesVisible] = useState(false);

    const [orders, setOrders] = useState([]);
    const [ordersVisible, setOrdersVisible] = useState(false);

    const [ages, setAges] = useState([]);
    const [agesVisible, setAgesVisible] = useState(false);

    useEffect(() => {
        if (!dishesVisible) {
            fetch('/request_5_2')
                .then(response => response.json())
                .then(data1 => setDishes(data1))
                .catch(error => console.error('Ошибка:', error));
        }

        if (!ordersVisible) {
            fetch('/request_5_3')
                .then(response => response.json())
                .then(data2 => setOrders(data2))
                .catch(error => console.error('Ошибка:', error));
        }

        if (!agesVisible) {
            fetch('/request_5_7')
                .then(response => response.json())
                .then(data3 => setAges(data3))
                .catch(error => console.error('Ошибка:', error));
        }
    }, [dishesVisible] , [ordersVisible], [agesVisible]);

    const toggleDishes = () => {
        setDishesVisible(!dishesVisible);
    };

    const toggleOrders = () => {
        setOrdersVisible(!ordersVisible);
    };

    const toggleAges = () => {
        setAgesVisible(!agesVisible);
    };

    return (
        <div className="myBody">
            <h1>Запросы 5 лабораторной работы:</h1>
            <Link to="/">
                <button className="myButtonToMain">На главную</button>
            </Link>
            <h2>Вывести среднюю стоимость и количество блюд, у которых вес превышает 200гр.</h2>
            <button onClick={toggleDishes} className="myButton">{dishesVisible ? 'Свернуть' : 'Развернуть'}</button>
            {dishesVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Средняя стоимость</th>
                        <th>Количество блюд</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dishes.map(dish => (
                        <tr>
                            <td>{dish.avg_price}</td>
                            <td>{dish.count_price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Вывести общую сумму заказов и их количество для всех способов оплаты заказов.</h2>
            <button onClick={toggleOrders} className="myButton">{ordersVisible ? 'Свернуть' : 'Развернуть'}</button>
            {ordersVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Метод оплаты</th>
                        <th>Количество заказов</th>
                        <th>Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr>
                            <td>{order.payment_method}</td>
                            <td>{order.count_order}</td>
                            <td>{order.sum}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Вывести минимальный, максимальный и средний возраст посетителей кафе-бара.</h2>
            <button onClick={toggleAges} className="myButton">{agesVisible ? 'Свернуть' : 'Развернуть'}</button>
            {agesVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Минимальная стоимость</th>
                        <th>Максимальная стоимость</th>
                        <th>Средняя стоимость</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ages.map(age => (
                        <tr>
                            <td>{age.min_age}</td>
                            <td>{age.max_age}</td>
                            <td>{age.avg_age}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Lab5;
