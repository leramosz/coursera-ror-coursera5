(function () {

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'MyInfoService'];
function SignUpController(MenuService, MyInfoService) {
  var reg = this;

  reg.cleanCustomValidator = function() {
  	reg.dishnumberinvalid = false;
  }

  reg.submit = function () {
	  MenuService.validateMenuName(reg.user.menu_number.toUpperCase())
	  		.then(function (result) {
	  			
	  			if (result) {
	  				reg.completed = true;
	  				reg.dishnumberinvalid = false;
	  				reg.user.dish = result;
	  				MyInfoService.setProfile(reg.user);
	  			} else {
	  				reg.dishnumberinvalid = true;
	  			}

	  		});
  };
}

})();
