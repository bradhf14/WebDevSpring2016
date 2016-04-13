//Purpose of the form service is so that its located in a place
//where various parts of the application can access it and use

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var model = {

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormbById,
            updateFormById: updateFormById
        };

        return model;

        //Remove all callbacks made by user

        function createFormForUser(userId,form){
            return $http.post ("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId){
            return $http.get ("/api/assignment/user/" + userId + "/form");
        }

        //TODO see if this works as logically expected
        function deleteFormbById(formId){
            return $http.delete ("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm){
            return $http.put ("/api/assignment/form/" + formId, newForm);
        }
    }
})();