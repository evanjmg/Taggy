angular
.module("taggyApp", ['ngResource','angular-jwt', 'ui.router', 'jcs-autoValidate', 'bootstrap.fileField'])
.config(MainRouter)
.config(AuthInterceptor)
.constant("API", "http://localhost:3000/api")

function AuthInterceptor($httpProvider){
  $httpProvider.interceptors.push("authInterceptor");
}


function MainRouter($stateProvider, $urlRouterProvider) {
  
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/users/login.html'
  })
  .state('logout', {
    url: '/login'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/users/signup.html'
  })
  .state('landing', {
    url: '/',
    templateUrl: 'templates/home/landing.html'
  }) 
  .state('createTask', {
    url: '/team/:team_id/task/new/:member_id',
    templateUrl: 'templates/tasks/new.html',
    controller: 'TasksController'
  })
  .state('myTeams', {
    url: '/users/teams',
    templateUrl: 'templates/users/my_teams.html'
  })
  .state('createTeam', {
    url: '/teams/new',
    templateUrl: 'templates/teams/new.html'
  })
  .state('myTags', {
    url: '/users/tags',
    templateUrl: 'templates/users/my_tags.html'
  })
  .state('showTeam', {
    url: '/teams/:id',
    templateUrl: 'templates/teams/show.html',
  })
  .state('showTask', {
    url: '/teams/:team_id/tasks/:id',
    templateUrl: 'templates/tasks/show.html'
  })
  $urlRouterProvider.otherwise('/') 
  
  }