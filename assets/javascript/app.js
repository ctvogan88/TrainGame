
// initializa firebase
var config = {
    apiKey: "AIzaSyBqFHEm34QKHfDy0PC6ne_22UafIpKEF2c",
    authDomain: "traintime-ac374.firebaseapp.com",
    databaseURL: "https://traintime-ac374.firebaseio.com",
    projectId: "traintime-ac374",
    storageBucket: "traintime-ac374.appspot.com",
    messagingSenderId: "1094532752146"
};
firebase.initializeApp(config);

// set a variable for the database object
var database = firebase.database();

console.log("DB: " + database);

var name = "clayton";
var destination = "";
var initialTime = 0;
var frequency = 0;
var nextTime = 0;
var deltaTime = 0;

// initiates the fxn on click of button id submit
$("#submit").on("click", function (event) {

    // not really sure what this does
    event.preventDefault();

    // dump form data into variables
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    initialTime = $("#initial-time").val().trim();
    frequency = $("#frequency").val().trim();

    // push those variables into the firebase.database()
    if (name == "" || destination == "" || initialTime == "" || frequency == "") {
        alert("Please complete the form!");

    } else {
        console.log(name);
        database.ref().push({
            name: name,
            destination: destination,
            initialTime: initialTime,
            frequency: frequency,
            //nextTime: nextTime,
            //deltaTime: deltaTime
        });


        // creates rows for the new info
        createRow();
    }
});




var createRow = function (data) {
    //----

    if (!data) {
        alert("no more data");
    } else {
        // Assumptions
        var tFrequency = 3;

        // define initial time variable with user input
        var firstTime = "03:30";

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log("ftc: ", firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        // sets variables for html elements to be added
        var tBody = $("tbody");
        var tRow = $("<tr>");


        // define variables for either 
        var name = (data.name || name);
        var destination = (data.destination || destination);
        var initialTime = (data.initialTime || initialTime);
        var frequency = (data.frequency || frequency);
        //Math.floor(moment(today).diff(moment(compareDate), 'months', true));
        //console.log("name: " + name + " destination: " + destination + " intitial time: " + initialTime + " frequency: " + frequency);

        var nameTd = $("<td>").text(data.name || name);
        var destinationTd = $("<td>").text(data.destination || destination);
        var initialTimeTd = $("<td>").text(data.initialTime || initialTime);
        var frequencyTd = $("<td>").text(data.frequency || frequency);

        /*  if (isNaN(convertedDate)) {
             var workedTd = $("<td>").text("pending application review");
         } else { var workedTd = $("<td>").text(convertedDate); } */

        //var nextArrTd = $("<td>").text("");

        //var deltaTd = $("<td>").text("");//JSON.stringify(data.empMonthlyRate || monthlyRate);



        // adds the table data elements to the table row element AKA tRow
        tRow.append(nameTd, destinationTd, initialTimeTd, frequencyTd);
        console.log(tRow);
        // adds the tRow variable to the table body AKA tBody
        tBody.append(tRow);
        console.log(tBody);
    };
};

database.ref().on("child_added", function (snapshot) {
    console.log("he shoots he scores (the snapshot): " + snapshot.val());
    createRow(snapshot.val());

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
