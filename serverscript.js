// DATABASE PERSISTENCE EXAMPLE

// Retreive data from the database
function getData() {
    var queryResult = db.Execute('SELECT * FROM sampleTable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"Table does not exist"}';
    }
    return queryResult;
}

// Retreive data from the database for a given user ID
function getAppointmentsForUserId() {
  //Todo: hide bookings in the past
    var userId = args.Get("userId");
  var state = args.Get("status");
    var queryResult = db.Execute('SELECT * FROM Appointments WHERE studentId = @currentUser AND status = ' + state);
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"No results"}';
    }
    return queryResult;
}

// Retreive data from the database for a given faculty ID
function getAppointmentsForFacultyId() {
  var ressourceId = args.Get("ressourceId");
  var state = args.Get("status");
    var queryResult = db.Execute('SELECT * FROM Appointments WHERE status = ' + state);
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"No results"}';
    }
    return queryResult;
}

// Set appointment status
function setStatus() {
    var Id = args.Get("appointmentId");
  var state = args.Get("status");
    var queryResult = db.Execute('UPDATE Appointments SET status = ' + state + ' WHERE appointmentId = '+ Id);
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"No results"}';
    }
    return queryResult;
}
// Make appointment
function makeAppointment() {
    var queryResult = db.Execute("INSERT INTO Appointments VALUES(0, @date_day, @date_time, @currentUser, @studentName, -1, @resourceName, @staffName, '-1', @comments)");
    var rows = JSON.parse(queryResult);
    return queryResult;
}

// get time slot
function getOccupiedTimeSlots() {
    var queryResult = db.Execute("SELECT date_time FROM Appointments WHERE date_day = @date, date_time = @time AND status = 2 AND staffId = @staffId");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"No results"}';
    }
    return queryResult;
}

// Create talbe
function createTable() {
    var debug = {};

    var queryResult = db.Execute('SELECT TOP 1 * FROM sampleTable');
    var row = JSON.parse(queryResult);

    if (row.length > 0 && typeof row[0].Error != 'undefined') {

        db.Execute("CREATE TABLE Appointments ( appointmentId INTEGER PRIMARY KEY IDENTITY(1,1), status INTEGER,date_day VARCHAR(10),date_time TIME,studentId VARCHAR (12), studentName VARCHAR (60), resourceId VARCHAR (25), resourceName VARCHAR (25), staffName VARCHAR (60), staffId VARCHAR (12), comments text)");

        debug.result = "created table!";
    } else
        debug.result = "table already exists";

    return JSON.stringify(debug);
}

// Insert into the database
function insert() {
    if (args.Get("value").length > 50)
        return '{"result":"error"}';
    else {
        db.Execute('INSERT INTO sampleTable VALUES(@currentUser,@value)');
        return getData();
    }
}

// OPEN DATA API EXAMPLE

function getOpenData() {
    var apiKey = ""; // Paste your API key here.
    if (apiKey == "")
        return '{"error":"No Api Key! Add your key in the server script file."}';

    return proxy.GetProxy('https://api.uwaterloo.ca/v2/foodservices/watcard.json?key=' + apiKey);
}
