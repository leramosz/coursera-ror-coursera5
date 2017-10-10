(function (){

'use strict';

angular.module('ShoppingCart', [])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;
	toBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();	
	toBuy.bought = function (index, item) {
		ShoppingListCheckOffService.manageLists(index, item);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var alreadyBought = this;
	alreadyBought.boughtList = ShoppingListCheckOffService.getToBoughtList();
}

function ShoppingListCheckOffService() {
	var service = this;

	var toBuyList = [
		{ name: "cookies", quantity: 10 },
		{ name: "cokes", quantity: 5 },
		{ name: "kimchi", quantity: 20 },
		{ name: "milk", quantity: 3 },
		{ name: "cheese", quantity: 30 }
	];

	var boughtList = [];

	service.getToBuyList = function () {
    	return toBuyList;
  	};

  	service.getToBoughtList = function () {
  		return boughtList;
  	};

	service.manageLists = function (itemIdex, item) {
		toBuyList.splice(itemIdex, 1);
		boughtList.push(item);
	};

}

})();