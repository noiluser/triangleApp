'use strict';

describe('triApp module', function() {

    beforeEach(module('triApp'));

    var scope, createController;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        createController = function() {
            return $controller('triController', {'$scope': scope});
        };
    }));

    describe('triApp test triController', function(){
        it('test scope', function () {
            var controller = createController();
            scope.fside = 2;
            expect(scope.fside).toEqual(2);
        });

        // checkInputData

        it('checkInputData resolve integer items array', function () {
            var controller = createController();
            scope.checkInputData(['1', '1', '2']).then(function(data) {
                expect(data).toEqual([1, 1, 2]);
            });
            scope.$apply();
        });

        it('checkInputData resolve big length items array with the first 3 items', function () {
            var controller = createController();
            scope.checkInputData(['1', '1', '2', '3', '5', '7', '10']).then(function(data) {
                expect(data).toEqual([1, 1, 2]);
            });
            scope.$apply();
        });

        it('checkInputData reject low length array', function () {
            var controller = createController();
            scope.checkInputData([]).then(function(){}, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            scope.$apply();
        });

        it('checkInputData reject negative number', function () {
            var controller = createController();
            scope.checkInputData(['1', '1', '-1']).then(function(){}, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            scope.$apply();
        });

        // checkTriangleIsPossible

        it('checkTriangleIsPossible resolve numbers array', function () {
            var controller = createController();
            scope.checkTriangleIsPossible([1, 2, 2]).then(function(data) {
                expect(data).toEqual([1, 2, 2]);
            });
            scope.$apply();
        });

        it('checkTriangleIsPossible reject string array', function () {
            var controller = createController();
            scope.checkTriangleIsPossible(['1', '2', '2']).then(function(){}, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            scope.$apply();
        });

        it('checkTriangleIsPossible reject low length array', function () {
            var controller = createController();
            scope.checkTriangleIsPossible([1, 2]).then(null, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            scope.$apply();
        });

        // checkTriangleType

        it('checkTriangleType resolve numbers array', function () {
            var controller = createController();
            scope.checkTriangleType([1, 2, 2]).then(function(data) {
                expect(data.msg).toBe("The triangle is isosceles.");
            });
            scope.$apply();
        });

        it('checkTriangleType resolve numbers array-2', function () {
            var controller = createController();
            scope.checkTriangleType([2, 2, 2]).then(function(data) {
                expect(data.msg).toBe("The triangle is equilateral.");
            });
            scope.$apply();
        });

        it('checkTriangleType resolve numbers array-3', function () {
            var controller = createController();
            scope.checkTriangleType([2, 3, 4]).then(function(data) {
                expect(data.msg).toBe("The triangle is scalene.");
            });
            scope.$apply();
        });

        it('checkTriangleType reject string array', function () {
            var controller = createController();
            scope.checkTriangleType(['1', '2', '2']).then(function(){}, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            scope.$apply();
        });

        it('checkTriangleType reject low length array', function () {
            var controller = createController();
            scope.checkTriangleType([1, 2]).then(null, function(data) {
                expect(data.type).toBe("Parameters error");
            });
            scope.$apply();
        });

    });
});