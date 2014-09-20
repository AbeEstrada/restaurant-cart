window.app = angular.module('restaurant', []);

app.controller('Cart', ['$scope', '$http', function($scope, $http) {
    $scope.data = {};

    $http({
        method: 'GET',
        url: 'http://demo9542161.mockable.io/v1/carts/c1659f57-b21e-49cc-ba8f-0dde54b3e161'
    }).success(function(data, status, headers, config) {
        $scope.data.cart = data;
    });

    $scope.getTotalItems = function() {
        var total = 0;
        try {
            for (var i = $scope.data.cart.order.items.length - 1; i >= 0; i--) {
                var item = $scope.data.cart.order.items[i];
                total += item.quantity;
            };
        } catch(e) {}
        return total;
    };

    $scope.getTotalPrice = function() {
        var total = 0;
        try {
            for (var i = $scope.data.cart.order.items.length - 1; i >= 0; i--) {
                var item = $scope.data.cart.order.items[i];
                total += (item.unit_price * item.quantity);
            };
        } catch(e) {}
        return total;
    };

    $scope.updateItem = function(i, e) {
        var item = $scope.data.cart.order.items[i];
        var quantity = angular.element(e.target).siblings('input.quantity').val();
        $http({
            method: 'POST',
            url: 'http://demo9542161.mockable.io/v1/carts/c1659f57-b21e-49cc-ba8f-0dde54b3e161/update',
            params: {
                item_uuid: item.uuid,
                quantity: quantity
            }
        }).success(function(data, status, headers, config) {
            $scope.data.cart.order.items[i].quantity = quantity;
            //$scope.data.cart = data;
        });
    };

    $scope.removeItem = function(i) {
        var item = $scope.data.cart.order.items[i];
        if (item) {
            $http({
                method: 'POST',
                url: 'http://demo9542161.mockable.io/v1/carts/c1659f57-b21e-49cc-ba8f-0dde54b3e161/remove',
                params: {
                    item_uuid: item.uuid
                }
            }).success(function(data, status, headers, config) {
                $scope.data.cart.order.items.splice(i, 1);
                //$scope.data.cart = data;
            });
        }
    };
}]);