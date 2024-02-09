const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}


/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
//  const vehicles_id = req.params.inv_id
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
//  const vehicle = await invModel.getVehicleId(vehicles_id)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

// Display single car view
invCont.displayCarById = async function (req, res, next) {
  const invId = req.params.invId;
  const data = await invModel.getCarById(invId);
  const car = await utilities.getVehicle(data);
  let name = data[0].inv_make + ' ' + data[0].inv_model;
  let nav = await utilities.getNav();
  res.render("./inventory/vehicle", {title: name, nav, car,});
};

// Add Classification and Vehicle view
invCont.displayAdd = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null
  });
};

invCont.displayAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  });
};

invCont.displayAddVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  const drop = await utilities.dropdown();
  res.render("./inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    drop,
    errors: null
  });
};

/* ****************************************
*  Process Add Classification
* *************************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${classification_name} has been added.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

/* ****************************************
*  Process Add Vehicle
* *************************************** */
invCont.addVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color } = req.body
  const regResult = await invModel.addVehicle(
    classification_id,
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year,
    inv_miles, 
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${inv_make} ${inv_model} has been added.`
    )
    res.status(201).render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the addition failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
    })
  }
}


module.exports = invCont