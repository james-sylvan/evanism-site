var players = database.ref("players");
var userId = ""

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    userId = user.uid;
  } else {
    // No user is signed in.
    console.log("no user");
    window.location.href = "welcome.html"
  }
});

$(document).ready(function() {
  $("#submit").click(function() {
    var name = $("#name").val();

    if (name == "") {
      return;
    }

    if (userId != "") {
      var updates = {};
      updates["/players/" + userId + "/name"] = name;
      database.ref().update(updates);

      window.location.href = "welcome.html"
    }
  });
});
