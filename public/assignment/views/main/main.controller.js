/**
 * Created by Bradley on 2/27/16.
 */

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();