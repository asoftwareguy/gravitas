var login = angular.module('login', []);

login.controller('loginController',
    function ($rootScope, $scope, $http, authService) {
        console.log('loginController called');

        $scope.logIn = function() {
            console.log('logIn called')

            $http.post('api/login', { username: $scope.authData.username, password: $scope.authData.password }, getAuthenticateHttpConfig).
                success(function(data) {
                    console.log('authentication token: ' + data.token);
                    localStorage["authToken"] = data.token;
                    authService.loginConfirmed({}, function(config) {
                        if(!config.headers["X-Auth-Token"]) {
                            console.log('X-Auth-Token not on original request; adding it');
                            config.headers["X-Auth-Token"] = getLocalToken();
                        }
                        return config;
                    });
                }).
                error(function(data) {
                    console.log('login error: ' + data);
                    $rootScope.$broadcast('event:auth-loginFailed', data);
                });
        }
    }
);

login.controller('logoutController',
    function ($scope, $http, $location) {
        console.log('logoutController called');

        $scope.logOut = function() {
            console.log('logOut called');

            $http.post('api/logout', {}, getHttpConfig()).
                success(function() {
                    console.log('logout success');
                    localStorage.clear();
                    $location.path("/")
                }).
                error(function(data) {
                    console.log('logout error: ' + data);
                });
        }
    }
);

console.log('login controllers load complete');