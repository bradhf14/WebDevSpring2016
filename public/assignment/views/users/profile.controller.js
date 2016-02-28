/**
 * Created by Bradley on 2/21/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope) {
        $scope.profileHello = "Hello from ProfileController"
    }
})();