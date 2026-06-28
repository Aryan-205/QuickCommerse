import knex from 'knex';
import config from '../../knexfile.js';

// Use the development configuration
const db = knex(config.development);

export default db;