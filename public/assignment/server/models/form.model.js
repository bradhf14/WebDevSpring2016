/**
 * Created by Bradley on 4/12/16.
 */

//data for now stored as mock data
var forms = require("./form.mock.json");

module.exports = function(app, db) {

    var api = {
        createForm: createForm,             //C
        findAllForms: findAllForms,         //R
        findFormById: findFormById,         //R
        findFormByTitle: findFormByTitle,   //R
        updateForm: updateForm,             //U
        deleteForm: deleteForm              //D
        //any other necessary ones to implement here, look at CRUD requirements
    };

    return api;

    //accept instance, add it to corresponding collection, and return the collection
    function createForm(newForm){
        newForm._id = (new Date()).getTime();
        forms.push(newForm);
        return forms;

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

    //takes id and object instance as arguments, finds the object with id
    //update the found instance, return found instance, otherwise null?
    function updateUser(formId, updatedForm) {
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


}
