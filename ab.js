let abApp = angular.module('abApp', ['ui.router'])
  .controller('AddressBookController', function ($scope, $http) {

  // Get XML file and translate it to json
  $http.get("ab.xml",
    {
      transformResponse: function (cnv) {
        let x2js = new X2JS();
        let aftCnv = x2js.xml_str2json(cnv);
        return aftCnv;
      }
    })
    .then(function (res) {
      $scope.ab = res.data;
    }).catch((err) => {
      $scope.ab = false;
    });
  });

  // UI Router settings
  abApp.config(function (
    $stateProvider, 
    $locationProvider, 
    $urlRouterProvider
  ) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  let tableView = {
    name: 'table',
    url: '/',
    templateUrl: 'ab.table.html'
  };

  let cardView = {
    name: 'cards',
    url: '/cards',
    templateUrl: 'ab.cards.html'
  };

  $stateProvider.state(tableView);
  $stateProvider.state(cardView);
});