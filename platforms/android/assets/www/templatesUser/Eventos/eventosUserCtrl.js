'Use Strict';
angular.module('UserDirectory').controller('eventosUserCtrl', function (eventos, $scope, $ionicPopup, Utils, $log) {
    var vm = this;


   $scope.date = new Date();


   $scope.date = moment().format('llll');

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
                //$log.log(result);

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
