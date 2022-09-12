const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../configs/client_secret.json");
const sheetId = require("../../configs/sheet.json").id;

const googleSheet = async function (id) {
    const doc = new GoogleSpreadsheet(sheetId);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    return sheet = doc.sheetsByIndex[id];
}

const saveValue = async function (row, header, value) {
    row[header] = value;
    row.save();
}

const parseSheet = async () => {
    const sheet = await googleSheet(0);
    const rows = await sheet.getRows();
    return rows;
}

module.exports = {
    saveValue,
    parseSheet
};
