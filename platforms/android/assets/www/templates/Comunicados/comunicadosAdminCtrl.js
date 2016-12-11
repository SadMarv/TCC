'Use Strict';
angular.module('UserDirectory').controller('comunicadosAdminCtrl', function (comunicados, turmas, $scope, $stateParams, $ionicPopup, Utils, $log) {
         var vm = this;


           $scope.date = moment().format('llll');

           function getTurmas() {
               Utils.show();
               turmas.all()
                   .then(function (result) {
                       vm.turma = result.data.data;
                       Utils.hide();
                       //$log.log(result);
                   });
           }



         function getAll() {
             Utils.show();
             comunicados.all()
                 .then(function (result) {
                     vm.data = result.data.data;
                     Utils.hide();
                     //$log.log(result);
                 });
         }

         function clearData(){
             vm.data = null;
         }



         function create(object) {
             comunicados.create(object)
                 .then(function (result) {
                     cancelCreate();
                     getAll();
                     $log.log(result);

                 });
         }

         function update(object) {
             comunicados.update(object.id, object)
                 .then(function (result) {
                     cancelEditing();
                     getAll();
                 });
         }

         function deleteObject(id) {
            var confirmPopup = $ionicPopup.confirm({
              title: 'Remover Comunicado',
              template: 'Tem certeza que deseja excluir?'
            });
            confirmPopup.then(function(res) {
              if(res){
                comunicados.delete(id).then(function(result){
                    getAll();
                });
              }else{
                    cancelEditing();
                    getAll();
              }
         });
     }



         function initCreateFormAtiv() {
             vm.newObject = {data: '', descricao: '', titulo:'', geral:''};
         }

         function setEdited(object) {
             vm.edited = angular.copy(object);
             vm.isEditing = true;
         }

         function isCurrent(id) {
             return vm.edited !== null && vm.edited.id === id;
         }

         function cancelEditing() {
             vm.edited = null;
             vm.isEditing = false;
         }

         function cancelCreate() {
             initCreateFormAtiv();
             vm.isCreating = false;
         }

         vm.objects = [];
         vm.edited = null;
         vm.isEditing = false;
         vm.isCreating = false;
         vm.getAll = getAll;
         vm.create = create;
         vm.update = update;
         vm.delete = deleteObject;
         vm.setEdited = setEdited;
         vm.isCurrent = isCurrent;
         vm.cancelEditing = cancelEditing;
         vm.cancelCreate = cancelCreate;



         initCreateFormAtiv();
         getAll();
         getTurmas();

     });

angular.module('UserDirectory').controller('comunicadosCtrl', function (turmas, Backand, comunicados, $scope, $ionicPopup, Utils, $log) {
    var vm = this;


      $scope.date = new Date();

      function getAll() {
        Utils.show();
        turmas.all()
              .then(function (result) {
                  vm.data = result.data.data;
                  //$log.log(result);
                  Utils.hide();
              });
      }

    getAll();

});

angular.module('UserDirectory').controller('comunicadosIDCtrl', function(turmas, comunicados, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
  var vm = this;

  $scope.date = moment().format('llll');




      function getForID(id) {
        Utils.show();
        turmas.fetch(id)
              .then(function (result) {
                vm.perfil = result.data;
                vm.turma = $stateParams.id;
                Utils.hide();


                // /  $log.log(vm.data);
                  //console.log(result);
              });
              // Carrega turma por ID


      }


      function getAll() {
          Utils.show();
          comunicados.all()
              .then(function (result) {
                  vm.data = result.data.data;
                  Utils.hide();
                  $log.log(vm.data);
              });
      }

      function clearData(){
          vm.data = null;
      }

      function create(object) {
          comunicados.create(object)
              .then(function (result) {
                  cancelCreate();
                  getAll();

              });
      }

      function update(object) {
          comunicados.update(object.id, object)
              .then(function (result) {
                  cancelEditing();
                  getAll();
              });
      }

      function deleteObject(id) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Remover Comunicado',
           template: 'Tem certeza que deseja excluir?'
         });
         confirmPopup.then(function(res) {
           if(res){
             comunicados.delete(id).then(function(result){
                 getAll();
             });
           }else{
                 cancelEditing();
                 getAll();
           }
      });
}



      function initCreateFormAtiv() {
          vm.newObject = {titulo: '', descricao: '', data:'', turmas:''};
      }

      function setEdited(object) {
          vm.edited = angular.copy(object);
          vm.isEditing = true;
      }

      function isCurrent(id) {
          return vm.edited !== null && vm.edited.id === id;
      }

      function cancelEditing() {
          vm.edited = null;
          vm.isEditing = false;
      }

      function cancelCreate() {
          initCreateFormAtiv();
          vm.isCreating = false;
      }

      vm.objects = [];
      vm.edited = null;
      vm.isEditing = false;
      vm.isCreating = false;
      vm.getAll = getAll;
      vm.create = create;
      vm.update = update;
      vm.delete = deleteObject;
      vm.setEdited = setEdited;
      vm.isCurrent = isCurrent;
      vm.cancelEditing = cancelEditing;
      vm.cancelCreate = cancelCreate;


      //filtro por id usando diretiva $filter

      /*$scope.showdetails = function(turma_id){
        var found = $filter('getById')(vm.data, turma_id);
        $scope.selected = found[0].id;
        console.log(found);
   }*/




       // Carrega todos comunicados
       getAll();
      // Carrega id da turma
      getForID($stateParams.id);




    });
