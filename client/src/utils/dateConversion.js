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


const pushDateWindows = (dates) => {
    let dateWindows = [];
    for(let i = 0; i < dates.length; i++) {
        if (i % 2 === 0) continue;
        let start = dates[i-1].value; // 0, 2, 4...
        let end = dates[i].value; // 1, 3, 5...
        // result: (0,1), (2,3), (4,5), etc.
        dateWindows.push(getAllDates(start, end));
    }
    console.log(dateWindows);
    return dateWindows;
  }

module.exports = {getAllDates, pushDateWindows};