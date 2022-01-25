const { getFirstDayCurrentMonth, getFirstDayNextMonth, convertDateToRus, convertDateToUs, stringIsDate } = require('../utils');
const getSheet = require('../google-api/index');
const moment = require('moment');
const { checkQuery } = require('../pg/queries');


const getTaskToFill = (rows) => {
    const firstDate = getFirstDayCurrentMonth();
    const endDate = getFirstDayNextMonth();
    const tasks = [];

    rows.forEach(row => {
        if (!checkQuery(row.project, row.metric)) return

        tasks.push({
            row: row,
            header: convertDateToRus(firstDate),
            dateStart: convertDateToUs(firstDate),
            dateEnd: convertDateToUs(endDate),
            project: row.project,
            metric: row.metric
        });

        analyseEmptyMetric(row, tasks);
    });

    return tasks;
}

const analyseEmptyMetric = (row, tasks) => {
    row._sheet.headerValues.forEach(header => {
        if (stringIsDate(header) && !row[header] && moment(header, 'DD.MM.YYYY') < moment().subtract(1, "M")) {
            tasks.push({
                row: row,
                header: header,
                dateStart: moment(header, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                dateEnd: moment(header, 'DD.MM.YYYY').add(1, 'M').format('YYYY-MM-DD'),
                project: row.project,
                metric: row.metric
            });
        }
    })
}


module.exports = {
    getTaskToFill
}
