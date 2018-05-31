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


// onclick button to add new train
$("#submitButton").on("click", function (event) {
    event.preventDefault();
    // var now = moment();
    // console.log(now);

    // Takes user input
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    console.log(trainFrequency);

//convert firstTrain time to moment format
    // var trainTime = moment(firstTrain, "h:mm a", false).format("MMMM DD YYYY, h:mm:ss a");

    // console.log(trainTime);
    var newTrain = {
        "Name": trainName,
        "Destination": trainDestination,
        "Frequency": trainFrequency,
        "startTime": firstTrain
    };

    // Uploads employee data to the database
    database.ref("/trains").push(newTrain);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrain").val("");
    $("#trainFrequency").val("");

});


database.ref("/trains").on("child_added", function (childSnapshot, prevChildKey) {

    var newChild = (childSnapshot.val());
    console.log(newChild);

    var trainTime = moment(newChild.startTime, "h:mm a", false).format("MM DD YYYY, h:mm:ss a");

    var minutes = moment(trainTime).minutes();

    console.log(minutes);
    console.log(newChild.Frequency);

    var difference = moment().diff(minutes,"minutes");
    console.log(difference);

    var remainder = difference % newChild.Frequency;
    console.log(remainder);

    var remainingMinutes = newChild.Frequency - remainder;
    console.log(remainingMinutes);

    var finalTime = moment().add(remainingMinutes, "m").format("hh:mm a");
    console.log(finalTime);

    // var st = newChild.startTime;
    // console.log(st);

    // var timeSplit = moment(st).minutes();
    // console.log(timeSplit);





    //trainTime to minutes
    // when in minutes, subtract trainTime diff function - subtract frequency from current time = minute to next train



    // var currentName = childSnapshot.val().name;
    // var currentDestination = childSnapshot.val().destination;
    // var currentFrequency = childSnapshot.val().frequency;


    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#trainTable").append("<tr><td>" + newChild.Name + "</td><td>" + newChild.Destination + "</td><td>" +
        newChild.Frequency + "</td><td>" + finalTime + "</td><td>" + remainingMinutes + "</td>");
});


// +empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>
