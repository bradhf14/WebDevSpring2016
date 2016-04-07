//Purpose of the form service is so that its located in a place
//where various parts of the application can access it and use

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var model = {
            forms : [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],

            CreateFormForUser: CreateFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormbById,
            updateFormById: updateFormById
        };

        return model;

        function CreateFormForUser(userId,form,callback){

            var toAdd = {"_id": (new Date).getTime(), "title": form, "userId": userId};
            this.forms.push(toAdd);
            callback(toAdd);
        }

        function findAllFormsForUser(userId, callback){

            var formsForUser=[];
            for (var i = 0; i < this.forms.length; i++){
                if(this.forms[i].userId == userId){
                    formsForUser.push(this.forms[i]);
                }
            }
            callback(formsForUser);
            return formsForUser;
        }

        //TODO see if this works as logically expected
        function deleteFormbById(formid, callback){

            for (var i = 0; i < this.forms.length; i++){
                if(this.forms[i]._id == formid){
                    this.forms.splice(i,1);
                }
            }
            callback(this.forms);
        }

        function updateFormById(formId, newForm, callback){
            for (var i = 0; i < this.forms.length; i++){
                if(this.forms[i]._id == formid){
                    this.forms[i].title = newForm.title;
                    this.forms[i].userId = newForm.userId;
                    callback(this.forms[i]);
                }
            }
        }
    }
})();