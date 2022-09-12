const { saveValue, parseSheet } = require('./google-api/index');
const {getMetric} = require('./pg/index');
const { getTaskToFill } = require('./tasks/index');
const { getFirstValue } = require('./utils');

const fillMetrics = async () => {
    const rows = await parseSheet();

    const tasks = getTaskToFill(rows);

    tasks.forEach((task, i) => {
        setTimeout(() => processTask(task), i * 1000)
    });
}

const processTask = (task) => {
    getMetric(task.project, task.metric, task.dateStart, task.dateEnd).then(result => {
        saveValue(task.row, task.header, getFirstValue(result.rows[0]));
    }).catch(err => console.log(err));
}

fillMetrics();
