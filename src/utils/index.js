const dayjs = require('dayjs');

const getFirstDayOfCurrentMonth = () => {
    return dayjs().startOf('month');
}

const getFirstDayOfNextMonth = () => {
    return dayjs().add(1, 'M').startOf('month');
}

const getFirstValue = (obj) => obj[Object.keys(obj)[0]];

const stringIsDate = (str) => !!Date.parse(str);

module.exports = {
    getFirstDayOfCurrentMonth,
    getFirstDayOfNextMonth,
    getFirstValue,
    stringIsDate
}
