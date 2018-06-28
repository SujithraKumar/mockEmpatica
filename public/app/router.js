angular.module('MainApp', ['ngRoute'])

	.config(function ($routeProvider, $locationProvider) {


		$routeProvider
			.when('/', {
				templateUrl: 'app/views/home.html',

			})
			.when('/login', {
				templateUrl: 'app/components/login/login.html',
				


			})
			.when('/orders', {
				templateUrl:'app/components/orders/orders.html'

			})


	})