/**
 * Created by Bradley on 2/28/16.
 */

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var forms = [

            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        function CreateFormForUser(userId,form,callback){

        }

        function findAllFormsForUser(userId, callback){

            for (i = 0; i < forms.length; i++){
                if(forms[i].userId == userId){
                    callback = "user found"
                }else callback = null;
            }
        }

        function deleteFormbById(formid, callback){

        }

        function updateFormById(formId, newForm, callback){

        }

    }
})();