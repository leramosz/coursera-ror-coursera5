(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'templates/categories.html',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().
          then(function (result) {
            return result;
          });
      }]
    }
  })

  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'templates/items.html',
    controller: "ItemsController as itemsCtrl",
    resolve: {
      details: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams['itemId']).
          then(function (result) {
            return result;
          });
      }]
    }
  });

}

})();
