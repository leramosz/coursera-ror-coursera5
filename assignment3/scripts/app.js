(function (){

'use strict';

angular.module('NarrowItDownApp', [])

.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems)

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var NarrowItDown = this;

	NarrowItDown.foundItems = []
	NarrowItDown.searchItems = function () {

		NarrowItDown.searched = false;
		NarrowItDown.nothingFound = false;
		NarrowItDown.inSearch = true;
		var promise = MenuSearchService.getMatchedMenuItems(NarrowItDown.searchTerm);

		promise.then(function (result) {
			if (result.length > 0) {
				NarrowItDown.foundItems = result;
				NarrowItDown.searched = true;
			} else {
				NarrowItDown.nothingFound = true;
			}
			NarrowItDown.inSearch = false;
		});

	}

	NarrowItDown.removeItem = function (index) {
		MenuSearchService.removeItem(index);
		NarrowItDown.searched = NarrowItDown.foundItems.length > 0
	}

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;

	var foundItems = [];

	service.getMatchedMenuItems = function (searchTerm) {

		return $http({
					method: "GET",
					url: (ApiBasePath + "/menu_items.json")
				}).then(function (response) {
	   
	   				if(searchTerm) {
				     	
						var regex = new RegExp(searchTerm, "gi");
					    response.data.menu_items.forEach(function(item) {
					    	if(item.description.match(regex) !== null) {
					    		foundItems.push(item);
					    	}
						});

						return foundItems;
					}

				    return [];

			    });

	}

	service.removeItem = function (index) {
		foundItems.splice(index, 1);
	}

}

function FoundItems() {

	var ddo = {
	    templateUrl: 'foundItems.html',
	    scope: {
	      items: '<',
	      searched: '<',
	      nothingFound: '<',
	      inSearch: '<',
	      onRemove: '&'
	    },
  	};

  	return ddo;
}

})();