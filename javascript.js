angular.module('PortalApp')

.controller('widgetCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    // SETUP

    // Widget Configuration
    $scope.portalHelpers.config = {
        "title": "Bookable",
        "icon": "icon-bell"
    };

    // Initialize input variable
    $scope.insertValue = { value: "" };

    // Show loading message in the first column
    $scope.portalHelpers.showView('loading.html', 1);

    // Show loading animation
    $scope.portalHelpers.toggleLoading(true);

    // DATABASE EXAMPLE

    $scope.getDbData = function () {
        $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
            $scope.dbData = result;
        });
    }

    // Try to get test data from the database
    $scope.getDbData();

    // Create table
    $scope.createTable = function () {
        $scope.portalHelpers.invokeServerFunction('createTable').then(function (result) {
            $scope.getDbData();
        });
    }
    
    // Insert a value into the database
    $scope.insertData = function () {
        if ($scope.insertValue.value.length > 50)
            alert('value should be less than 50 characters');
        else {
            $scope.portalHelpers.invokeServerFunction('insert', { value: $scope.insertValue.value }).then(function (result) {
                $scope.dbData = result;
            });
        }
    };
$scope.number = 5;
$scope.getNumber = function(num) {
    return new Array(num);   
}
  
  	// Supporting functions for bookings
  	$scope.getAppointments = function(){
     	$scope.portalHelpers.invokeServerFunction("getAppointmentsForUserId", {userId:$scope.student.UserId, status:0})
        .then(function(appointments){
        	$scope.pendingAppointments = appointments;
          	console.log($scope.pendingAppointments);
        });
      	$scope.portalHelpers.invokeServerFunction("getAppointmentsForUserId", {userId:$scope.student.UserId, status:1})
        .then(function(appointments){
        	$scope.rejectedAppointments = appointments;
          	console.log($scope.rejectedAppointments);
        });
      	$scope.portalHelpers.invokeServerFunction("getAppointmentsForUserId", {userId:$scope.student.UserId, status:2})
        .then(function(appointments){
        	$scope.approvedAppointments = appointments;
          	console.log($scope.approvedAppointments);
        });
    };
  
  	$scope.makeAppointment = function(app){
      var date = "2015-" + app.month +"-"+ app.day;
      	//Create appointment JSON
      	var appointment = {
          	studentName: $scope.student.FirstName + " " + $scope.student.LastName,
          	studentId: $scope.student.UserId,
          	date_Day: date,
          	date_Time: app.time,
          	resourceId: app.resourceId,
          	resourceName: "Something",
          	staffName: app.staffName,
          	staffId: "-1",
          	status: 0 ,
          	comments: app.comments
        }
        console.log(appointment);
        //Save the appointment
        $scope.portalHelpers.invokeServerFunction("makeAppointment", appointment)
        .then(function(log){
        console.log(log)});
    };
  
  	// Get Student info
  	$http.get("/Develop/GetStudentInfo", {}).then(function(student){
      	$scope.student = student.data.Data;
      	console.log($scope.student);
      	$scope.getAppointments();
    });
  	
  	$http.get("/Develop/GetStudentAcademicInfo", {}).then(function(studentAcademic){
      	$scope.studentAcademic = studentAcademic;
      	console.log($scope.studentAcademic);
    });   	

    $scope.showAdmin = function () {
        $scope.portalHelpers.showView('admin.html', 2);
    }
    
    $scope.showResources = function () {
        $scope.portalHelpers.showView('resources.html', 2);
    }
    
    $scope.showTimeslots = function (app) {
      $scope.appointment = app;
        $scope.portalHelpers.showView('timeslots.html', 2);
    }


    $scope.showView3 = function () {
        $scope.portalHelpers.showView('view3.html', 3);
    }

    // PORTAL DATA SOURCE EXAMPLE

    // Get data for the widget
    $http.get('/ImportantLinks/JSONSource').success(function (data) {
        // Make data available in the scope
        $scope.links = data;
        // Turn off loading animation
        $scope.portalHelpers.toggleLoading(false);
        // Show main view
        $scope.portalHelpers.showView('bookings.html', 1);
    });

    // OPEN API EXAMPLE
    $scope.portalHelpers.invokeServerFunction('getOpenData').then(function (result) {
        $scope.openDataExampleData = result;
    });


}])
// Custom directive example
.directive('DirectiveName', ['$http', function ($http) {
    return {
        link: function (scope, el, attrs) {

        }
    };
}])
// Custom filter example
.filter('timeFilter', function () {
    return function (input) {
        var output = input.Hours;
      	if (output < 10)
          	output = "0" + output;
      	output += ":";
      	if (input.Minutes < 10){
          	output += "0" + input.Minutes;
        }
      	else{
          output += input.Minutes;
        }
        return output;
    }
});