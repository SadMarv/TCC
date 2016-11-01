'Use Strict';
angular.module('UserDirectory').controller('registerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Antes de logar:" + JSON.stringify(user));
         Utils.alertshow("Sucesso","O Usuário foi criado com sucesso.");
         $location.path('/');
      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

}
);
