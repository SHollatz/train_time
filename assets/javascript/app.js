var config = {
    apiKey: "AIzaSyCiarHMLs-TfRRxVOvTJg-cZcvlw999ODg",
    authDomain: "trainschedule-hw-week7.firebaseapp.com",
    databaseURL: "https://trainschedule-hw-week7.firebaseio.com",
    projectId: "trainschedule-hw-week7",
    storageBucket: "trainschedule-hw-week7.appspot.com",
    messagingSenderId: "1057363210746"
  };

firebase.initializeApp(config);

var dataRef = firebase.database();
var diffMin = -1;
var minutesAway = -1;
var next = 0;
var nextArrival = 0;


function calculate(firstTime, frequency) {
     console.log("inside calculate()");
    /*
    
    
    diffMin = moment().diff(moment(startTime), 'minutes');
    console.log("diffMin: " + diffMin);
    console.log("frequency " + frequency);
    var remainder = (diffMin % frequency);
    console.log("remainder " + remainder);
    minutesAway = frequency - remainder;
    console.log("minutesAway: " + minutesAway);
    next = moment().add(minutesAway, 'minutes');
    nextArrival = moment(next, "HH:mm");
    console.log("next " + next);
    console.log("nextArrival " + nextArrival);
 */

    console.log(firstTime);
    var startTime = moment(firstTime, 'HH:mm');
    console.log("startTime " + startTime);
    var interval = frequency;
    console.log("interval " + interval);
    var now = moment();
    console.log("now " + now);

    currArr = startTime;
    console.log("currArr" + currArr);
    while (currArr < now) {
        currArr = moment(currArr).add(interval, "minutes");
        console.log("while, currArr " + currArr);
    }

    nextArrival = currArr.format('hh:mm A');
    console.log("nextArrival " + nextArrival)
    minutesAway = moment(currArr).diff(now, "minutes");
    console.log("minutesAway " + minutesAway);

}


$('button').on('click', function(event) {
    event.preventDefault();
    console.log("inside button on click");
    var trainName = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTime = $('#first-train-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
    });
    
    
    
    $('.input-text').val('');
});

dataRef.ref().on("child_added", function(childSnapshot) {
    console.log("inside dataRef on child_added");
    var first = childSnapshot.val().firstTime;
    var freq = childSnapshot.val().frequency;
    calculate(first, freq);
    console.log("next " + next);
    console.log("minutesAway after calculate()" + minutesAway);

    
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);
    
    $('tbody').prepend(
        "<tr><td>" + childSnapshot.val().trainName + "</td>" 
        + "<td>" + childSnapshot.val().destination + "</td>"
        + "<td>" + childSnapshot.val().frequency + "</td>"
        + "<td>" + nextArrival + "</td>"
        + "<td>" + minutesAway + "</td></tr>"
    )

    //nextArrival.format("HH:mm")
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});