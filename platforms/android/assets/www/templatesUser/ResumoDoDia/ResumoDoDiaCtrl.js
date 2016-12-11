'Use Strict';
angular.module('UserDirectory').controller('resumoUserCtrl', function (resumo, alunos, $scope, $ionicPopup, Utils, $log) {
    var vm = this;

    $scope.date = moment().format('llll');

    function getAll() {
        Utils.show();
        resumo.all()
            .then(function (result) {
                vm.data = result.data.data;
                Utils.hide();
              //$log.log(result);
            });
    }

    function getForAluno() {
        Utils.show();
        alunos.all()
            .then(function (result) {
                vm.aluno = result.data.data;
                Utils.hide();
              // $log.log(vm.aluno);
            });
    }

    function clearData(){
        vm.data = null;
    }



    function create(object) {
        resumo.create(object)
            .then(function (result) {
                cancelCreate();
                getAll();
                //$log.log(result);

            });
    }

    function update(object) {
        resumo.update(object.id, object)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function deleteObject(id) {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Remover Resumo',
         template: 'Tem certeza que deseja excluir?'
       });
       confirmPopup.then(function(res) {
         if(res){
           resumo.delete(id).then(function(result){
               getAll();
           });
         }else{
               cancelEditing();
               getAll();
         }
    });
}



    function initCreateFormAtiv() {
        vm.newObject = {data: '', descricao: '', fezes:'', refeicao:'', alunos:''};
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
    vm.getForAluno = getForAluno;
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
    getForAluno();

});

angular.module('UserDirectory').controller('turmasResumoUserCtrl', function(turmas, Backand, alunos, resumo, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
  var vm = this;

  $scope.date = moment().format('llll');

  function getAll() {
      Utils.show();
      turmas.all()
          .then(function (result) {
              vm.data = result.data.data;
              Utils.hide();
              //$log.log(result);
          });
  }

  function clearData(){
      vm.data = null;
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


      // Carrega todos alunos
      getAll();



    });


    angular.module('UserDirectory').controller('resumoTurmasUserIDCtrl', function(turmas, alunos, resumo, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
      var vm = this;

      $scope.date = moment().format('llll');


    /*  $scope.clicked = function(){
        $ionicActionSheet.show({
          titleText: 'Opções',
          buttons: [
            { text: '<i class="icon ion-share"></i> Resumo do Dia' },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function() {
            console.log('CANCELLED');
          },
          buttonClicked: function() {
            $state.go('menu.alunoResumo',{"id":vm.aluno});
            console.log('BUTTON CLICKED');
            return true;
          },
          destructiveButtonClicked: function deleteObject(id) {

               var confirmPopup = $ionicPopup.confirm({
                 title: 'Remover Resumo',
                 template: 'Tem certeza que deseja excluir?'
               });
               confirmPopup.then(function(res) {
                 if(res){
                   resumo.delete(id).then(function(result){
                       getAll();
                   });
                 }else{
                       cancelEditing();
                       getAll();
                 }
            });
        }
            //console.log('DESTRUCT');
            // /return true;
          });
        }*/


      function getResumosAll() {
          Utils.show();
          resumo.all()
              .then(function (result) {
                  vm.resumo = result.data.data;
                  Utils.hide();
                  $log.log(result);
              });
      }

      function clearData(){
          vm.data = null;
      }



      function create(object) {
          resumo.create(object)
              .then(function (result) {
                  //cancelCreate();
               Utils.alertshow("Sucesso","Resumo do dia criado.");
              //  /$location.path('menu.turmas');


                  //$log.log(result);

              });
      }

      function update(object) {
          resumo.update(object.id, object)
              .then(function (result) {
                  cancelEditing();
                  getResumosAll();
              });
      }

      function deleteObject(id) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Remover Resumo',
           template: 'Tem certeza que deseja excluir?'
         });
         confirmPopup.then(function(res) {
           if(res){
             resumo.delete(id).then(function(result){
                 getResumosAll();
             });
           }else{
                 cancelEditing();
                 getResumosAll();
           }
      });
    }


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


          }

          function getAlunoID(id) {
            Utils.show();
            alunos.fetch(id)
                  .then(function (result) {
                    vm.al = result.data;
                    vm.aluno = $stateParams.id;
                    Utils.hide();


                    //$log.log(vm.al);
                      //console.log(result);
                  });


          }
          //filtro por id usando diretiva $filter

          /*$scope.showdetails = function(turma_id){
            var found = $filter('getById')(vm.data, turma_id);
            $scope.selected = found[0].id;
            console.log(found);
       }*/


          function getAll() {
            Utils.show();
            alunos.all()
                .then(function (result) {
                    vm.data = result.data.data;
                    Utils.hide();
                  //  $log.log('result' + JSON.stringify(vm.data));
                    $log.log(result);
                });
          }

          function initCreateFormAtiv() {
              vm.newObject = {data: '', descricao: '', fezes:'', refeicao:'', alunos:''};
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


          getResumosAll();


          // Carrega todos alunos
          getAll();

          // Carrega turma por ID
          getForID($stateParams.id);

          getAlunoID($stateParams.id);
        });
