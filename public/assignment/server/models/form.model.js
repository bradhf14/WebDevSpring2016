/**
 * Created by Bradley on 4/12/16.
 */

var mock = require("./form.mock.json");

module.exports = function() {

    var api = {
        findFormByTitle: findFormByTitle
        //any other necessary ones to implement here, look at CRUD requirements
    };

    return api;

    function findFormByTitle(title) {

        for(var t in mock) {
            if( mock[t].title === title.title) {
                return mock[u];
            }
        }
        return null;

    }


}
