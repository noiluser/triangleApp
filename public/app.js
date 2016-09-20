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
        return $q(function(resolve, reject) {
            if (values.length < 3) {
                reject({type : "Parameters error", msg : "Parameters count is less than 3."});
            } else {
                var output = [];
                values = values.slice(0, 3);
                var converted = values.every(function(element) {
                    var num = parseFloat(element);
                    output.push(num);
                    return (!isNaN(num) && isFinite(element) && num > 0);
                });
                if (converted) {
                    resolve(output);
                } else {
                    reject({type : "Parameters error", msg : "Parameters should contain positive numbers."});
                }
            };
        });
    };

    $scope.checkTriangleIsPossible = function(values) {
        return $q(function(resolve, reject) {
            if (values.length > 2) {
                if (((values[0] + values[1]) > values[2]) &&
                    ((values[0] + values[2]) > values[1]) &&
                    ((values[1] + values[2]) > values[0])) {
                    resolve(values);
                } else {
                    reject({
                        type: "Parameters error",
                        msg: "Triangle with sides=[" + values.join(",") + "] is not exists."
                    });
                }
            } else {
                reject({type: "Parameters error", msg: "Parameters error."});
            }
        });
    };

    $scope.checkTriangleType = function(values) {
        return $q(function(resolve, reject) {
            if (values.length > 2) {
                var analyzer = {};
                analyzer[values[0]] = 1;
                analyzer[values[1]] = 1;
                analyzer[values[2]] = 1;
                var type = Object.keys(analyzer).length;
                if (type === 1) {
                    resolve({type: "success", msg: "The triangle is equilateral."});
                } else if (type === 2) {
                    resolve({type: "success", msg: "The triangle is isosceles."});
                } else if (type === 3) {
                    resolve({type: "success", msg: "The triangle is scalene."});
                } else {
                    reject({type: "Error", msg: "Error occured while the triangle type been verified."});
                }
            } else {
                reject({type: "Parameters error", msg: "Parameters error."});
            }
        });
    };

    $scope.showTriangleType = function(data) {
        return $q(function(resolve, reject) {
            if (data.hasOwnProperty('type') && data.type === "success") {
                $scope.result = data.msg;
            } else {
                data.type = "Error";
                reject(data);
            }
        });
    };

    $scope.showErrorMsg = function(data) {
        $scope.error = data.type + ". " + data.msg;
    };
});

