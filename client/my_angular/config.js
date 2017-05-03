var app = angular.module('app', ['ngMaterial','angular-carousel', 'angular.filter','ngRoute', 'ngMessages','angularUtils.directives.dirPagination','angular-loading-bar']);
/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'showAllController'
    })
    .when('/register', {
      templateUrl: '/partials/register.html',
      controller: 'indexController'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'indexController'
    })
    .when('/dashboard', {
      templateUrl: '/partials/dashboard.html',
      controller: 'dashboardController'
    })
    .when('/show/:name', {
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
    .when('/show/:name/chatroom', {
      templateUrl: '/partials/chat_room.html',
      controller: 'chatRoomController'
    })
    .when("/show/user/:id", {
      templateUrl: "/partials/favorites.html",
      controller: "showUserController"
    })
    .otherwise({
      redirectTo: '/'
    });
});
