app = angular.module('UserDirectory.controllers', ['ngMessages'])

    app.controller('DashboardCtrl', function (itemsAtiv, $rootScope, $ionicPopup) {
        var vm = this;

        function getAll() {
            itemsAtiv.all()
                .then(function (result) {
                    vm.data = result.data.data;
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


    app.controller('userAdminCtrl', function (userAdmin, $rootScope, $ionicPopup, $state, $scope) {


        var vm = this;


        function getAll() {
            userAdmin.all()
                .then(function (result) {
                    vm.data = result.data.data;
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

    app.controller('userFuncioCtrl', function (userFuncio, $rootScope, $ionicPopup, $state, $scope) {


        var vm = this;


        function getAll() {
            userFuncio.all()
                .then(function (result) {
                    vm.data = result.data.data;
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
            vm.newObject = {cpf: '', nome: '', funcao:''};
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

    app.controller('turmasCtrl', function (turmas, $rootScope, $ionicPopup, $state, $scope) {


      var vm = this;


        function getAll() {
          turmas.all()
                .then(function (result) {
                    vm.data = result.data.data;
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
            vm.newObject = {turma: '', periodo: '', ano:'', alunos:''};
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

    app.controller('alunosCtrl', function (alunos, $rootScope, $ionicPopup, $state, $scope, $http) {


      var vm = this;


        function getAll() {
          alunos.all()
                .then(function (result) {
                    vm.data = result.data.data;
                });
        }

        function getOne(object){
          alunos.objectName()
          .then(function(result){
            console.log("eita");
            vm.data = result.data.data;
          });
        }


        function clearData(){
            vm.data = null;
        }


        function create(object) {
            alunos.create(object)
                .then(function (result) {
                  console.log("passou");
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
            vm.newObject = {matricula: '', nome: '', nomeResp:'', periodo:'', turma:''};
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

    app.controller('responsaveisCtrl', function (responsaveis, $rootScope, $ionicPopup, $state, $scope) {


      var vm = this;


        function getAll() {
          responsaveis.all()
                .then(function (result) {
                    vm.data = result.data.data;
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

    });
