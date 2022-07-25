// To simulate .NET's .AddDays() method
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const pushDateWindows = (dates) => {
    let datesArr = [];
    for(let i = 0; i < dates.length; i++) {
        let dateWindows = [];
        if (i % 2 === 0) continue;
        let start = dates[i-1].value; // 0, 2, 4...
        let end = dates[i].value; // 1, 3, 5...
        // result: (0,1), (2,3), (4,5), etc.
        dateWindows.push(start, end); //[]
        datesArr.push(dateWindows) // [[],[],...]
    }
    console.log(datesArr)
    return datesArr;
  }

module.exports = pushDateWindows;