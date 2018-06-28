'use strict';
/* Services */
angular
	.module('MainApp')
	.factory('MainService', ['$http', '$q', MainService]);

function MainService($http, $q) {

	var path = "";
	var factory = {};
	var deferred = $q.defer();

	factory.login = function (user) {
		path = "login";
		var deferred = $q.defer();
		return $http.post(path).then(function (response) {
			deferred.resolve(response);
			return deferred.promise;
		}, function (response) {
			deferred.reject(response);
			return deferred.promise;
		});
	};

	factory.getUser = function (id) {
		path = 'users/' + id;
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