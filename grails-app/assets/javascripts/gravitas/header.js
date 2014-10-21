var header = angular.module('header', []);

header.controller('headerController',
    function ($scope, $cookieStore) {
        console.log('headerController called');

        $scope.isAuthenticated = $cookieStore.get("loggedIn") == "true";
        $scope.currentUser = $cookieStore.get("currentUser");

        $scope.$on('updateHeader', function() {
            console.info('updateHeader event received')
            $scope.isAuthenticated = $cookieStore.get("loggedIn") == "true";
            $scope.currentUser = $cookieStore.get("currentUser");
        });

    }
);

console.log('header controllers load complete');