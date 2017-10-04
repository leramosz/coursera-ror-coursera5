(function (){

'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  
	$scope.check = function () {
		
		var message = "Please enter data first";
		var error = true;
		
		if ($scope.lunch) {

			var arr = $scope.lunch.split(',');
			arr = arr.filter(function(n){ return n != "" });

			if (arr.length > 3) {
				message = "Too much!";
			} else {
				message = "Enjoy!";
				error = false;
			}

		}

		$scope.message = message;
		$scope.error = error;
		$scope.success = !error;
	}

}

})();