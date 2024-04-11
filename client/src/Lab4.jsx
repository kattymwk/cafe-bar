import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css'

function Lab4() {
    const [visitorsAM, setVisitorsAM] = useState([]);
    const [visitorsAMVisible, setVisitorsAMVisible] = useState(false)

    const [dishes, setDishes] = useState([]);
    const [dishesVisible, setDishesVisible] = useState(false)

    const [tables, setTables] = useState([]);
    const [tablesVisible, setTablesVisible] = useState(false)

    useEffect(() => {
        // Запрос 1
        fetch('/request_4_1')
            .then(response => response.json())
            .then(data1 => setVisitorsAM(data1))
            .catch(error => console.error('Ошибка:', error));

        fetch('/request_4_6')
            .then(response => response.json())
            .then(data2 => setDishes(data2))
            .catch(error => console.error('Ошибка:', error));

        fetch('/request_4_11')
            .then(response => response.json())
            .then(data3 => setTables(data3))
            .catch(error => console.error('Ошибка:', error));
        }, []);


    const toggleVisitorsAM = () => {
        setVisitorsAMVisible(!visitorsAMVisible);
    };

    const toggleDishes = () => {
        setDishesVisible(!dishesVisible);
    };

    const toggleTables = () => {
        setTablesVisible(!tablesVisible);
    };

    return (
        <div className="myBody">
            <h1>Запросы 4 лабораторной работы:</h1>
            <Link to="/">
                <button className="myButtonToMain">На главную</button>
            </Link>
            <h2>Вывести данные посетителей, чьи имена начинаются на А или М, возраст находится в пределах от 18  до 25 лет и их номера телефонов. Расположить в порядке возрастания по возрасту.</h2>
            <button onClick={toggleVisitorsAM} className="myButton">{visitorsAMVisible ? 'Свернуть' : 'Развернуть'}</button>
            {visitorsAMVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Возраст</th>
                        <th>Номер телефона</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visitorsAM.map(visitor => (
                        <tr>
                            <td>{visitor.name}</td>
                            <td>{visitor.age}</td>
                            <td>{visitor.phone_number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Вывести названия блюд, их стоимость и вес. Стоимость должна быть ниже средней, а вес больше 300г. Вывести по увеличению стоимости блюда.</h2>
            <button onClick={toggleDishes} className="myButton">{dishesVisible ? 'Свернуть' : 'Развернуть'}</button>
            {dishesVisible && (
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Стоимость</th>
                        <th>Вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dishes.map(dish => (
                        <tr>
                            <td>{dish.dish_name}</td>
                            <td>{dish.price}</td>
                            <td>{dish.weight}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <h2>Вывести номера столов со статусом «свободен» и их вместимость. Расположить по убыванию количества мест.</h2>
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

export default Lab4;
