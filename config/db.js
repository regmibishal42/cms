import {Sequelize} from 'sequelize';

const db = new Sequelize({
    database:'cms',
    username:'postgres',
    password:'admin',
    port:5432,
    host:'localhost',
    dialect:'postgres',
    logging:false,
});

export default db;