/**
 * Created by Bradley on 4/12/16.
 */

//data for now stored as mock data
var forms = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function(app, db) {

    var api = {
        createForm: createForm,                     //C
        createField: createField,                   //C
        findAllForms: findAllForms,                 //R
        findFormById: findFormById,                 //R
        findFormByTitle: findFormByTitle,           //R
        findAllFormsByUserId: FindAllFormsByUserId, //R
        findFieldInFormById: findFieldInFormById,   //R
        updateForm: updateForm,                     //U
        updateField: updateField,                   //U
        deleteForm: deleteForm,                     //D
        deleteField: deleteField                    //D
        //any other necessary ones to implement here, look at CRUD requirements
    };

    return api;

    //accept instance, add it to corresponding collection, and return the collection
    function createForm(newForm){
        newForm._id = (new Date()).getTime();
        forms.push(newForm);
        return forms;

    }

    //accept formId and new field object, creates a field in that form object if form object exists, returns fields or null
    function createField(formId, newField){
        for(var f in forms) {
            if( forms[f]._id === id) {
                newField._id = uuid.v1();
                forms[f].fields.push(newField)
                return forms[f].fields;
            }
        }
        return null;
    }


    //takes in no argument, and returns the collection
    function findAllForms() {

        return forms;
    }

    //takes in ID, finds instance, return the instance found, or null otherwise
    function findFormById(id){
        for(var f in forms) {
            if( forms[f]._id === id) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormByTitle(title) {

        for(var f in forms) {
            if( forms[f].title === title) {
                return forms[f];
            }
        }
        return null;

    }


    //TODO build out this function
    function FindAllFormsByUserId(){

        return forms;
    }

    //finds the object with id, updates the found instance, return the instance, otherwise null?
    function updateForm(formId, updatedForm) {
        for(var f in forms) {
            if( forms[f]._id === userId) {
                forms[f].title = updatedForm.title;
                forms[f].userId = updatedForm.userId;
                forms[f].fields = updatedForm.fields;
                return forms[f];
            }
        }
        return null;
    }

    //finds the object with id, updates the found instance, return the instance, otherwise null?
    //TODO SOME OF the fields variables might not exists, be blank.  how to handle this???
    function updateField(formId, fieldId, field) {

        for(var f in forms) {
            if (forms[f]._id === formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id===fieldId){
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
            if (forms[f]._id === formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id===fieldId){
                        return forms[f].fields[i];
                    }
                }

            }
        }
        return null;
    }

    //should accept an ID as an argument, remove instance of object with that ID,
    //return updated list?
    function deleteForm(formId){
        for (var f in forms){
            if (forms[f]._id === formId){
                forms.splice(f, 1);
            }
        }
        return forms;
    }

    function deleteField(formId, fieldId){

        for(var f in forms) {
            if (forms[f]._id === formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id===fieldId){
                        forms[f].fields.splice(i,1);
                    }
                }
            }
        }
        return forms;
    }


}
