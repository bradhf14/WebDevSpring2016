//Create a user schema so we can use Mongoose to store and retrieved data
//from a MongoDB instance, instead of using mock data from the server instance

// create a mongoose variable so we can create a UserSchema
// Not sure if we need this here as well, since this is created in the server.js
// of the entire website, look into this

module.exports = function (mongoose) {

    // Using the sample the default values

    var UserSchema = mongoose.Schema({
        username: {type: String, default: "alice"},
        password: {type: String, default: "p@ssw0rd"},
        firstName: {type: String, default: "Alice"},
        lastName: {type: String, default: "Wonderland"},
        emails: {type: [String], default: ["alice@Wonderland.com", "alice@gmail.com"]},
        phones: {type: [String], default: ["123-234-4321", "234-432-2344"]}
        // "the collection should be called user, not users, specifiy the collection so it doesnt default"
    }, {collection: "user"});

    //return the Schema after we create it
    return UserSchema;

    //eventually, will have a model that looks like var User = mongoose.model("user", UserSchema);
};