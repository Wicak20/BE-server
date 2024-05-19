const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    host: process.env.DBS_HOST,
    user: process.env.DBS_USER,
    password: process.env.DBS_PASSWORD,
    database: process.env.DBS_NAME,
    port: process.env.DBS_PORT,
});

module.exports = pool