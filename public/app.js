'use strict';

var app = angular.module('triApp', []);

app.controller('triController', function($scope, $q) {
    $scope.fside = 1;
    $scope.sside = 1;
    $scope.tside = 1;
    $scope.result = "Click the button to verify";
    $scope.error = "";

    $scope.checkTriangle = function(values) {
        $scope.result = "";
        $scope.error = "";
        $scope.checkInputData(values).
            then($scope.checkTriangleIsPossible).
            then($scope.checkTriangleType).
            then($scope.showTriangleType).
            catch($scope.showErrorMsg);
    };

    $scope.refreshCheck = function() {
        var values = [];
        values.push($scope.fside);
        values.push($scope.sside);
        values.push($scope.tside);
        $scope.checkTriangle(values);
    };

    //$scope.$watchGroup(['fside', 'sside', 'tside'], $scope.checkTriangle);
    $scope.$watchGroup(['fside', 'sside', 'tside'], function() {
        // $scope.checkTriangle;
        $scope.error = "";
    });

    $scope.checkInputData = function(values) {
        var deferred = $q.defer();
        if (values.length < 3) {
            deferred.reject({type : "Parameters error", msg : "Parameters count is less than 3."});
        } else {
            var output = [];
            values.forEach(function(item){
               var num = parseFloat(item, 10);
                if(!isNaN(num) && isFinite(item)) {
                    if (num > 0) {
                        if (output.length < 3)
                            output.push(num);
                    } else {
                        deferred.reject({type : "Parameters error", msg : "Parameter \'" + item + "\' is not a positive value."});
                    }
                } else {
                    deferred.reject({type : "Parameters error", msg : "Parameter \'" + item + "\' is not a number."});
                }
            });
            deferred.resolve(output);
        }
        return deferred.promise;
    };

    $scope.checkTriangleIsPossible = function(values) {
        var deferred = $q.defer();
        if (values.length > 2) {
            if (((values[0] + values[1]) > values[2]) &&
                ((values[0] + values[2]) > values[1]) &&
                ((values[1] + values[2]) > values[0])) {
                    deferred.resolve(values);
                } else {
                    deferred.reject({type : "Parameters error", msg : "Triangle with sides=[" + values.join(",") + "] is not exists."});
                }
        } else {
            deferred.reject({type : "Parameters error", msg : "Parameters error."});
        }
        return deferred.promise;
    }

    $scope.checkTriangleType = function(values) {
        var deferred = $q.defer();
        if (values.length > 2) {
            var analyzer = {};
            analyzer[values[0]] = 1;
            analyzer[values[1]] = 1;
            analyzer[values[2]] = 1;
            var type = Object.keys(analyzer).length;
            if (type == 1) {
                deferred.resolve({type : "success", msg : "The triangle is equilateral."});
            } else if (type == 2) {
                deferred.resolve({type : "success", msg : "The triangle is isosceles."});
            } else if (type == 3) {
                deferred.resolve({type : "success", msg : "The triangle is scalene."});
            } else {
                deferred.reject({type : "Error", msg : "Error occured while the triangle type been verified."});
            }

        } else {
            deferred.reject({type : "Parameters error", msg : "Parameters error."});
        }
        return deferred.promise;
    }

    $scope.showTriangleType = function(data) {
        var deferred = $q.defer();
        if (data.hasOwnProperty('type') && data.type == "success") {
            $scope.result = data.msg;
        } else {
            data.type = "Error";
            deferred.reject(data);
        }
        return deferred.promise;
    }

    $scope.showErrorMsg = function(data) {
        $scope.error = data.type + ". " + data.msg;
    }
});

