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
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return model;

        //Remove all callbacks made by user

        function createFormForUser(userId,form){
            console.log(userId);
            console.log(form);
            return $http.post ("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId){
            return $http.get ("/api/assignment/user/" + userId + "/form");
        }


        function deleteFormById(formId){
            return $http.delete ("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm){
            return $http.put ("/api/assignment/form/" + formId, newForm);
        }
    }
})();