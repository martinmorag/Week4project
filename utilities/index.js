const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul class='list'>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the view for each car
* ************************************ */
Util.getVehicle = async function(data) {
  let singleV
  if (data.length > 0) {
    singleV = '<section class="vehicle">'
    data.forEach(vehicle => {
      singleV += '<div class="main-info">'
        singleV += '<h2 class="vehicleTitle">' + vehicle.inv_make + ' ' + vehicle.inv_model +'</h2>'
        singleV += '<img src="'+ vehicle.inv_image + '" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model +' on CSE Motors">'
      singleV += '</div>'
      singleV += '<div class="details">'
        singleV += '<p class="mechanic">Mechanic Special Details</p>'
        singleV += '<p class="price">' + 'Price: $  ' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
        singleV += '<p class="description">' + 'Description: ' + vehicle.inv_description + '</p>'
        singleV += '<p class="color">' + 'Color: ' + vehicle.inv_color + '</p>'
        singleV += '<p class="miles">' + 'Miles: ' + vehicle.inv_miles.toLocaleString() + '</p>'
      singleV += '</div>'
      singleV += '</section>'
      
    })
  }
  return singleV
}

/* **************************************
* Build the dropdown for adding vehicle
* ************************************ */
Util.dropdown = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let drop = '<select name="classification_id" id="classification_id">';
  drop += '<option value="" selected disabled hidden>Select Classification</option>';
  data.rows.forEach((row) => {
    drop += '<option value="' + row.classification_id + '">' + row.classification_name + '</option>';
  });
  drop += '</select>';
  
  return drop;
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util