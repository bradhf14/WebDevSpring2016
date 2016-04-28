/**
 * Created by Bradley on 4/27/16.
 */

module.exports = function (mongoose) {

    // Using the sample the default values


    var UserSchemaP = mongoose.Schema({
        username: {type: String, default: ""},
        password: {type: String, default: ""},
        name: {type: String, default: ""},
        city: {type: String, default: ""},
        verified: {type: Boolean, default: false},
        roles: {type:[String], default: ['Fan']},
        email: {type: String, default: ""},
        cities: [{
            city:{type: String, default: ""},
            View:{type: Boolean, default: false},
            Season:{type: Number, default: 0},
            Episode:{type: Number, default: 0}
        }]
        // "the collection should be called user, not users, specifiy the collection so it doesnt default"
    }, {collection: "userP"});

    //return the Schema after we create it
    return UserSchemaP;

    //eventually, will have a model that looks like var User = mongoose.model("user", UserSchema);
};