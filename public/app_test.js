'use strict';

describe('triApp module', function() {

    beforeEach(module('triApp'));

    var $controller;
    var $scopee;
    var utils;

    beforeEach(inject(function(_$controller_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scopee = _$rootScope_.$new();
    }));

    var dataa;
    describe('triApp test triController', function(){
        it('test scope', function () {
            var $scope = {};
            var controller = $controller('triController', { $scope: $scope });
            $scope.fside = 2;
            expect($scope.fside).toEqual(2);
        });

        // checkInputData

        it('checkInputData resolve integer items array', function () {
            var $scope = {};
            var controller = $controller('triController', { $scope: $scope });

            $scope.checkInputData(['1', '1', '2']).then(function(data) {
                expect(data).toEqual([1, 1, 2]);
            });
            $scopee.$apply();
        });

        it('checkInputData resolve big length items array with the first 3 items', function () {
            var $scope = {};
            var controller = $controller('triController', { $scope: $scope });

            $scope.checkInputData(['1', '1', '2', '3', '5', '7', '10']).then(function(data) {
                expect(data).toEqual([1, 1, 2]);
            });
            $scopee.$apply();
        });

        it('checkInputData reject low length array', function () {
            var $scope = {};
            var controller = $controller('triController', { $scope: $scope });

            $scope.checkInputData([]).then(function(){}, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            $scopee.$apply();
        });

        it('checkInputData reject negative number', function () {
            var $scope = {};
            var controller = $controller('triController', { $scope: $scope });

            $scope.checkInputData(['1', '1', '-1']).then(function(){}, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            $scopee.$apply();
        });

    });
});