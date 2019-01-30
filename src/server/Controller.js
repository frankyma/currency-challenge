module.exports = {
  calculate(req, res) {
    /* bananas are only purchased on weekdays 
    Month:
    Day   1-7 = .05
    Day  8-14 = .10
    Day 15-21 = .15
    Day 22-28 = .20
    Day 29-31 = .25
    */
    let num = parseInt(req.body.numberOfDays)
    let d = new Date(req.body.startDate);

    //calculate endDate as "num" days from the startDate
    let endDate = new Date(req.body.startDate);
    endDate.setDate(endDate.getDate() + num)

    //create an array of all weekdates in specified time period
    let dateArr = [];
    for (let date = d; date < endDate; date.setUTCDate(date.getUTCDate() + 1)) {
      if (date.getDay() != 5 && date.getDay() != 6) {
        dateArr.push(new Date(date));
      }
    }

    //create an array representing only days of the month
    let numbers = [];
    dateArr.forEach(el => numbers.push(el.getUTCDate()));

    //calculate the total cost
    let totalCost = numbers.reduce((acc, cv) => {
      if (cv > 0 && cv < 8) {
        acc += .05
      } else if (cv >= 8 && cv < 15) {
        acc += .10
      } else if (cv >= 15 && cv < 22) {
        acc += .15
      } else if (cv >= 22 && cv < 29) {
        acc += .20
      } else {
        acc += .25
      }
      return acc;
    }, 0)

    dateArr = [];

    res.header(200).send({
      msg: 'Calculation success',
      totalCost: totalCost
    })
  }
}