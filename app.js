var app = angular.module('usCalendar', [ 'ngRoute' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/holidays', {
		templateUrl : 'holidays.html',
		controller : 'HolidayController'
	}).when('/holiday/:index', {
		templateUrl : 'holiday.html',
		controller : 'SpecificHolidayController'
	}).otherwise({
		redirectTo : '/holidays'
	});
});

app.factory('HolidayService',function($http){
	var holidays = [];
	$http
	.get("https://holidayapi.com/v1/holidays?key=46d6e6d7-8b6d-4c9c-b0f8-fcb38f892da6&country=US&year=2015")
	.success(function(data,status,header,config){
		var temp = data.holidays;
		var holidaySimplified = [];
		for(key in temp){
			for(i in temp[key]){
				holidays.push(temp[key][i]);
			}	
		}
	});
	function getHolidaysData(){
		return holidays;
	}
	return{
		get:getHolidaysData
	}
});

app.controller('HolidayController', function($scope,HolidayService) {
	$scope.holidays = HolidayService.get();
	
});

app.controller('SpecificHolidayController',function($scope,HolidayService,$routeParams){
	$scope.neededHolidayIndex = $routeParams.index;
	$scope.holidays = HolidayService.get();
	$scope.neededHoliday =$scope.holidays[$scope.neededHolidayIndex];
});

