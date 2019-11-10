/*  
  request path controllers 
*/

// dependencies
const Request = require('../models/request.model');
const User = require('../models/user.model');
const { updateSubmitValidationHandler } = require('../helpers/validation');

// request container
const requests = {};
// @TODO get available dates
requests.getAvailability = async (req, res) => {
  try {
    // array of available dates
    // get all employees and select availability
    const userArr = User.find().where({ employee: true }).select('availability').where({ availability: { date: { $gt: Date() } } })


    //     userArr.forEach(emp => {
    //       emp.availability.forEach(({ date }) => !arr.includes(date) && arr.push()
    // })
    //     let today = moment();
    //     // subtract one so it includes today in the while loop
    //     let day = today.clone().subtract(1, 'days');
    //     // available dates and will be selectable
    //     const customDatesStyles = [];
    //     // dates that are not available
    //     const disabledDates = [];
    //     while (day.add(1, 'day').isSame(today, 'month')) {
    //       // check if dates Object has the key of curent day being checked
    //       if (dates[day.format('L')]) {
    //         customDatesStyles.push({
    //           date: day.clone(),
    //           style: {
    //             backgroundColor: colors.main,
    //           },
    //           textStyle: { color: colors.white, fontWeight: 'bold' },
    //         });
    //       } else {
    //         //   disable if it is not in the passed available object
    //         disabledDates.push(day.clone());
    //       }
    //     }
    // set state with new values to pass to the calendar
    // this.setState({customDatesStyles, disabledDates});

  } catch (error) {

  }
}
// update request
requests.updateRequest = async function (req, res) {
  try {
    // find the request
    const instance = await Request.findById(req.params.id);
    // set fields to updated values
    instance.set(req.fields);
    // validate all of the fiedls if there is any errors a general error will be thrown
    updateSubmitValidationHandler(instance);

    // save the new instance
    await instance.save();
    // return updated instance
    res.status(200).json({ data: instance });
  } catch (error) {
    // return an error if any errors occured during update
    res.status(400).json({ message: error.message });
  }
};
// submit reques
requests.submitRequest = async function (req, res) {
  try {
    // create new instance of the request
    const instance = new Request({ ...req.fields, requestor: this.user });
    // validate all of the fiedls if there is any errors a general error will be thrown
    updateSubmitValidationHandler(instance);
    // save the new instance
    await instance.save();
    // add the request to the user instanace
    this.user.requests.push(instance);
    // save the user instance with the new request
    await this.user.save();
    // return the newly created request instance
    res.status(201).json({ data: instance });
  } catch (error) {
    // return any errors
    res.status(400).json({ message: error.message });
  }
};
requests.removeRequest = async function (req, res) {
  try {
  } catch (error) {
    // return any errors
    res.status(400).json({ message: error.message });
  }
};

// export module
module.exports = requests;
