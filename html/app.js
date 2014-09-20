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
            $scope.data.total += (item.unit_price * item.quantity);
        };
    });



    $scope.updateItem = function(i) {
        var item = $scope.data.cart.order.items[i];
        $http({
            method: 'POST',
            url: 'http://demo9542161.mockable.io/v1/carts/c1659f57-b21e-49cc-ba8f-0dde54b3e161/update',
            params: {
                item_uuid: item.uuid,
                quantity: item.quantity
            }
        }).success(function(data, status, headers, config) {
            $scope.data.units = 0;
            $scope.data.total = 0;
            for (var i = $scope.data.cart.order.items.length - 1; i >= 0; i--) {
                var item = $scope.data.cart.order.items[i];
                $scope.data.units += item.quantity;
                $scope.data.total += (item.unit_price * item.quantity);
            };
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
                $scope.data.units -= item.quantity;
                $scope.data.total -= item.total_price;
                $scope.data.cart.order.items.splice(i, 1);
                //$scope.data.cart = data;
            });
        }
    };
}]);