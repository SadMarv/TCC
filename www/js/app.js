// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){

  app = angular.module('UserDirectory', ['ionic', 'backand', 'UserDirectory.services', 'UserDirectory.controllers', 'ngSanitize', 'ngStorage', 'ngCordova', 'ngMessages', 'ui.router','angularMoment']);

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider){


    //rotas para login

    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'js/views/login/velhologin.html',
      controller: 'LoginCtrl as login'
    });
    $stateProvider.state('forgot', {
      url: '/forgot',
      templateUrl: 'js/views/forgot/forgot.html',
      //controller:'forgotController'
    });

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'js/views/home/home.html',
      //controller:'homeController'
    });
    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: 'js/views/profile/profile.html',
      //controller:'profileController'
    });


    $stateProvider.state("menu",{
      url:"/menu",
      templateUrl:"templates/menu.html",
      abstract: true,
      //controller:"initCtrl"
    });

    $stateProvider.state('menu.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'js/views/register/signup.html',
          controller: 'SignUpCtrl as vm'
                }
            }

    });

    $stateProvider.state('menu.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
            templateUrl: 'templates/Atividades/atividades.html'
                }
            }
        });

        $stateProvider.state('menu.dashboardTurma', {
          url: '/dashboardTurma',
          views: {
            'menuContent': {
                templateUrl: 'templates/Atividades/atividadesTurma.html'
                    }
                }
            });

        $stateProvider.state('menu.turmaAtividade', {
          url: '/turmaAtividade/:id',
          views: {
            'menuContent': {
                templateUrl: 'templates/Atividades/turmaAtividade.html'
                    }
                }
            });



    $stateProvider.state("menu.home",{
            url:"/home",
            views:{
              'menuContent':{
                templateUrl:"templates/home.html",
              }
            }
        });

      $stateProvider.state("menu.usuarios",{
            url:"/usuarios",
            views:{
              'menuContent':{
                templateUrl:"templates/usuarios.html"
              }
            }
        });

        $stateProvider.state("menu.list",{
            url:"/list",
            views:{
              'menuContent':{
                templateUrl:"templates/Admin/listAdmin.html",
                controller: 'userAdminCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.Funcio",{
            url:"/Funcio",
            views:{
              'menuContent':{
                templateUrl:"templates/Funcio/Funcio.html",
                controller: 'userFuncioCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.turmas",{
            url:"/turmas",
            views:{
              'menuContent':{
                templateUrl:"templates/Turmas/turmas.html",
                controller: 'turmasCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.turmasID",{
            url:"/turmasID/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/Turmas/turmasID.html",
                controller: 'TurmaIDCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.alunoResumo",{
            url:"/alunos/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/Turmas/alunoResumo.html",
                controller: 'TurmaIDCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.alunos",{
            url:"/alunos",
            views:{
              'menuContent':{
                templateUrl:"templates/Alunos/alunos.html",
                controller: 'alunosCtrl as vm'
              }
            }
        });


        $stateProvider.state("menu.responsaveis",{
            url:"/responsaveis",
            views:{
              'menuContent':{
                templateUrl:"templates/Responsaveis/resp.html",
                controller: 'responsaveisCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.respID",{
            url:"/respID/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/Responsaveis/respID.html",
                controller: 'respIDCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.ResumoDoDia",{
            url:"/ResumoDoDia",
            views:{
              'menuContent':{
                templateUrl:"templates/ResumoDoDia/ResumoDoDia.html",
                controller: 'resumoCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.comunicados",{
            url:"/comunicados",
            views:{
              'menuContent':{
                templateUrl:"templates/Comunicados/comunicados.html",
                controller: 'comunicadosCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.eventos",{
            url:"/eventos",
            views:{
              'menuContent':{
                templateUrl:"templates/Eventos/eventos.html",
                controller: 'eventosCtrl as vm'
              }
            }
        });
$urlRouterProvider.otherwise("/menu/usuarios");
//$urlRouterProvider.otherwise("/login");
$httpProvider.interceptors.push('APIInterceptor');
});






  app.run(function ($ionicPlatform, $rootScope, $state, LoginService, Backand) {

        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }


            var isMobile = !(ionic.Platform.platforms[0] == "browser");
            Backand.setIsMobile(isMobile);
            Backand.setRunSignupAfterErrorInSigninSocial(true);
        });

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('tab.login');
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name == 'tab.login') {
                signout();
            }
            else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });

    })

  app.config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

      /*BackandProvider.setAppName('agendapp4');
      BackandProvider.setSignUpToken('60846160-838b-446d-9cfe-e35859b4fd2b');
      BackandProvider.setAnonymousToken('e44fa971-034d-4080-8ea1-21dd92014c86');

      */

      BackandProvider.setAppName('tcc2agendapp');
      BackandProvider.setSignUpToken('f090cf74-1ff0-409b-9150-9e0332598537');
      BackandProvider.setAnonymousToken('a9b3a3d5-b2f7-41fc-8add-504670226a05');



   });

}());
