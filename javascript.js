angular.module('PortalApp')

.controller('widgetCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    // SETUP

    // Widget Configuration
    $scope.portalHelpers.config = {
        "title": "Test Project",
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
  
  	$scope.makeAppointment = function(){
      	//Create appointment JSON
      	var appointment = {
          	userName: $scope.student.FirstName + " " + $scope.student.LastName,
          	userId: $scope.student.UserId,
          	dateTime: this.dateTime,
          	resourceId: $scope.resourceId,
          	resourceName: this.resourceName,
          	staffName: $scope.staffName,
          	staffId: this.staffId,
          	status: 0          	
        }
        //Save the appointment
        $scope.portalHelpers.invokeServerFunction("makeAppointment", appointment)
        .then(function(){});
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
.filter('FilterName', function () {
    return function (input, arg1, arg2) {
        var output = input;
        return output;
    }
});