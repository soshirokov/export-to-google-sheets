const { getQueryBase } = require("../../configs/queries.js");

const getQuery = (project, metric, dateStart, dateEnd) => {
    const queryWithDate = getQueryBase(dateStart, dateEnd);
    return queryWithDate[project][metric];
}

const checkIsQueryExist = (project, metric) => {
    return project in getQueryBase() && metric in getQueryBase()[project]
}

module.exports = { getQuery, checkIsQueryExist };
