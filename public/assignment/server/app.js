/**
 * Created by Bradley on 4/16/16.
 */
module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user/user.model.js")(db, mongoose);
    var formModel = require("./models/form/form.model.js")(db, mongoose);

    var userService  = require("./services/user.server.services.js") (app, userModel);
    var formService = require("./services/form.server.services.js")(app, formModel);
    var fieldService = require("./services/field.server.services.js")(app, formModel);
};