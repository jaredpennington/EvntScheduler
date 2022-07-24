const dateFormat = require('/dateFormat');

export const getAllDates = (startDate, stopDate) => {
    // where we will push the results
    let result = [];
    // get every date between first and last date. This
    let currentDate = startDate;
    while(currentDate <= stopDate) {
        let date = dateFormat(new Date(currentDate));
        result.push(date);
        currentDate = currentDate.addDays(1);
    }
    return result;
}