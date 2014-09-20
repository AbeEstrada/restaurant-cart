window.app = angular.module('restaurant', []);

app.controller('Cart', ['$scope', '$http', function($scope, $http) {
    $scope.data = {
        cart: {},
        units: 0,
        total: 0
    };
    $http({
        method: 'GET',
        url: 'http://demo9542161.mockable.io/v1/carts/c1659f57-b21e-49cc-ba8f-0dde54b3e161'
    }).success(function(data, status, headers, config) {
        $scope.data.cart = data;
        for (var i = $scope.data.cart.order.items.length - 1; i >= 0; i--) {
            var item = $scope.data.cart.order.items[i];
            $scope.data.units += item.quantity;
            $scope.data.total += item.total_price;
        };
    });
}]);