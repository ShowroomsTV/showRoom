var app = angular.module('app', ['ngRoute', 'ngMessages']);
/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/login.html',
      controller: 'indexController'
    })
    .when('/register', {
      templateUrl: '/partials/register.html',
      controller: 'indexController',
      css: 'assets/register.css'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html',
      controller: 'dashboardController'
    })
    .when('/show/:id', {
      templateUrl: '/partials/show_one.html',
      controller: 'showOneController'
    })
    .when('/show', {
      templateUrl: '/partials/show_all.html',
      controller: 'showAllController'
    })
    .when('/user/:id', {
      templateUrl: '/partials/show_user.html',
      controller: 'showUserController'
    })
    .when('/show/:id/chatroom', {
      templateUrl: '/partials/chat_room.html',
      controller: 'chatRoomController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
