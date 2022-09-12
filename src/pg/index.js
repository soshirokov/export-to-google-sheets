const { Pool } = require('pg');
const { getQuery, checkIsQueryExist } = require('./queries');
const dbCreds = require('../../configs/db_credits.json');

const getMetric = async (project, metric, dateStart, dateEnd) => {
    const connectionCreds = dbCreds[project];

    if (!connectionCreds || !checkIsQueryExist(project, metric)) {
        return { result: { rows: [{ empty: '' }] } }
    };

    const pool = new Pool(connectionCreds);

    const query = getQuery(project, metric, dateStart, dateEnd);

    const result = await pool.query(query);

    return result;
}

module.exports = { getMetric, checkIsQueryExist   };
