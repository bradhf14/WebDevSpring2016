/**
 * Created by Bradley on 4/12/16.
 */

//data for now stored as mock data
var forms = require("./form.mock.json");
var uuid = require('node-uuid');
var q = require("q");


    //I made the decision to only implement a form model,
    //and not a field model, because I didn’t fully understand
    //the purpose of the field model.
    //
    //As of now, the only fields we are dealing with are fields that are
    //stored inside of a form object, so therefore I don’t see why we
    //would create a field model.
    //
    //Users have associated forms which are connected via user  Id values.
    //But it was explicitly stated in the directions that for a form object,
    //the fields are stored inside of that object in a array of embedded field instance objects.
    //Thus, field objects are part of a form object, and thus should be in this form model.
    //
    //I also created a collection of field objects, and inside of the field object
    //I added a FormID field.  Thus, I could reprogram this so that rather than
    //storing the field objects directly inside of the Form object, I could just
    //have the field objects be loaded if they have the same FormID as the form we
    //are currently interacting with.  Most of my functions create a fields object,
    //then inserts that field object into the Form object as well.  If we delete
    //or update the field, I update it in both the fields collection in the database,
    //as well as in the fields object that is part of the Form object.



    module.exports = function(db, mongoose) {

        //load user schema
        var FormSchema = require("./form.schema.server.js")(mongoose);
        var FieldSchema = require("./field.schema.server.js")(mongoose);

        //create user model from schema
        var FormModel = mongoose.model('Form', FormSchema);
        var FieldModel = mongoose.model('Field', FieldSchema);

        //CRUD operations for Form object, and field object
        //Refer to comment at top of why I didnt make field model
        //Can refactor code if desired

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
            var deferred  = q.defer();

            FormModel.find({
                _id: {$in: formId}
            }, function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {

                    newField._id = uuid.v1();
                    newField.formId = formId;

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


                    FieldModel.create(newField, function(err,doc){
                        if (err){
                            deferred.reject(err);
                        } else {

                            FormModel.update({_id: formId},{$push: {
                                fields: doc,
                            }},function (err, formUpdated) {
                                if (err) {

                                } else {

                                }
                            });


                            deferred.resolve(doc);
                        }
                    });


                }
            });


            return deferred.promise;
            //return null;
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

            //find form by ID

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

            var deferred = q.defer();

            var form = findFormById(id)
                .then(function (formFound) {
                        deferred.resolve(formFound[0].fields);
                    },
                    function ( err ) {
                        deferred.reject(err);                }
                );

            return deferred.promise;

        }

        function findFormByTitle(title) {

            var deferred = q.defer();

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
        //This function is a bit long
        //It updates the field object in the fields collection
        //as well as the fields object stored inside of form object
        //
        //Refer to my notes at the top as to why I do both of these updates
        //I can remove one later on
        //
        //My believe is fields objects should not be stored in forms objects,
        //Fields objects should just connect to a form through the FormId parameter that I instantiated
        function updateField(formId, fieldId, field) {

            var deferred = q.defer();

            /// /first we remove the old field object from the form we are working with
            FormModel.update({_id: formId},
                {$pull: {fields: {_id: fieldId}}},
                function (err, form) {
                    if (!err) {
                        //We then update the field object in the field database

                        FieldModel.update({_id: fieldId},{$set:{
                                label: field.label,
                                type: field.type,
                                placeholder: field.placeholder,
                                options: field.options,
                            }
                            },
                            function (err, field) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    //we then push this updated field back into the form

                                   FieldModel.find({_id: fieldId}
                                       , function(err,fieldPush){
                                       if(!err){

                                           FormModel.update({_id: formId},{$push: {
                                               fields: fieldPush[0]
                                           }},function (err, formUpdated) {
                                               if (err) {
                                                   deferred.reject(err);
                                               }else{
                                                   deferred.resolve(field);
                                               }
                                           });
                                       }
                                   });


                                }
                            });

                    }
                });

            //update field object

            return deferred.promise;

        }

        //accepts form ID and field ID, returns field with that ID in given form, otherwise null
        //TODO don't know if I need this function? Figure that out
        function findFieldInFormById(formId, fieldId){

            var deferred = q.defer();

            FieldModel.find({_id: fieldId, formId: formId},
                function(err,field){
                    if(err){
                        deferred.reject(err);
                    }else{
                        deferred.resolve(field);
                    }

                });

            return deferred.promise;
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

        function deleteField(formId, fieldId) {

            var deferred = q.defer();

            //Remove field from form

            FormModel.update({_id: formId},
                {$pull: {fields: {_id: fieldId}}},
                function (err, form) {
                    if (!err) {
                        //Remove field from field database
                        FieldModel.remove({_id: fieldId},
                            function (err, form) {
                                if (err) {
                                } else {
                                    deferred.resolve(form);
                                }
                            });
                    }
                });

            return deferred.promise;

        }


}
