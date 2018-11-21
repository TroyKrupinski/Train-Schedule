 // Initialize Firebase
  $(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDoLnM8rCZnXKHhwPOTU5qGrT4Icap4Odw",
    authDomain: "uttrain-d696d.firebaseapp.com",
    databaseURL: "https://uttrain-d696d.firebaseio.com",
    projectId: "uttrain-d696d",
    storageBucket: "uttrain-d696d.appspot.com",
    messagingSenderId: "155814125605"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var schedule = [];
var diff = 0;
var remainder = 0;
var minutes = 0;
var arrival = 0;

 database.ref().on("value", function(snapshot) {
 
        
        console.log(moment());
   $("#sc").empty();
   schedule = snapshot.val().ft;
   console.log(schedule);

   for(i = 0; i < schedule.length; i++){
   
       diff = moment().diff(schedule[i][3], "minutes");
        remainder = diff % (schedule[i][2]);
        console.log(remainder);
        minutes = (schedule[i][2]) - remainder;
        arrival = moment().add(minutes, "m").format("hh:mm A");
       console.log(diff);
       
       $("#sc").append("<tr><th scope='row'>"+schedule[i][0]+"</th><td>"+schedule[i][1]+"</td><td>"+schedule[i][2]+"</td><td>"  +arrival+ "</td><td>" + minutes + "</td>")
        
   }

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


$("#submit-train").on("click", function(event) {
    $("sc").empty();
  event.preventDefault();
        var ntrain = [];
ntrain.push($("#train-name").val().trim());
ntrain.push($("#dest-name").val().trim());
ntrain.push($("#freq").val().trim());
ntrain.push($("#train-time").val().trim());

schedule.push(ntrain);
database.ref().set({
            ft: schedule
        })
     
$("#train-name").val('');
$("#dest-name").val('');
$("#train-time").val('');
$("#freq").val('');
 });
console.log(schedule);
});
