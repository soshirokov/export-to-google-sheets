const queryBase = require("../../configs/queries.js");

const getQuery = (project, metric, dateStart, dateEnd) => {
    return queryBase(dateStart, dateEnd)[project][metric];
}

const checkQuery = (project, metric) => {
    return project in queryBase() && metric in queryBase()[project]
}

module.exports = { getQuery, checkQuery };