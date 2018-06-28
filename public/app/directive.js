	angular
		.module('MainApp')
		.directive('navbar', function () {
		return {
			restrict: "E",
			scope: false,
			templateUrl: 'app/views/navbar.html',
			link: function ($scope, element, attrs, toaster) {
				debugger;
			}
		};
	});