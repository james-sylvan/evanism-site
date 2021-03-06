
function scoresLoaded() {
  $("#score-table").append("<li class=\"row\"><div class=\"col-lg-4 col-2\"><p class=\"body-text\">RANK</p></div><div class=\"col-lg-4 col-3\"><p class=\"body-text text-center\">SCORE</p></div><div class=\"col-lg-4 col-7\"><p class=\"body-text text-right\">NAME</p></div></li>");

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

    $("#score-table").append("<li class=\"row\"><div class=\"col-lg-4 col-2\"><p class=\"variable-text\">" + place + "</p></div><div class=\"col-lg-4 col-3\"><p class=\"variable-text text-center\">" + player.points + "</p></div><div class=\"col-lg-4 col-7\"><p class=\"variable-text text-right\">" + player.name + "</p></div></li>");
  }

  $("#scoreboard").show();
}

function loginChanged(user) {
  if (user) {
    // User is signed in.
    $("#login-link").text("-> CLAIM EASTER EGG <-");
    $("#login-link").css("width", "22em");
    $("#login-link").attr("href", "password.html")
    playersRef.child(user.uid).once('value').then(function(snapshot) {
      if (snapshot.exists()) {
        var username = snapshot.val().name.toUpperCase();
        username = username.replace(/ /g, '\xA0');
        $("#username").text(username);
        var userscore = "00000" + snapshot.val().points;
        userscore = userscore.substr(userscore.length-6);
        $("#userpoints").text(userscore);
      }
    });
  } else {
    // No user is signed in.
    $("#login-link").text("-> START PLAYING <-");
    $("#login-link").css("width", "19em");
    $("#login-link").attr("href", "login.html")
  }
}
