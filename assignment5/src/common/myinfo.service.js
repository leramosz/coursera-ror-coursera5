(function () {
"use strict";

angular.module('common')
.service('MyInfoService', MyInfoService);

function MyInfoService() {
  var service = this;
  service.user = null;

  service.setProfile = function (user) {
    service.user = user;
  };

  service.getProfile = function () {
    return service.user;
  };
}

})();
