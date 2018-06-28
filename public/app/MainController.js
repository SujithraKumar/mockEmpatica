	angular
		.module('MainApp')
		.controller('MainController', ['$scope', '$rootScope','$location', 'MainService', MainController]);

function MainController($scope, $rootScope, $location, MainService) {

	// ****variable declaration*****

	$scope.loginFailed=false;
	$rootScope.UserObject={};
	$scope.LoginDetails={}
	$rootScope.Username="";


	// Function Declaration
	$scope.LoginPage = function () {
			$location.path('/login');

	}


	$scope.LoggingIn = function (userobject,refresh) {
		$scope.loginFailed= false;
		if(!refresh){
			if(!$scope.LoginDetails.Username){
				$scope.loginFailed = true;
				return;
			}
			else if(!$scope.LoginDetails.Password){
				$scope.loginFailed = true;
				return;
			}
		}

		MainService.login($scope.UserObject).then(function (result) {
			if (result.data) {
				MainService.getUser(result.data.id).then(function (result) {
					if (result.data) {
						$rootScope.UserObject = result.data;
						$rootScope.Username=$rootScope.UserObject.firstName+" "+$rootScope.UserObject.lastName;
						if(!refresh)
							$location.path('/orders');
					}

				}, function (error) {

				});

			}

		}, function (error) {
		
		});

	}
	
};