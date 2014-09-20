window.app = angular.module('restaurant', []);

app.controller('Cart', ['$scope', '$http', function($scope, $http) {
    $scope.cart = 'Cart';
}]);