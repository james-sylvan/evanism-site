
function scoresLoaded() {
  $("#score-table").append("<li><div class=\"first-third\"><p class=\"body-text\">RANK</p></div><div class=\"second-third\"><p class=\"body-text\" style=\"margin: auto; width: 5em;\">SCORE</p></div><div class=\"third-third\"><p class=\"body-text\" style=\"text-align: right;\">NAME</p></div></li>");

  var index;
  for (index = 0; index < 111; index++) {
    if (index >= scoreboard.length) {
      break;
    }
    var player = scoreboard[index];
    var place = "";
    var i = index + 1;
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      place = i + "ST";
    } else if (j == 2 && k != 12) {
      place = i + "ND";
    } else if (j == 3 && k != 13) {
      place = i + "RD";
    } else {
      place = i + "TH";
    }

    $("#score-table").append("<li><div class=\"first-third\"><p class=\"variable-text\">" + place + "</p></div><div class=\"second-third\"><p class=\"variable-text\" style=\"margin: auto; width: 1em;\">" + player.points + "</p></div><div class=\"third-third\"><p class=\"variable-text\" style=\"text-align: right;\">" + player.name + "</p></div></li>");
  }

  $("#scoreboard").show();
}

// Set user logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    $("#login-link").text("-> CLAIM EASTER EGG <-");
    $("#login-link").css("width", "22em");
    $("#login-link").attr("href", "password.html")
  } else {
    // No user is signed in.
    console.log("no user");
    $("#login-link").text("-> START PLAYING <-");
    $("#login-link").css("width", "19em");
    $("#login-link").attr("href", "login.html")
  }
});

