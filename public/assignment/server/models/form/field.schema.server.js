
var mongoose = require("mongoose");

module.exports = function () {

    var FieldSchema = mongoose.Schema({
        label: {type: String, default: "First Name"},
        //TODO error if i don't create _id paramter here, not sure if it should be needed, not needed for other schemas
        _id: {type: String},
        formId: {type: String},
        type: {type: String,
            enum: ["TEXT",
                "TEXTAREA",
                "EMAIL",
                "PASSWORD",
                "OPTIONS",
                "DATE",
                "RADIOS",
                "CHECKBOXES"],
            default: "TEXT"},
        placeholder: { type: String, default: "Alice"},
        options:
        {type: [{label:String, value: String}],
            default: [{label:'Female', value: 'MALE'},
                {label:'Female', value: 'FEMALE'}]
        },
    }, {collection: "field"});

    //return the Schema after we create it
    return FieldSchema;
};
