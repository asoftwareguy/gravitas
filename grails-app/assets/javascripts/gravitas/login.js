var login = angular.module('login', []);

login.controller('loginController',
    function ($rootScope, $scope, $http, authService) {
        console.log('loginController called');

        $scope.logIn = function() {
            console.log('logIn called');

            $http.post('api/login', { username: $scope.authData.username, password: $scope.authData.password }, getAuthenticateHttpConfig).
                success(function(data) {
                    console.log('authentication token: ' + data.access_token);
                    console.log('authentication username: ' + data.username);
                    $rootScope.isAuthenticated = true;
                    $rootScope.currentUser = data.username;
                    setLocalToken(data.access_token);
                    authService.loginConfirmed({}, function(config) {
                        var localToken = getLocalToken();
                        if( !config.headers["X-Auth-Token"] || (config.headers["X-Auth-Token"] != localToken) ) {
                            console.log('X-Auth-Token not on original request or different; updating it');
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
    function ($rootScope, $scope, $http, $location) {
        console.log('logoutController called');

        $scope.logOut = function() {
            console.log('logOut called');

            $http.post('api/logout', {}, getHttpConfig()).
                success(function() {
                    console.log('logout success');
                    $rootScope.isAuthenticated = false;
                    $rootScope.currentUser = null;
                    sessionStorage.clear();
                    $location.path("/")
                }).
                error(function(data) {
                    console.log('logout error: ' + data);
                });
        }
    }
);

console.log('login controllers load complete');