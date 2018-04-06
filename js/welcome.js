var ref = database.ref('players')
var scoreboard = []

ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    var index = 0;
    for (var count in scoreboard) {
      index = count;
      var player = scoreboard[count];
      if (player.points == childData.points) {
        if (player.lastPointsTimestamp < childData.lastPointsTimestamp) {
          continue;
        } else {
          break;
        }
      } else if (player.points > childData.points) {
        continue;
      } else {
        break;
      }
    }
    scoreboard.splice(index, 0, childData);
  });

  $("#score-table").append("<li><div class=\"first-third\"><p class=\"body-text\">RANK</p></div><div class=\"second-third\"><p class=\"body-text\" style=\"margin: auto; width: 5em;\">SCORE</p></div><div class=\"third-third\"><p class=\"body-text\" style=\"text-align: right;\">NAME</p></div></li>");
  
  var index;
  for (index = 0; index < 111; index++) {
    if (index >= scoreboard.length) {
      break;
    }
    var player = scoreboard[index];
    $("#score-table").append("<li><div class=\"first-third\"><p class=\"variable-text\">" + index + "ST</p></div><div class=\"second-third\"><p class=\"variable-text\" style=\"margin: auto; width: 1em;\">" + player.points + "</p></div><div class=\"third-third\"><p class=\"variable-text\" style=\"text-align: right;\">" + player.name + "</p></div></li>");
  }

  $("#scoreboard").show();
});

