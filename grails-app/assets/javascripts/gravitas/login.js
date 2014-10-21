var login = angular.module('login', []);

login.controller('loginController',
    function ($rootScope, $scope, $http, authService, $cookieStore) {
        console.log('loginController called');

        $scope.logIn = function() {
            console.log('logIn called');

            $http.post('api/login', { username: $scope.authData.username, password: $scope.authData.password }, getAuthenticateHttpConfig()).
                success(function(data) {
                    console.log('authentication token: ' + data.access_token);
                    console.log('authentication username: ' + data.username);
                    $cookieStore.put("loggedIn", "true");
                    $cookieStore.put("currentUser", data.username);
                    $scope.$emit('updateHeader');
                    setLocalToken(data.access_token);
                    authService.loginConfirmed({}, function(config) {
                        var localToken = getLocalToken();
                        var headerToken = config.headers["X-Auth-Token"];
                        if(!headerToken || (headerToken != localToken)) {
                            console.log('X-Auth-Token not on original request or different; updating it');
                            console.info('Local  Token: ' + localToken);
                            console.info('Header Token: ' + headerToken);
                            config.headers["X-Auth-Token"] = getLocalToken();
                        }
                        return config;
                    });
                }).
                error(function(data) {
                    console.log('login error: ' + data);
                    $rootScope.$broadcast('event:auth-loginFailed', data);
                });

            $scope.loginForm.$setPristine();
            $scope.authData.username = "";
            $scope.authData.password = "";
        }
    }
);

login.controller('logoutController',
    function ($rootScope, $scope, $http, $location, $cookieStore) {
        console.log('logoutController called');

        $scope.logOut = function() {
            console.log('logOut called');

            $http.post('api/logout', {}, getHttpConfig()).
                success(function() {
                    console.log('logout success');
                    $cookieStore.put("loggedIn", null);
                    $cookieStore.put("currentUser", null);
                    $scope.$emit('updateHeader');
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