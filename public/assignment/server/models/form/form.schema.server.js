
// create a mongoose variable so we can create a FormSchema
// figure out if we can call in mongoose

module.exports = function (mongoose) {

    //we need the field scheme to create the form schema since it
    //stored the embedded instances of fields

    var FormSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        //only has description for userId, no default
        userId:{type: String},
        title: {type: String, default: "New Form"},
        //TODO figure out how to pass in field schema
        fields: [FormSchema],    //CHANGE THIS
        created: {type: Date, default: Date.now},
        update:  {type: Date, default: Date.now}
    }, {collection: "form"});

    //return the Schema after we create it
    return FormSchema;
};

