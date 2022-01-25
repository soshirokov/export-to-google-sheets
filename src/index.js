const { saveValue, sheetParser } = require('./google-api/index');
const getMetric = require('./pg/index');
const { getTaskToFill } = require('./tasks/index');
const { getSingleValue } = require('./utils');

const main = async () => {
    const rows = await sheetParser();

    const tasks = getTaskToFill(rows);

    tasks.forEach((task, i) => {
        setTimeout(() => taskJob(task), i * 1000)
    });
}

const taskJob = (task) => {
    getMetric(task.project, task.metric, task.dateStart, task.dateEnd).then(result => {
        saveValue(task.row, task.header, getSingleValue(result.rows[0]));
    }).catch(err => console.log(err));
}

main();



