const getFirstDayCurrentMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

const getFirstDayNextMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

const convertDateToRus = (date) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    return date.toLocaleString("ru", options);
}

const convertDateToUs = (date) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
}

const getSingleValue = (obj) => obj[Object.keys(obj)[0]];

const stringIsDate = (str) => !!Date.parse(str);

module.exports = {
    getFirstDayCurrentMonth,
    getFirstDayNextMonth,
    convertDateToRus,
    convertDateToUs,
    getSingleValue,
    stringIsDate
}