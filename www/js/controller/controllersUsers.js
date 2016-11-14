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

            //filtro por id usando diretiva $filter

            /*$scope.showdetails = function(turma_id){
              var found = $filter('getById')(vm.data, turma_id);
              $scope.selected = found[0].id;
              console.log(found);
         }*/

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


            function onLogin(username, role, token) {
                $rootScope.$broadcast('authorized');
                //login.username = username || Backand.getUsername();
                login.role = role || Backand.getUserRole();
                if(login.role === 'User'){
                  $state.go('menuUser.homeUser', {}, {reload: true});
                }else if(login.role === 'Admin' || login.role === 'Coordenador'){
                  $state.go('menu.usuarios', {}, {reload: true});
                }else{
                  $state.go('menu.home', {}, {reload: true});
                }
                //console.log(Backand.getUsername());
                console.log(login.role);
                //console.log(login.token);

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
