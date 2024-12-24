const express = require('express')
const tourController = require('./../controllers/tourController')

const router = express.Router();

//param middleware
//Here this is being used to validate tour Id passed in the request uri
//so that it gets validated before even reaching out to the handler
router.param('id', tourController.checkId)

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour); // Chaining middleware

router
    .route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour)


module.exports = router;