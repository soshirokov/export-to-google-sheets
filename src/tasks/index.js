const { getFirstDayOfCurrentMonth, getFirstDayOfNextMonth, stringIsDate } = require('../utils');
const getSheet = require('../google-api');
const dayjs = require('dayjs');
const { checkIsQueryExist } = require('../pg');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const getTaskToFill = (rows) => {
    const firstDate = getFirstDayOfCurrentMonth();
    const endDate = getFirstDayOfNextMonth();

    const tasks = rows.reduce((result, row) => {
        if (checkIsQueryExist(row.project, row.metric)) {
            result.push({
                row: row,
                header: firstDate.format('DD.MM.YYYY'),
                dateStart: firstDate.format('YYYY-MM-DD'),
                dateEnd: endDate.format('YYYY-MM-DD'),
                project: row.project,
                metric: row.metric
            });
        }
        analyseEmptyMetric(row, result);
        return result;
    }, [])

    return tasks;
}

const analyseEmptyMetric = (row, tasks) => {
    row._sheet.headerValues.reduce((result, header) => {
        if (stringIsDate(header) && !row[header] && dayjs(header, 'DD.MM.YYYY') < dayjs().subtract(1, "M")) {
            result.push({
                row: row,
                header: header,
                dateStart: dayjs(header, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                dateEnd: dayjs(header, 'DD.MM.YYYY').add(1, 'M').format('YYYY-MM-DD'),
                project: row.project,
                metric: row.metric
            });
        }
        return result;
    }, tasks);
}


module.exports = {
    getTaskToFill
}
