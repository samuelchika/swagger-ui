import * as dotenv from 'dotenv';
import mysql2 from 'mysql2';
import fs from 'fs';
//import { getDirPath } from '../utils/GlobalManipulation.js';
dotenv.config() // use dotenv in our project
// import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getDirPath = (moduleUrl) => {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.dirname(__dirname);


const pool = mysql2.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    charset: 'utf8mb4',
    connectionLimit: 10,
    ssl  : {
        ca : fs.readFileSync(getDirPath(import.meta.url) + '/isowo_db-ca-certificate.crt')
    }
});

console.log(getDirPath(import.meta.url))
pool.on('connection', function (connection) {
    console.log("Connection is made")
});
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

const db = pool.promise();
export default db;