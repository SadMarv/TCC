// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){

  app = angular.module('UserDirectory', ['ionic', 'backand', 'UserDirectory.services', 'UserDirectory.controllers', 'components', 'ngStorage', 'ngCordova', 'firebase', 'ngMessages']);

  app.config(function($stateProvider, $urlRouterProvider){


    //rotas para login

    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'js/views/login/login.html',
      controller:'loginController'
    });
    $stateProvider.state('forgot', {
      url: '/forgot',
      templateUrl: 'js/views/forgot/forgot.html',
      controller:'forgotController'
    });
    $stateProvider.state('register', {
      url: '/register',
      templateUrl: 'js/views/register/register.html',
      controller:'registerController'
    });
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'js/views/home/home.html',
      controller:'homeController'
    });
    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: 'js/views/profile/profile.html',
      controller:'profileController'
    });


    $stateProvider.state("menu",{
      url:"/menu",
      templateUrl:"templates/menu.html",
      abstract: true,
      controller:"initCtrl"
    });

    $stateProvider.state('menu.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
            templateUrl: 'templates/Atividades/atividades.html'
                }
            }
        });

    $stateProvider.state("menu.home",{
            url:"/home",
            views:{
              'menuContent':{
                templateUrl:"templates/home.html"
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

$urlRouterProvider.otherwise("/login");
});



  app.constant('FURL', {
    apiKey: "AIzaSyCpC0f4IUbkHlFfE67L13Y2JQ92YGJMsOg",
    authDomain: "agendapp-425aa.firebaseapp.com",
    databaseURL: "https://agendapp-425aa.firebaseio.com",
    storageBucket: "agendapp-425aa.appspot.com",
  }
  )



  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function(FURL) {


      // AdMob
              if(window.AdMob) {
                  var admobid;

                  if (device.platform == "Android") {
                      admobid = { // for Android
                          banner: 'ca-app-pub-8943241156434100/4304279677',
                          interstitial: 'ca-app-pub-8943241156434100/3994725276'
                      };
                  } else {
                      admobid = { // for iOS
                          banner: 'ca-app-pub-8943241156434100/7257746078',
                          interstitial: 'ca-app-pub-8943241156434100/2378391279'
                      };
                  }
                  console.log("admobid" + angular.toJson(admobid));

                  $adMob.createBanner( {
                      adId: admobid.banner,
                      autoShow: true,
                      bgColor: 'black',
                      position: $adMob.position.BOTTOM_CENTER
                  });

                  $adMob.prepareInterstitial({
                      adId: admobid.interstitial,
                      autoShow: false
                  });
              }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {


    BackandProvider.setAppName('agendapp1');
    BackandProvider.setSignUpToken('503f9e26-3910-4417-a2d1-cbb9a37a1bda');
    BackandProvider.setAnonymousToken('105ec633-a009-4da9-9607-1e275f5e967a');

   });

}());
