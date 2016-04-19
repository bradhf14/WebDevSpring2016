/**
 * Created by Bradley on 4/16/16.
 */
module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();

    var userService  = require("./services/user.server.services.js") (app, userModel);
    var formService = require("./services/form.server.services.js")(app, formModel);
    var fieldService = require("./services/field.server.services.js")(app, formModel);
};