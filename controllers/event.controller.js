/* 
    event path controller
*/
// dependencies
const Event = require('../models/event.model')
const { updateSubmitValidationHandler } = require('../helpers/validation')
// container
const events = {}

// add summary repot
events.addSummaryReport = async (req, res) => {
    try {
        // get instance of event
        const instance = await Event.findById(req.params.id)
        // update event with event summary
        instance.summary = req.fields
        // validate provided info and throw general error if there is any invalid input
        updateSubmitValidationHandler(instance)

    } catch (error) {

    }
}

// export module
module.exports = events