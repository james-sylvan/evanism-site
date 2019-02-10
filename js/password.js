function scoresLoaded() {

}

function loginChanged(user) {
  if (user) {
    // User is signed in.
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
  }
}

$(document).ready(function() {
  $("#submit").click(function() {
    if (firebase.auth().currentUser !== null) {
      var uid = firebase.auth().currentUser.uid;
      var key = $("#password").val();
      var eggsRef = database.ref("eggs");
      var playersRef = database.ref("players");
      var userRef = playersRef.child(uid);

      eggsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          var points = childData.points;

          if (key == childData.key) {
            userRef.once('value', function(snapshot) {
              var data = snapshot.val();
              var eggs = data.eggs;
              var newPoints = data.points + points;
              var d = new Date();
              var seconds = d.getTime() / 1000;

              if (eggs) {
                var found = false;
                eggs.forEach(function(egg) {
                  if (egg == key) {
                    found = true;
                  }
                });

                if (found) {
                  console.log("You've already found that egg");
                } else {
                  eggs.push(key);  
                  userRef.set({
                    eggs: eggs,
                    lastPointsTimestamp: seconds,
                    name: data.name,
                    points: newPoints
                  });
                  alert(childData.found);
                  window.location.href = 'welcome.html'
                }

              } else {
                eggs = [key];
                userRef.set({
                  eggs: eggs,
                  lastPointsTimestamp: seconds,
                  name: data.name,
                  points: newPoints
                });
                alert(childData.found);
                window.location.href = 'welcome.html'
              }

            });

          }

        });
      });
    } else {
      window.location.href = 'login.html'
    }
  });
});
