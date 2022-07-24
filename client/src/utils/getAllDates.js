export const getAllDates = (startDate, stopDate) => {
    // where we will push the results
    let result = [];
    // get every date between first and last date. This
    let currentDate = startDate;
    while(currentDate <= stopDate) {
        result.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return result;
}