angular
	.module('MainApp')
	.controller('OrdersController', ['$scope', '$rootScope', '$location', 'OrderService', OrdersController]);

function OrdersController($scope, $rootScope, $location, OrderService) {

	// ****variable declaration***//

	$scope.OrderObject={};
	$scope.orders = [];
	$scope.items = [];
	$scope.subtotal = 0;
	$scope.shippingPrice = 60;
	$rootScope.selectedItem = {};
	$rootScope.cancellationItem = {};
	$scope.UpdateSuccess = false;


	// Needed data to show the editing feature for the orders.. Hence have added. 

	var place = ['Brentwood', 'Greenfield', 'Manchester', 'Newport'];
	var mail = ['susan@yahoo.com', 'messi@gmail.com', 'marco@ymail.com','bassi@outlook.com'];
	var contact = ['9683456784','78465638697','8957638574','8793456785']


	$scope.getOrders = function () {
		var userData = $rootScope.UserObject;
		OrderService.getOrders(userData.id).then(function (result) {
			if (result.data) {
				$scope.OrderObject = result.data;
				$scope.feedGenerate();

			}

		}, function (error) {



			});


	}

	//Generating the Detailed View Object

	$scope.feedGenerate= function(){
		for (var key in $scope.OrderObject) {
			$scope.orders.push($scope.OrderObject[key]);
		}

		$scope.orders=$scope.orders[0];
		var m = 0;

		for (i = 0; i < $scope.orders.length; i++) {
			for (j = 0; j < $scope.orders[i].items.length; j++) {
				m = m + 1;
				$scope.orders[i].items[j].uniqueId = m;
				$scope.orders[i].items[j].contact = contact[m];
				$scope.orders[i].items[j].mail = mail[m];
				$scope.orders[i].items[j].place = place[m];
				$scope.orders[i].items[j].isCancelled = false;

				if ($scope.orders[i].tracking)
					$scope.orders[i].items[j].trackingCode = $scope.orders[i].tracking.trackingCode;
				
				$scope.orders[i].items[j].paidStatus = $scope.orders[i].status;
				$scope.orders[i].items[j].orderid = $scope.orders[i].id;
				$scope.items.push($scope.orders[i].items[j]);
				$scope.subtotal += $scope.orders[i].items[j].amount;
			}
		}

		
	}
	
	
	$scope.editDetails = function (object) {
		$rootScope.selectedItem = object;
	}

	
	$scope.CancelItemConfirmation = function (item) {
		$('#confirmationModal').modal('show');
		$rootScope.cancellationItem = item;
	}

	$scope.cancelOrder = function () {
		$('#confirmationModal').modal('hide');
		for (i = 0; i < $scope.items.length; i++) {
			if ($scope.items[i].uniqueId == $rootScope.cancellationItem.uniqueId) {
				$scope.items[i].isCancelled = true;
				$scope.items[i].paidStatus = "cancelled";
				$scope.subtotal = $scope.subtotal - $scope.items[i].amount;
				break;
			}
		}
		
	}

	$scope.updateOrderDetails = function (modifieditem) {
		$scope.UpdateSuccess = true;
		for (i = 0; i < $scope.items.length; i++) {
			if ($scope.items[i].uniqueId == modifieditem.uniqueId) {
				$scope.items[i] = modifieditem;
				break;
			}
		}
	}




	// Refresh Token Logic has not been implemented... Hence invoking userfunction to get user details

		$scope.$parent.LoggingIn("","refresh");
		$scope.getOrders()



};