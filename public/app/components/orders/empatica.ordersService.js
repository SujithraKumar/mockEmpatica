'use strict';
/* Services */
angular
	.module('MainApp')
	.factory('OrderService', ['$http', '$q', OrderService]);

function OrderService($http, $q) {
	var path = "";
	var factory = {};



	factory.getOrders = function (id) {
		path = 'users/' + id +'/orders';
		var deferred = $q.defer();
		return $http.get(path).then(function (response) {
			deferred.resolve(response);
			return deferred.promise;
		}, function (response) {
			deferred.reject(response);
			return deferred.promise;
		});
	};




	return factory;
};