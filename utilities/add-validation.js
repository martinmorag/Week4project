const utilities = require(".")
const invModel = require("../models/inventory-model")
const { body, validationResult } = require("express-validator")
const validate = {}

// Validation for adding classification
validate.classificationRules = () => {
    return [
        // classification_name is required and must not contain space or special character
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Classification name is required.")
            .matches(/^[^\W_]+$/)
            .withMessage("Classification name cannot contain spaces or special characters."),
    ];
};

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name
      })
      return
    }
    next();
};


// Validation for adding vehicle
validate.vehicleRules = () => {
    return [
        // classification_name is required and must not contain space or special character
        body("classification_id")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Classification name is required."),

        body("inv_make")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Make is required."),

        body("inv_model")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Model is required."),

        body("inv_description")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Description is required."),

        body("inv_price")
            .isNumeric()
            .withMessage("Price must be a number."),

        body("inv_year")
            .isNumeric()
            .withMessage("Year must be a number."),

        body("inv_miles")
            .isNumeric()
            .withMessage("Miles must be a number."),

        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Color is required.")
    ];
    
};

/* ******************************
 * Check data and return errors or continue
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const drop = await utilities.dropdown()
        res.render("./inventory/add-inventory", {
        errors,
        drop,
        title: "Add Vehicle",
        nav,
        classification_id, 
        inv_make, 
        inv_model, 
        inv_description, 
        inv_price, 
        inv_year, 
        inv_miles, 
        inv_color
      })
      return
    }
    next();
};


module.exports = validate;