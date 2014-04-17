var home = angular.module('home', []);

home.controller('homeController',
    function ($scope, $location) {
        console.log('homeController called');

        $scope.goToDashboard = function() {
            console.log('goToDashboard called');

            // TODO: attempt to go to dashboard
            $location.path("/myEvents")
        };

        $scope.register = function() {
            console.log('register called');
            alert("Coming soon!");
        }
    }
);

console.log('home controllers load complete');