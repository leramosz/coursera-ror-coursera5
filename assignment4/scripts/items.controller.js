(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService', 'details'];
function ItemsController(MenuDataService, details) {
  var categoryDetail = this;
  categoryDetail.details = details;
}

})();
