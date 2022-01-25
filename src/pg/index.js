const { Pool } = require('pg');
const { getQuery, checkQuery } = require('./queries');
const dbCreds = require('../../configs/db_credits.json');

const getMetric = async (project, metric, dateStart, dateEnd) => {
    if (!dbCreds[project] || !checkQuery(project, metric)) return { result: { rows: [{ empty: '' }] } };

    const pool = new Pool(dbCreds[project]);

    const toQuery = getQuery(project, metric, dateStart, dateEnd);

    const result = await pool.query(toQuery);

    return result;
}

module.exports = getMetric;


