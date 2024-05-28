import pkg from 'pg';
const { Pool } = pkg;

const context = new Pool({
        user: '',
        password: '',
        host: 'localhost',
        port: 5432,
        database: 'sports',
});

export default {
        query: (text, params) => context.query(text, params),
};