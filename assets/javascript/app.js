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


$('button').on('click', function(event) {
    event.preventDefault();

    var trainName = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTime = $('#first-train-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });
    $('.input-text').val('');
});

dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);

    $('tbody').prepend(
        "<tr><td>" + childSnapshot.val().trainName + "</td>" 
        + "<td>" + childSnapshot.val().destination + "</td>"
        + "<td>" + childSnapshot.val().frequency + "</td>"
        + "<td></td></tr>"
    )
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});