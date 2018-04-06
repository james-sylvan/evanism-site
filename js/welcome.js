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

  var first = scoreboard[0];
  var second = scoreboard[1];
  var third = scoreboard[2];
  var fourth = scoreboard[3];
  var fifth = scoreboard[4];

  $("#score-first").text(first.points);
  $("#name-first").text(first.name);
  $("#score-second").text(second.points);
  $("#name-second").text(second.name);
  $("#score-third").text(third.points);
  $("#name-third").text(third.name);
  $("#score-fourth").text(fourth.points);
  $("#name-fourth").text(fourth.name);
  $("#score-fifth").text(fifth.points);
  $("#name-fifth").text(fifth.name);

  $("#scoreboard").show();
});

