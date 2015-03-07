var events = angular.module('events', []);

var loadEvent = function($scope, $http, $routeParams) {
    console.log('loadEvent called');

    $http.get('/gravitas/data/events/' + $routeParams['eventId'], getHttpConfig()).
        success(function(data) {
            console.log('loadEvent success');

            $scope.event = data;
            angular.copy($scope.event, $scope.copy);
        }
    );
};

var loadEvents = function($scope, $http) {
    console.log('loadEvents called');

    $http.get('/gravitas/data/events?max=99999', getHttpConfig()).
        success(function (data) {
            console.log('loadEvents success: ' + data);
            $scope.events = data;
        }).
        error(function (data) {
            console.log('loadEvents error: ' + data);
            $scope.events = data;
        }
    );
};

events.controller('listEventsController',
    function ($scope, $location, $http) {
        console.log('listEventsController called');

        loadEvents($scope, $http);

        $scope.createEvent = function() {
            console.log('createEvent called');

            $location.path('/myEvents/create/');
        };

        $scope.editEvent = function(index) {
            console.log('editEvent called');

            $location.path('/myEvents/' + $scope.events[index].id);
        };

        $scope.deleteEvent = function(index) {
            console.log('deleteEvent called');

            var eventId = $scope.events[index].id;
            $http.delete('/gravitas/data/events/' + eventId, getHttpConfig()).
                success(function(data) {
                    console.log('deleteEvent success: ' + data);

                    $location.path('/myEvents');
                }
            );
        };
    }
);

events.controller('createEventController',
    function ($scope, $location, $http) {
        console.log('createEventController called');

        $scope.showWeeks = false;
        $scope.toggleMin = function() {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.saveEvent = function () {
            console.log('saveEvent called');

            $http.post('/gravitas/data/events/', $scope.event, getHttpConfig()).
                success(function (data) {
                    console.log("saveEvent success: " + data);
                    $scope.event = '';
                    $location.path("/myEvents")
                }).
                error(function (data) {
                    console.log('saveEvent error: ' + data);

                    var errors = {};
                    $(data.errors).each( function() {
                        console.log(this.message);
                        errors[this.field] = this.message;
                    });
                    $scope.errors = errors;
                }
            );
        };

        $scope.cancel = function() {
            console.log('cancel called');

            $location.path("/myEvents");
        };
    }
);

events.controller('editEventController',
    function ($scope, $location, $http, $routeParams) {
        console.log('editEventController called');

        loadEvent($scope, $http, $routeParams);

        $scope.showWeeks = false;
        $scope.toggleMin = function() {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.saveEvent = function() {
            console.log('saveEvent called');

            $http.put('/gravitas/data/events/' + $scope.event.id, $scope.event, getHttpConfig()).
                success(function(data) {
                    console.log('saveEvent success: ' + data);

                    $location.path('/myEvents');
                }).
                error(function(data) {
                    console.log('saveEvent error: ' + data);
                }
            );
        };

        $scope.cancel = function() {
            console.log('cancel called');

            $location.path("/myEvents")
        };
    }
);

console.log('events controllers load complete');