app = angular.module('UserDirectory.controllers', ['ngMessages', 'ngSanitize'])

    app.controller('LoginCtrl', function (Backand, $state, $rootScope, users, LoginService, $stateParams, Utils) {
            var login = this;

            function getAll(){
              users.all()
                .then(function(result){
                  login.userDados = result.data.data;
                  //login.userDados = login.userDados[2].responsaveis;
                  //console.log(login.userDados);

                });

            }

            function signin() {
              Utils.show();
                LoginService.signin(login.email, login.password)
                    .then(function () {
                        getAll();
                        onLogin();
                        Utils.hide();
                    },  function(err) {
                      Utils.hide();
                       Utils.errMessage(err);
                    })
            }


            function onLogin(username, userID, token) {
                $rootScope.$broadcast('authorized');
                //login.username = username || Backand.getUsername();
                login.userID = userID || Backand.getUserDetails();
                //login.userID =  login.userID.$$state.value.userId;
                //console.log(Backand.getUsername());
                //console.log(login.userID);
                //console.log(login.token);
                $state.go('menu.home');
            }

            function signout() {
                LoginService.signout()
                    .then(function () {
                        $rootScope.$broadcast('logout');
                        $state.go('login');

                    })

            }

            /*function socialSignIn(provider) {
                LoginService.socialSignIn(provider)
                    .then(onValidLogin, onErrorInLogin);

            }

            function socialSignUp(provider) {
                LoginService.socialSignUp(provider)
                    .then(onValidLogin, onErrorInLogin);

            }
            */

            onValidLogin = function(response){
                onLogin();
                login.username = response.data || login.username;
                //console.log(login.username);
            }

            onErrorInLogin = function(rejection){
                login.error = rejection.data;
                $rootScope.$broadcast('logout');
                console.log("erro")

            }


            login.username = '';
            login.error = '';
            login.signin = signin;
            login.signout = signout;


        });

        app.controller('SignUpCtrl', function (Backand, $state, $rootScope, LoginService, $log) {
            var vm = this;

            vm.signup = signUp;

            function signUp(){
                vm.errorMessage = '';

                LoginService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again)
                    .then(function (response) {
                        vm.userID = userID || Backand.getUserDetails();

                    });
            }


            vm.email = '';
            vm.password ='';
            vm.again = '';
            vm.firstName = '';
            vm.lastName = '';
            vm.errorMessage = '';
        });

        app.controller('DashboardCtrl', function (Backand, itemsAtiv, $scope, $ionicPopup, Utils) {
          var vm = this;


          function getForUserId(userId) {
              //$rootScope.$broadcast('authorized');
              //login.username = username || Backand.getUsername();
              vm.userID = userId || Backand.getUserDetails();
              vm.userID =  vm.userID.$$state.value.userId;

              //console.log(Backand.getUsername());
              //console.log(vm.userID);

          }

            getForUserId(vm.userID);

          $scope.date = new Date();

          function getAll() {
              Utils.show();
              itemsAtiv.all()
                  .then(function (result) {
                      vm.data = result.data.data;
                      Utils.hide();
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
              vm.newObject = {name: '', description: '', date:''};
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

      });


      app.controller('resumoCtrl', function (resumo, alunos, $scope, $ionicPopup, Utils, $log) {
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


      app.controller('comunicadosCtrl', function (comunicados, $scope, $ionicPopup, Utils, $log) {
          var vm = this;


            $scope.date = new Date();




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
              vm.newObject = {data: '', descricao: '', titulo:''};
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

      });

      app.controller('eventosCtrl', function (eventos, $scope, $ionicPopup, Utils, $log) {
          var vm = this;


         $scope.date = new Date();




          function getAll() {
              Utils.show();
              eventos.all()
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
              eventos.create(object)
                  .then(function (result) {
                      cancelCreate();
                      getAll();
                      $log.log(result);

                  });
          }

          function update(object) {
              eventos.update(object.id, object)
                  .then(function (result) {
                      cancelEditing();
                      getAll();
                  });
          }

          function fetch(object) {
              eventos.fetch(object.id, object)
                  .then(function (result) {
                      //console.log("passou");
                      getAll();
                  });
          }

          function deleteObject(id) {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Remover Evento',
               template: 'Tem certeza que deseja excluir?'
             });
             confirmPopup.then(function(res) {
               if(res){
                 eventos.delete(id).then(function(result){
                     getAll();
                 });
               }else{
                     cancelEditing();
                     getAll();
               }
          });
      }



          function initCreateFormAtiv() {
              vm.newObject = {data: '', descricao: '', titulo:''};
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

          $scope.selectedMonth = "";

          $scope.selectedMonthFilter = function(element) {
            if(!$scope.selectedMonth) return true;
            return element.created.getMonth() == $scope.selectedMonth;
          }



          initCreateFormAtiv();
          getAll();

      });


      app.controller('userAdminCtrl', function (userAdmin, $rootScope, $ionicPopup, $state, $scope, Utils) {


          var vm = this;


          function getAll() {
              Utils.show();
              userAdmin.all()
                  .then(function (result) {
                      vm.data = result.data.data;
                      Utils.hide();
                  });
          }

          function clearData(){
              vm.data = null;
          }

          function create(object) {
              userAdmin.create(object)
                  .then(function (result) {
                    console.log("passou");
                      cancelCreate();
                      getAll();
                      $state.go('menu.list');

                  });
          }

          function update(object) {
              userAdmin.update(object.id, object)
                  .then(function (result) {
                      cancelEditing();
                      getAll();
                  });
          }

          function deleteObject(id) {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Remover Administrador',
               template: 'Tem certeza que deseja excluir?'
             });
             confirmPopup.then(function(res) {
               if(res){
                 userAdmin.delete(id).then(function(result){
                     getAll();
                 });
               }else{
                     cancelEditing();
                     getAll();
               }
          });
   }



          function initCreateFormAdmin() {
              vm.newObject = {cpf: '', nome: '', email:'', senha:''};
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

      });

      app.controller('userFuncioCtrl', function (userFuncio, turmas, $rootScope, $ionicPopup, $state, $scope, Utils) {


          var vm = this;

          function getTurmas() {
              Utils.show();
              turmas.all()
                  .then(function (result) {
                      vm.turmas = result.data.data;
                      //console.log(vm.turmas );
                      Utils.hide();
                  });
          }


          function getAll() {
              Utils.show();
              userFuncio.all()
                  .then(function (result) {
                      vm.data = result.data.data;
                      //console.log(vm.data);
                      Utils.hide();
                  });
          }

          function clearData(){
              vm.data = null;
          }


          function create(object) {
              userFuncio.create(object)
                  .then(function (result) {
                    console.log("passou");
                      cancelCreate();
                      getAll();
                      $state.go('menu.Funcio');

                  });
          }

          function update(object) {
              userFuncio.update(object.id, object)
                  .then(function (result) {
                      cancelEditing();
                      getAll();
                  });
          }

          $scope.update = function (valid){

            if (valid){

              console.log("Formulário enviado!");
              console.log($scope.edited);
            }else{
              console.log("invalido");
            }

          }

          function deleteObject(id) {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Remover Funcionário',
               template: 'Tem certeza que deseja excluir?'
             });
             confirmPopup.then(function(res) {
               if(res){
                 userFuncio.delete(id).then(function(result){
                     getAll();
                 });
               }else{
                     cancelEditing();
                     getAll();
               }
          });
   }



          function initCreateFormAdmin() {
              vm.newObject = {cpf: '', nome: '', funcao:'', turma:''};
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
          getTurmas();

      });

      app.controller('turmasCtrl', function (turmas, users, $scope, $ionicPopup, $state, Backand, $http, $stateParams, $location, $log, Utils) {

        var vm = this;

        // GET an single task with all its users
        function readOne() {
            return $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/objects/' + 'turmas/1?deep=true',

            }).then(function(response) {
              //vm.data = response.data.data;
              //console.log(vm.data);
            });

          };

        function getUsersID(){

          users.all()
            .then(function (result){
              vm.usersID = result.data.data;
              console.log(vm.usersID);
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
          //readOne();


      });

      //filtro por id
      /*app.filter('getById', function() {
        return function(input, id) {
          var i=0, len=input.length;
          for (; i<len; i++) {
            if (+input[i].id == +id) {
              return input[i];
            }
          }
          return null;
        }
      });*/




      app.controller('TurmaIDCtrl', function(turmas, alunos, resumo, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
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


        function getAll() {
            Utils.show();
            resumo.all()
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

                    //  $log.log('result' + JSON.stringify(vm.data));
                      //$log.log(result);
                      Utils.hide();
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




            // Carrega todos alunos
            getAll();
            // Carrega turma por ID
            getForID($stateParams.id);

            getAlunoID($stateParams.id);
          });

      app.controller('AtividadesIDCtrl', function(turmas, itemsAtiv, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
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
                        //$log.log(vm.data);
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
                        $state.go('menu.turmaAtividade', {"id":vm.turma} )

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




      app.controller('alunosCtrl', function (alunos, turmas, responsaveis, $rootScope, $ionicPopup, $state, $scope, $http, Utils, $log, $filter) {


        var vm = this;




        function getTurmas() {
          turmas.all().then(function (resposta) {
              vm.dadoTurmas = resposta.data.data;
              //$log.log(resposta);
              });

        }



        function getResp() {
          responsaveis.all().then(function (resposta) {
              vm.dadoResp = resposta.data.data;
              //$log.log(resposta);
              });

        }




          function getAll() {
            Utils.show();
            alunos.all()
                .then(function (result) {
                    vm.data = result.data.data;
                    $log.log(result);
                    Utils.hide();
                });
          }



          function clearData(){
              vm.data = null;
          }


          function create(object) {
              alunos.create(object)
                  .then(function (result) {
                    console.log(result);
                      cancelCreate();
                      getAll();
                      $state.go('menu.alunos');

                  });
          }

          function update(object) {
            alunos.update(object.id, object)
                  .then(function (result) {
                      cancelEditing();
                      getAll();
                  });
          }

          function deleteObject(id) {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Remover Aluno',
               template: 'Tem certeza que deseja excluir?'
             });
             confirmPopup.then(function(res) {
               if(res){
                alunos.delete(id).then(function(result){
                     getAll();
                 });
               }else{
                     cancelEditing();
                     getAll();
               }
            });
          }



          function initCreateFormAdmin() {
              vm.newObject = {matricula: '', nome: '', responsaveis:'', periodo:''};
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
          getTurmas();
          getResp();


      });

      app.controller('responsaveisCtrl', function (Backand, responsaveis, users, $rootScope, $ionicPopup, $state, $stateParams, $scope, $log) {


        var vm = this;

        function getForUserId(fullName) {
            //$rootScope.$broadcast('authorized');
            //login.username = username || Backand.getUsername();
            vm.fullName = fullName || Backand.getUserDetails();
            vm.fullName =  vm.fullName.$$state.value.fullName;

            //console.log(Backand.getUsername());
            //console.log(vm.fullName);

        }

          getForUserId(vm.fullName);

          //pegando o id na base users
          function getUsersResp() {
            users.all()
                  .then(function (result) {
                      vm.users = result.data.data;
                      //console.log(vm.data);
                  });
          }




        //criando usuario responsaveis


          function getAll() {
            responsaveis.all()
                  .then(function (result) {
                      vm.data = result.data.data;
                      //console.log(vm.data);
                  });
          }


          function clearData(){
              vm.data = null;
          }


          function create(object) {
              responsaveis.create(object)
                  .then(function (result) {
                    console.log("passou");
                      cancelCreate();
                      getAll();
                      $state.go('menu.responsaveis');

                  });
          }

          function update(object) {
            responsaveis.update(object.id, object)
                  .then(function (result) {
                      cancelEditing();
                      getAll();
                  });
          }

          function deleteObject(id) {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Remover Responsável',
               template: 'Tem certeza que deseja excluir?'
             });
             confirmPopup.then(function(res) {
               if(res){
                responsaveis.delete(id).then(function(result){
                     getAll();
                 });
               }else{
                     cancelEditing();
                     getAll();
               }
          });
   }



          function initCreateFormAdmin() {
              vm.newObject = {cpf: '', nome: ''};
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
          getUsersResp();

      });



      app.controller('respIDCtrl', function(Backand, LoginService, turmas, responsaveis, users, alunos, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
        var vm = this;

        //criando login para responsaveis

        vm.signup = signUp;

        function signUp(){
            Utils.show();
            vm.errorMessage = '';

            LoginService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again, {tipo: vm.tipo},{turma: vm.turma})
                .then(function (response) {
                  Utils.hide();
                  Utils.alertshow("Sucesso","Login do usuário criado.");
                  });

        }

        vm.email = '';
        vm.password ='';
        vm.again = '';
        vm.firstName = '';
        vm.lastName = '';
        vm.tipo= '';
        vm.turma= '';
        vm.errorMessage = '';



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

            function getForID(id) {
              Utils.show();
              responsaveis.fetch(id)
                    .then(function (result) {
                      vm.perfil = result.data;
                      Utils.hide();


                       //$log.log(vm.perfil);
                        //console.log(result);
                    });


            }

            function getTurmasAll(){
              Utils.show();
                turmas.all()
                  .then(function(result){
                    vm.turmas = result.data.data;
                    /*$scope.showdetails = function(turma_id){
                      var found = $filter('getById')(vm.aluno, turma_id);
                      $scope.selected = found[0].__metadata.descriptives.responsaveis.value;
                      console.log(found);
                    //vm.aluno = vm.aluno[].__metadata.descriptives.responsaveis.value;
                    //vm.aluno = vm.aluno.__metadata.descriptives.responsaveis.value;
                    $log.log($scope.selected);
                  }
                  */
                  Utils.hide();
                });
            }





            function getAll(){
              Utils.show();
                alunos.all()
                  .then(function(result){
                    vm.aluno = result.data.data;
                    /*$scope.showdetails = function(turma_id){
                      var found = $filter('getById')(vm.aluno, turma_id);
                      $scope.selected = found[0].__metadata.descriptives.responsaveis.value;
                      console.log(found);
                    //vm.aluno = vm.aluno[].__metadata.descriptives.responsaveis.value;
                    //vm.aluno = vm.aluno.__metadata.descriptives.responsaveis.value;
                    $log.log($scope.selected);
                  }
                  */
                });
            }


            //filtro por id usando diretiva $filter

            /*$scope.showdetails = function(turma_id){
              var found = $filter('getById')(vm.data, turma_id);
              $scope.selected = found[0].id;
              console.log(found);
         }*/







            // Carrega todos alunos
               getAll()
            // Carrega turma por ID
            getForID($stateParams.id);

            getTurmasAll();



          });

          app.controller('usersCtrl', function (Backand, responsaveis, users, $rootScope, $ionicPopup, $state, $scope, $log) {


            var vm = this;

            function getForUserId(fullName) {
                //$rootScope.$broadcast('authorized');
                //login.username = username || Backand.getUsername();
                vm.fullName = fullName || Backand.getUserDetails();
                vm.fullName =  vm.fullName.$$state.value.fullName;

                //console.log(Backand.getUsername());
                //console.log(vm.fullName);

            }

              getForUserId(vm.fullName);



            //criando usuario responsaveis


              function getAll() {
                users.all()
                      .then(function (result) {
                          vm.data = result.data.data;
                          //console.log(vm.data);
                      });
              }


              function clearData(){
                  vm.data = null;
              }


              function create(object) {
                  users.create(object)
                      .then(function (result) {
                        //console.log("passou");
                          cancelCreate();
                          getAll();
                          $state.go('menu.responsaveis');

                      });
              }

              function update(object) {
                users.update(object.id, object)
                      .then(function (result) {
                          cancelEditing();
                          getAll();
                      });
              }

              function deleteObject(id) {
                 var confirmPopup = $ionicPopup.confirm({
                   title: 'Remover Responsável',
                   template: 'Tem certeza que deseja excluir?'
                 });
                 confirmPopup.then(function(res) {
                   if(res){
                    users.delete(id).then(function(result){
                         getAll();
                     });
                   }else{
                         cancelEditing();
                         getAll();
                   }
              });
       }



              function initCreateFormAdmin() {
                  vm.newObject = {cpf: '', nome: ''};
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

          });

          app.controller('homeCtrl', function(Backand, LoginService, users,  $rootScope, $stateParams, $state, $scope, $log, $ionicActionSheet, $ionicPopup, $location, $filter, moment, Utils) {
            var vm = this;

            function getAll(){
              users.all().then(function(result){
                  vm.data = result.data.data;
                  console.log(vm.data);

              });
            }

            function getForUserId(fullName, userId) {
              //users.all().then(function (result){
                  //vm.data = result.data.data;
                  //console.log(vm.data);


                //$rootScope.$broadcast('authorized');
                //login.username = username || Backand.getUsername();
                vm.fullName = fullName || Backand.getUserDetails();
                vm.fullName =  vm.fullName.$$state.value.fullName;

                vm.userID = userId || Backand.getUserDetails();
                vm.userID =  vm.userID.$$state.value.userId;
                //vm.userID === vm.data;

                //console.log(Backand.getUsername());
                console.log(vm.userID);
              //});


            }

              getForUserId(vm.fullName, vm.userID);
              //getUsersID($stateParams.id);
              getAll();

            });
