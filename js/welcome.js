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
      if (player.points >= childData.points) {
        continue;
      } else {
        break;
      }
    }
    scoreboard.splice(index, 0, childData);
  });

  console.log(scoreboard);
});

