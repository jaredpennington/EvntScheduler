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
    return datesArr;
  }

module.exports = pushDateWindows;