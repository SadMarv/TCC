// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){

  app = angular.module('UserDirectory', ['ionic', 'backand', 'UserDirectory.services', 'UserDirectory.controllers', 'ngSanitize', 'ngStorage', 'ngCordova', 'ngMessages', 'ui.router','angularMoment','ionic-datepicker']);


  app.run(function ($ionicPlatform, $rootScope, $state, LoginService, Backand, Utils) {



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
            //Backand.setRunSignupAfterErrorInSigninSocial(true);

            var role = Backand.getUserRole();

            if($rootScope.token = Backand.getToken()!== null && role === 'User' ){
              $rootScope.token = localStorage.getItem("BACKANDtoken");
              $rootScope.$broadcast('authorized');
              $state.go('menuUser.homeUser');
            }else if($rootScope.token = Backand.getToken()!== null && role === 'Responsavel' ){
              $rootScope.token = localStorage.getItem("BACKANDtoken");
              $rootScope.$broadcast('authorized');
              $state.go('menuResp.homeResp');
            }else if($rootScope.token = Backand.getToken()!== null && role === 'Admin' || role === 'Coordenador' ){
              $rootScope.token = localStorage.getItem("BACKANDtoken");
              $rootScope.$broadcast('authorized');
              $state.go('menu.home');
            }else{
              $state.go('login');
            }
        });

        function unauthorized() {
            Utils.alertshow('Usuário não autorizado','Você não tem permissão de acesso.')
            console.log("Usuário não autorizado, enviando para página de login.");
            $state.go('login');
            Utils.hide();
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });



    })

    app.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Selecionar',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      mondayFirst: false,
      weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
      weekDaysList:["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      monthsList: ["Jan", "Fev", "Mar", "Abril", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: false,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

  app.config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

      /*BackandProvider.setAppName('agendapp4');
      BackandProvider.setSignUpToken('60846160-838b-446d-9cfe-e35859b4fd2b');
      BackandProvider.setAnonymousToken('e44fa971-034d-4080-8ea1-21dd92014c86');

      */
      /*
      BackandProvider.setAppName('tcc3agendapp1');
      BackandProvider.setSignUpToken('6cb9b63a-6151-43ef-9f35-ec75d8438d02');
      BackandProvider.setAnonymousToken('9fc0a5a0-b2c8-41ad-a29d-8aca9e14fc2b');
      */
      BackandProvider.setAppName('tcc2agendapp');
      BackandProvider.setSignUpToken('f090cf74-1ff0-409b-9150-9e0332598537');
      BackandProvider.setAnonymousToken('a9b3a3d5-b2f7-41fc-8add-504670226a05');

      //BackandProvider.runSocket(true);


   });

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


    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: 'js/views/profile/profile.html',
      //controller:'profileController'
    });


    $stateProvider.state("menu",{
      url:"/menu",
      templateUrl:"templates/menu.html",
      abstract: true,
      controller:"LoginCtrl as login"
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

        $stateProvider.state("menu.FuncioID",{
            url:"/FuncioID/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/Funcio/FuncioID.html",
                controller: 'CriarFuncioCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.CriarFuncio",{
            url:"/CriarFuncio",
            views:{
              'menuContent':{
                templateUrl:"templates/Funcio/CriarFuncio.html",
                controller: 'CriarFuncioCtrl as vm'
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

        $stateProvider.state("menu.criarResp",{
            url:"/criarResp",
            views:{
              'menuContent':{
                templateUrl:"templates/Responsaveis/criarResp.html",
                controller: 'criarRespCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.respID",{
            url:"/respID/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/Responsaveis/respID.html",
                controller: 'RespIDCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.turmasResumo",{
            url:"/turmasResumo",
            views:{
              'menuContent':{
                templateUrl:"templates/ResumoDoDia/turmasResumo.html",
                controller: 'turmasResumoCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.resumoTurmasID",{
            url:"/resumoTurmasID/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/ResumoDoDia/resumoTurmasID.html",
                controller: 'resumoTurmasIDCtrl as vm'
              }
            }
        });


        $stateProvider.state("menu.ResumoDoDia",{
            url:"/ResumoDoDia/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/ResumoDoDia/ResumoDoDia.html",
                controller: 'resumoTurmasIDCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.alunoResumoAdmin",{
            url:"/alunoResumoAdmin/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/ResumoDoDia/alunoResumoAdmin.html",
                controller: 'resumoTurmasIDCtrl as vm'
              }
            }
        });

        $stateProvider.state("menu.comunicados",{
            url:"/comunicados",
            views:{
              'menuContent':{
                templateUrl:"templates/Comunicados/comunicados.html",
                controller: 'comunicadosAdminCtrl as vm'
              }
            }
        });


        $stateProvider.state("menu.comunicadosTurma",{
            url:"/comunicadosTurma/:id",
            views:{
              'menuContent':{
                templateUrl:"templates/Comunicados/comunicadosTurma.html",
                controller: 'comunicadosIDCtrl as vm'
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


        //ROUTE DE ROLE = USER

      $stateProvider.state("menuUser",{
        url:"/menuUser",
        templateUrl:"templatesUser/menuUser.html",
        abstract: true,
        controller:"LoginCtrl as login"
      });

      $stateProvider.state("menuUser.homeUser",{
              url:"/homeUser",
              views:{
                'menuUserContent':{
                  templateUrl:"templatesUser/homeUser.html",
                    }
                  }
              });

              $stateProvider.state("menuUser.turmasUser",{
                  url:"/turmasUser",
                  views:{
                    'menuUserContent':{
                      templateUrl:"templatesUser/Turmas/turmasUser.html",
                      controller: 'turmasUserCtrl as vm'
                    }
                  }
              });

              $stateProvider.state("menuUser.turmasUserID",{
                  url:"/turmasUserID/:id",
                  views:{
                    'menuUserContent':{
                      templateUrl:"templatesUser/Turmas/turmasUserID.html",
                      controller: 'TurmaUserIDCtrl as vm'
                    }
                  }
              });

              $stateProvider.state("menuUser.turmasResumoUser",{
                  url:"/turmasResumoUser",
                  views:{
                    'menuUserContent':{
                      templateUrl:"templatesUser/ResumoDoDia/turmasResumoUser.html",
                      controller: 'turmasResumoUserCtrl as vm'
                    }
                  }
              });

              $stateProvider.state("menuUser.resumoTurmasUserID",{
                  url:"/resumoTurmasUserID/:id",
                  views:{
                    'menuUserContent':{
                      templateUrl:"templatesUser/ResumoDoDia/resumoTurmasUserID.html",
                      controller: 'resumoTurmasUserIDCtrl as vm'
                    }
                  }
              });

              $stateProvider.state("menuUser.alunoResumo",{
                  url:"/alunos/:id",
                  views:{
                    'menuUserContent':{
                      templateUrl:"templatesUser/ResumoDoDia/alunoResumo.html",
                      controller: 'resumoTurmasUserIDCtrl as vm'
                    }
                  }
              });

              $stateProvider.state("menuUser.ResumoDoDiaUser",{
                  url:"/ResumoDoDiaUser/:id",
                  views:{
                    'menuUserContent':{
                      templateUrl:"templatesUser/ResumoDoDia/ResumoDoDiaUser.html",
                      controller: 'resumoTurmasUserIDCtrl as vm'
                    }
                  }
              });

              $stateProvider.state('menuUser.dashboardTurmaUser', {
                url: '/dashboardTurmaUser',
                views: {
                  'menuUserContent': {
                      templateUrl: 'templatesUser/Atividades/atividadesTurmaUser.html'
                          }
                      }
                  });


                  $stateProvider.state('menuUser.turmaAtividadeUser', {
                    url: '/turmaAtividadeUser/:id',
                    views: {
                      'menuUserContent': {
                          templateUrl: 'templatesUser/Atividades/turmaAtividadeUser.html',
                          //controller: 'resumoTurmasUserIDCtrl as vm'
                              }
                          }
                      });

                      $stateProvider.state("menuUser.turmaComunicadosUser",{
                          url:"/turmaComunicadosUser",
                          views:{
                            'menuUserContent':{
                              templateUrl:"templatesUser/Comunicados/turmaComunicadosUser.html",
                              // controller: 'comunicadosUserCtrl as vm'
                            }
                          }
                      });

                      $stateProvider.state("menuUser.comunicadosUserID",{
                          url:"/comunicadosTurmaUserID/:id",
                          views:{
                            'menuUserContent':{
                              templateUrl:"templatesUser/Comunicados/comunicadosTurmaUser.html",
                              controller: 'comunicadosUserIDCtrl as vm'
                            }
                          }
                      });

                      $stateProvider.state("menuUser.eventosUser",{
                          url:"/eventosUser",
                          views:{
                            'menuUserContent':{
                              templateUrl:"templatesUser/Eventos/eventosUser.html",
                              controller: 'eventosUserCtrl as vm'
                            }
                          }
                      });

                      //ROUTE DE ROLE = RESPONSAVEL

                      $stateProvider.state("menuResp",{
                      url:"/menuResp",
                      templateUrl:"templatesResp/menuResp.html",
                      abstract: true,
                      controller:"LoginCtrl as login"
                      });

                      $stateProvider.state("menuResp.homeResp",{
                            url:"/homeResp",
                            views:{
                              'menuRespContent':{
                                templateUrl:"templatesResp/homeResp.html",
                                  }
                                }
                            });

                            $stateProvider.state('menuResp.dashboardTurmaResp', {
                              url: '/dashboardTurmaResp',
                              views: {
                                'menuRespContent': {
                                    templateUrl: 'templatesResp/Atividades/atividadesTurmaResp.html'
                                        }
                                    }
                                });


                                $stateProvider.state('menuResp.turmaAtividadeResp', {
                                  url: '/turmaAtividadeResp/:id',
                                  views: {
                                    'menuRespContent': {
                                        templateUrl: 'templatesResp/Atividades/turmaAtividadeResp.html',
                                        //controller: 'resumoTurmasUserIDCtrl as vm'
                                            }
                                        }
                                    });

                                    $stateProvider.state("menuResp.turmasResumoResp",{
                                        url:"/turmasResumoResp",
                                        views:{
                                          'menuRespContent':{
                                            templateUrl:"templatesResp/ResumoDoDia/turmasResumoResp.html",
                                            controller: 'resumoTurmasRespIDCtrl as vm'
                                          }
                                        }
                                    });

                                    $stateProvider.state("menuResp.resumoTurmasRespID",{
                                        url:"/resumoTurmasRespID/:id",
                                        views:{
                                          'menuRespContent':{
                                            templateUrl:"templatesResp/ResumoDoDia/resumoTurmasRespID.html",
                                            controller: 'resumoTurmasRespIDCtrl as vm'
                                          }
                                        }
                                    });
                                    $stateProvider.state("menuResp.ResumoDoDiaResp",{
                                        url:"/ResumoDoDiaResp/:id",
                                        views:{
                                          'menuRespContent':{
                                            templateUrl:"templatesResp/ResumoDoDia/ResumoDoDiaResp.html",
                                            controller: 'resumoTurmasRespIDCtrl as vm'
                                          }
                                        }
                                    });
                                    $stateProvider.state("menuResp.turmaComunicadosResp",{
                                        url:"/turmaComunicadosResp",
                                        views:{
                                          'menuRespContent':{
                                            templateUrl:"templatesResp/Comunicados/turmaComunicadosResp.html",
                                            controller: 'comunicadosRespCtrl as vm'
                                          }
                                        }
                                    });

                                    $stateProvider.state("menuResp.comunicadosRespID",{
                                        url:"/comunicadosTurmaRespID/:id",
                                        views:{
                                          'menuRespContent':{
                                            templateUrl:"templatesResp/Comunicados/comunicadosTurmaResp.html",
                                            controller: 'comunicadosRespIDCtrl as vm'
                                          }
                                        }
                                    });
                                    $stateProvider.state("menuResp.eventosResp",{
                                        url:"/eventosResp",
                                        views:{
                                          'menuRespContent':{
                                            templateUrl:"templatesResp/Eventos/eventosResp.html",
                                            controller: 'eventosRespCtrl as vm'
                                          }
                                        }
                                    });


//$urlRouterProvider.otherwise("/menu/CriarFuncio");
//$urlRouterProvider.otherwise("/login");
$httpProvider.interceptors.push('APIInterceptor');
});








}());
