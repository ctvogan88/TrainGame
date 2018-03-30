// Display the Start Button in the `#start` div of `index.html`.
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBqFHEm34QKHfDy0PC6ne_22UafIpKEF2c",
        authDomain: "traintime-ac374.firebaseapp.com",
        databaseURL: "https://traintime-ac374.firebaseio.com",
        projectId: "traintime-ac374",
        storageBucket: "traintime-ac374.appspot.com",
        messagingSenderId: "1094532752146"
    };
    firebase.initializeApp(config);

    var today = new Date();
    console.log(today);

    /* var tBody = $("employee-data");

    $("#submit").on("click", function () {

        var row = $("<tr>");

        var empName = $("<td>").text();
        var Role = $("<td>").text();
        var startDate = $("<td>").text();
        var empTenure = $("<td>").text();
        var empRate = $("<td>").text();
        var Role = $("<td>").text();

        row.append(empName, Role, startDate, empTenure, empRate, Role);
        console.log(row);

        // Append the table row to the table body
        tBody.append(row);

        // Added the button to the buttons-view div
        // $("#emp-data").append(row);
    }); */
});

