function parseDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return [
        (day>9 ? '' : '0') + day,
        (month>9 ? '' : '0') + month,
        date.getFullYear()
    ].join('.');
}

function parseTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

module.exports = {
    parseDate,
    parseTime
}
