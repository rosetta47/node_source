import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123',
    database:'test',
    connectionLimit:5 //동시 접수 인원수 : 최대 5명임
});

export default pool;