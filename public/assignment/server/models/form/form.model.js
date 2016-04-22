/**
 * Created by Bradley on 4/12/16.
 */

//data for now stored as mock data
var forms = require("./form.mock.json");
var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    //load user schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createForm: createForm,                     //C  TESTED
        createField: createField,                   //C
        findAllForms: findAllForms,                 //R
        findFormById: findFormById,                 //R
        findFieldsByFormId: findFieldsByFormId,     //R
        findFormByTitle: findFormByTitle,           //R
        findAllFormsByUserId: FindAllFormsByUserId, //R  TESTED
        findFieldInFormById: findFieldInFormById,   //R
        updateForm: updateForm,                     //U
        updateField: updateField,                   //U
        deleteForm: deleteForm,                     //D
        deleteField: deleteField                    //D
        //any other necessary ones to implement here, look at CRUD requirements
    };

    return api;

    //Testing form database


    //accept instance, add it to corresponding collection, and return the collection
    function createForm(newForm){

        var deferred  = q.defer();

        FormModel.create(newForm, function(err,doc){

            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    //accept formId and new field object, creates a field in that form object if form object exists, returns fields or null
    function createField(formId, passedInField){
        var newField = {};
        var passedField = passedInField.type;

        for(var f in forms) {
            if( forms[f]._id == formId) {
                newField._id = uuid.v1();

                if(passedField == "Single Line Text Field"){
                    newField.label = "New Text Field";
                    newField.type = "TEXT";
                    newField.placeholder = "New Field";
                }else if (passedField == "Multi Line Text Field"){
                    newField.label = "New Text Field";
                    newField.type = "TEXTAREA";
                    newField.placeholder = "New Field";
                }else if (passedField == "Date Field"){
                    newField.label = "New Date Field";
                    newField.type = "DATE";
                }else if (passedField == "Dropdown Field"){
                    newField.label = "New Dropdown";
                    newField.type = "OPTIONS";
                    newField.options = [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }else if (passedField == "Checkbox Field") {
                    newField.label = "New Checkboxes";
                    newField.type = "CHECKBOXES";
                    newField.options = [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]

                }else if (passedField == "Radio Button Field"){
                    newField.label = "New Radio Buttons";
                    newField.type = "RADIOS";
                    newField.options = [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }

                forms[f].fields.push(newField);
                return forms[f].fields;
            }
        }
        return null;
    }


    //takes in no argument, and returns the collection
    function findAllForms() {

        var deferred = q.defer();

        FormModel.find(
            function (err, forms) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });

        return deferred.promise;

    }

    //takes in ID, finds instance, return the instance found, or null otherwise
    function findFormById(id){

        var deferred = q.defer();

        //find user by ID

        FormModel.find({
            _id: {$in: id}
        }, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function findFieldsByFormId(id){

        fields = [];
        for(var f in forms) {
            if( forms[f]._id == id) {
                for (var fi in forms[f].fields)
                    fields.push(forms[f].fields[fi]);
            }
        }
        return fields;
    }

    function findFormByTitle(title) {

        var deferred = q.defer();

        //find user by ID

        FormModel.find({
            title: {$in: title}
        }, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;

    }


    function FindAllFormsByUserId(userId){

        var deferred = q.defer();

        FormModel.find({
            userId: {$in: userId}
        }, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {;
                deferred.resolve(forms);
            }
        });

        return deferred.promise;

    }

    //finds the object with id, updates the found instance, return all forms
    function updateForm(formId, updatedForm) {

        var deferred = q.defer();

        FormModel.update({_id: formId},{$set:{
                title: updatedForm.title,
                userId: updatedForm.userId,
                fields: updatedForm.fields
            }
            },
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(findFormById(formId));
                }
            });

        return deferred.promise;
    }

    //finds the object with id, updates the found instance, return the instance, otherwise null?
    //TODO SOME OF the fields variables might not exists, be blank.  how to handle this???
    function updateField(formId, fieldId, field) {

        for(var f in forms) {
            if (forms[f]._id == formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id==fieldId){
                        forms[f].fields[i]._id = field._id;
                        forms[f].fields[i].label = field.label;
                        forms[f].fields[i].type = field.type;
                        forms[f].fields[i].placeholder = field.placeholder;
                        forms[f].fields[i].options = field.options;
                        return forms[f].fields[i];
                    }
                }

            }
        }
        return null;
    }

    //accepts form ID and field ID, returns field with that ID in given form, otherwise null
    function findFieldInFormById(formId, fieldId){

        for(var f in forms) {
            if (forms[f]._id == formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id==fieldId){
                        return forms[f].fields[i];
                    }
                }

            }
        }
        return null;
    }

    //should accept an ID as an argument, remove instance of object with that ID,
    //return updated list?
    //TODO figure out if this return is meh
    function deleteForm(formId){
        var deferred = q.defer();

        FormModel.remove({_id: formId},
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function deleteField(formId, fieldId){

        for(var f in forms) {
            if (forms[f]._id == formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id==fieldId){
                        forms[f].fields.splice(i,1);
                    }
                }
            }
        }
        return forms;
    }


}
