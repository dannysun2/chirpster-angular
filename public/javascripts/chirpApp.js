angular.module('chirpApp', ['ui.router'])

   .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider){

      $stateProvider

         .state('home', {
               url: '/home',
               templateUrl: '/home.html',
               controller: 'MainController',
               resolve: {
                  chirpPromise: ['chirps', function(chirps) {
                     return chirps.getAll();
                  }]
               }
         });

         $urlRouterProvider.otherwise('home');
   }])

   .factory('chirps', ['$http', function($http) {
      var o = {
         chirps: []
      };

      o.getAll = function() {
         return $http.get('/chirps').success(function(data) {
            angular.copy(data, o.chirps);
         });
      }

      o.create = function(chirp) {
         return $http.post('/chirps', chirp).success(function(data) {
            o.chirps.push(chirp);
         });
      }
      return o;
   }])

   .controller('MainController', [
      '$scope',
      'chirps', // IMPORT CHIRP FACTORY
      function($scope, chirps){
      $scope.chirps = chirps.chirps;

      $scope.addChirp = function(){
         // var name = $scope.name;
         // var body = $scope.body;

         chirps.create({ name: $scope.name, body: $scope.body});
         $scope.name = '';
         $scope.body = '';
      };
   }])

   .controller('AuthController', [
      '$scope',
      '$stateParams',
      'auth', // import auth factory
      function($scope, $stateParams, auth) {
         $scope.user = {};

         $scope.register = function(){

         }

         $scope.login = function(){

         }

      }
   ])
