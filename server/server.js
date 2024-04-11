const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cafe-bar',
  password: '2223', // ваш пароль
  port: 5432,
});

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для корневого URL
app.get('/', (req, res) => {
  res.send('Сервер работает успешно'); // Пример ответа
});


// Обработчик для получения списка посетителей
app.get('/visitors', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM visitor');
    const visitors = result.rows;
    res.json(visitors);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/employees', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM employee');
    const employees = result.rows;
    res.json(employees);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/posts', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM post');
    const posts = result.rows;
    res.json(posts);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/dishes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM dish');
    const dishes = result.rows;
    res.json(dishes);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/orders', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "order"');
    const orders = result.rows;
    res.json(orders);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/tables', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "table"');
    const tables = result.rows;
    res.json(tables);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/request_4_1', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(`
        SELECT visitor.name, visitor.phone_number, visitor.age
        FROM visitor
        WHERE (visitor.age BETWEEN 18 AND 25) AND (visitor.name LIKE 'А%' OR visitor.name LIKE 'М%')
        ORDER BY age
      `);
      const visitors = result.rows;
      res.json(visitors);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });


app.get('/request_4_6', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
        SELECT dish.name AS dish_name,
               dish.price,
                dish.weight
        FROM dish 
        WHERE weight > 300 AND price < (SELECT AVG(price) FROM dish)
        ORDER BY price
      `);
    const employees = result.rows;
    res.json(employees);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/request_4_11', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
        SELECT "table".table_number, 
               "table".capacity, 
               "table".status
        FROM "table"
        WHERE "table".status = 'free'
        ORDER BY capacity DESC
      `);
    const tables = result.rows;
    res.json(tables);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/request_5_2', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
        SELECT AVG(price) AS avg_price,
                COUNT(price) AS count_price
        FROM dish
        WHERE weight > 200
      `);
    const count_dishes = result.rows;
    res.json(count_dishes);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/request_5_3', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
        SELECT "order".payment_method,
            COUNT(order_number) AS count_order,
            SUM("sum")
        FROM "order"
        GROUP BY payment_method
        ORDER BY count_order
      `);
    const sum_orders = result.rows;
    res.json(sum_orders);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/request_5_7', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
        SELECT MIN(age) AS min_age,
                MAX(age) AS max_age,
                AVG(age) AS avg_age
        FROM visitor
      `);
    const ages = result.rows;
    res.json(ages);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/custom-query', async (req, res) => {
  const { query } = req.query; // Получаем SQL-запрос из параметра запроса
  try {
    const client = await pool.connect();
    const result = await client.query(query); // Выполняем полученный SQL-запрос
    const data = result.rows; // Получаем данные из результата запроса
    res.json(data); // Отправляем данные в формате JSON
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
