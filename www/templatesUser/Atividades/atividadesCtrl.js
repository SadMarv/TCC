'Use Strict';
angular.module('UserDirectory').controller('atividadesUserCtrl', function (turmas, users, $scope, $ionicPopup, $state, Backand, $http, $stateParams, $location, $log, Utils) {

  var vm = this;

  function readOne() {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/' + 'users/',
        params: {
          deep: true // to get the related user objects
        }

      }).then(function(response) {
        vm.user = response.data.data;
        console.log(response);
      });

    };

  function getUsersID(){

    users.all()
      .then(function (result){
        vm.usersID = result.data.data;
        //console.log(vm.usersID);
      });

  }

  function getForUserId(userId) {
      //$rootScope.$broadcast('authorized');
      //login.username = username || Backand.getUsername();
      vm.userID = userId || Backand.getUserDetails();
      vm.userID =  vm.userID.$$state.value.userId;

      //console.log(Backand.getUsername());
      //console.log(vm.userID);

  }

    getForUserId(vm.userID);


    //turmas
    function getAll() {
      Utils.show();
      turmas.all()
            .then(function (result) {
                vm.data = result.data.data;
                //$log.log(result);
                Utils.hide();
            });
    }





    function clearData(){
        vm.data = null;
    }


    function create(object) {
        turmas.create(object)
            .then(function (result) {
              console.log("passou");
                cancelCreate();
                getAll();
                $state.go('menu.turmas');

            });
    }

    function update(object) {
      turmas.update(object.id, object)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function deleteObject(id) {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Remover Turmas',
         template: 'Tem certeza que deseja excluir?'
       });
       confirmPopup.then(function(res) {
         if(res){
          turmas.delete(id).then(function(result){
               getAll();
           });
         }else{
               cancelEditing();
               getAll();
         }
    });
}



    function initCreateFormAdmin() {
        vm.newObject = {turma: '', periodo: '', ano:'', alunos:'', users_turmas:''};
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
        initCreateFormAdmin();
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



    initCreateFormAdmin();
    getAll();
    getUsersID();
    readOne();


});



angular.module('UserDirectory').controller('AtividadesUserIDCtrl', function(turmas, itemsAtiv, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
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
          itemsAtiv.all()
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
          itemsAtiv.create(object)
              .then(function (result) {
                  cancelCreate();
                  getAll();
                  $state.go('menuUser.turmaAtividadeUser', {"id":vm.turma} )

              });
      }

      function update(object) {
          itemsAtiv.update(object.id, object)
              .then(function (result) {
                  cancelEditing();
                  getAll();
              });
      }

      function deleteObject(id) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Remover Atividade',
           template: 'Tem certeza que deseja excluir?'
         });
         confirmPopup.then(function(res) {
           if(res){
             itemsAtiv.delete(id).then(function(result){
                 getAll();
             });
           }else{
                 cancelEditing();
                 getAll();
           }
      });
}



      function initCreateFormAtiv() {
          vm.newObject = {name: '', description: '', date:'', turmas:''};
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




       // Carrega todas atividades
       getAll();
      // Carrega id da turma
      getForID($stateParams.id);




    });
