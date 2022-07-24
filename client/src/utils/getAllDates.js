// To simulate .NET's .AddDays() method
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const getAllDates = (startDate, stopDate) => {
    // where we will push the results
    let result = [];
    // get every date between first and last date. This
    let currentDate = new Date(startDate);
    while(currentDate <= new Date(stopDate)) {
        result.push(currentDate);
        currentDate = currentDate.addDays(1);
    }
    // will return an array that will be pushed into the date_windows array
    return result;
}

module.exports = getAllDates;