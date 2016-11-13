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
