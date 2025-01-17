const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-noem:3306',
    user: 'mysql',
    password: 'Gpw9JJCmxuDQXa61cqT45vzvFO92P6hnhbyENlhxYLM=',
    database: 'fosa_database'
});

pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        pool.end();
        pool = mysql.createPool({
            connectionLimit: 10,
            host: 'mysql-noem:3306',
            user: 'mysql',
            password: 'Gpw9JJCmxuDQXa61cqT45vzvFO92P6hnhbyENlhxYLM=',
            database: 'fosa_database'
        });
    } else {
        throw err;
    }
});

pool.query('SELECT * FROM Users', (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }
    console.log('Query results:', results);

    pool.end((err) => {
        if (err) {
            console.error('Error closing database connections:', err);
        } else {
            console.log('Database connections closed successfully.');
        }
    });
});
