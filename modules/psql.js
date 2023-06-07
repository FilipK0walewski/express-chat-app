const { Pool } = require('pg');

const pool = new Pool({
    user: 'marcin',
    host: 'localhost',
    database: 'chat',
    password: 'Calendar2023',
    port: 5432
});

module.exports = pool