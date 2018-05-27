// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwXz4u6JzBeUkH3dgy49m-n5Mn-L3HVGU",
    authDomain: "train-6ea4e.firebaseapp.com",
    databaseURL: "https://train-6ea4e.firebaseio.com",
    projectId: "train-6ea4e",
    storageBucket: "",
    messagingSenderId: "850048046338"
};
firebase.initializeApp(config);

var database = firebase.database();


// button to add new train
$("#submitButton").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    // var trainFrequency = moment($("#trainFrequency").val().trim(), "DD/MM/YY").format("X");

    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainFrequency);


    // Creates local "temporary" object for holding employee data
    var newTrain = {
        "Name": trainName,
        "Destination": trainDestination,
        "Frequency": trainFrequency
    };

    // Uploads employee data to the database
    database.ref("/trains").push(newTrain);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainFrequency").val("");
});


database.ref("/trains").on("child_added", function (childSnapshot, prevChildKey) {

    var newChild = (childSnapshot.val());
    console.log(newChild);

    // var currentName = childSnapshot.val().name;
    // var currentDestination = childSnapshot.val().destination;
    // var currentFrequency = childSnapshot.val().frequency;


    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#trainTable").append("<tr><td>" + newChild.Name + "</td><td>" + newChild.Destination + "</td><td>" +
        newChild.Frequency + "</td><td>");
});


// +empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>
