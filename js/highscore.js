var ref = database.ref('players')

// Set High Scores
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

  var highPlayer = scoreboard[0];
  var s = "00000" + highPlayer.points;
  var highScore = s.substr(s.length-6);
  $("#high-score-points").text(highScore);

  scoresLoaded();
});

