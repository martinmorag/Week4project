const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/add-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display single car view
router.get("/detail/:invId", invController.displayCarById);

// Route to add classification and vehicle
router.get("/", utilities.handleErrors(invController.displayAdd));

router.get("/add-classification", utilities.handleErrors(invController.displayAddClassification));
router.post(
    "/add-classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

router.get("/add-vehicle", utilities.handleErrors(invController.displayAddVehicle));
router.post(
    "/add-vehicle",
    regValidate.vehicleRules(),
    regValidate.checkVehicleData,
    utilities.handleErrors(invController.addVehicle)
)


module.exports = router;