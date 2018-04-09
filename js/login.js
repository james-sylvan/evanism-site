var toggle = false;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

var players = database.ref("players");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    console.log(user.uid);

    players.child(user.uid).once('value').then(function(snapshot) {
      if (snapshot.val() !== null) {
        // User logged in
        window.location.href = "http://111interactiveentertainment.com/welcome.html"
      } else {
        // User signed up
        players.child(user.uid).set({
          name: user.email,
          points: 0
        });
        window.location.href = "http://111interactiveentertainment.com/name.html"
      }
    });
  } else {
    // No user is signed in.
    console.log("no user");
  }
});

$(document).ready(function() {
  $("#toggle").click(function() {
    console.log("click");
    if (toggle) {
      $(".sign-up-form").hide();
      $(".login-form").show();
      $("#submit").text("LOGIN");
      $("#submit").css("width", "5em");
      $("#toggle").text("SIGN UP?");
      $("#toggle").css("width", "8em");
    } else {
      $(".login-form").hide();
      $(".sign-up-form").show();
      $("#submit").text("SIGN UP");
      $("#submit").css("width", "7em");
      $("#toggle").text("LOGIN?");
      $("#toggle").css("width", "6em");
    }
    toggle = !toggle
  });

  $("#submit").click(function() {
    if (toggle) {
      // Sign up
      var email = $("#email").val();
      var password = $("#password").val();
      var repeat = $("#repeat-password").val();

      if (!validateEmail(email)) {
        $("#error").text("CHOOSE A VALID EMAIL");
        $("#error").css("width", "20em");
        $("#error").show();
        return;
      }

      if (password != repeat) {
        $("#error").text("YOUR PASSWORDS MUST MATCH");
        $("#error").css("width", "25em");
        $("#error").show();
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        $("#error").text(error.message);
        var width = error.message.length + "em"
        $("#error").css("width", width);
        $("#error").show();
      });
    } else {
      // Login
      var email = $("#login-email").val();
      var password = $("#login-password").val();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.message);
        $("#error").text("LOGIN FAILED");
        $("#error").css("width", "12em");
        $("#error").show();
      }); 
    }
  });

  var provider = new firebase.auth.GoogleAuthProvider();

  $("#google-sign-in").click(function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      players.child(user.uid).once('value').then(function(snapshot) {
        if (snapshot.val() !== null) {
          // User logged in
          window.location.href = "http://111interactiveentertainment.com/welcome.html"
        } else {
          // User signed up
          players.child(user.uid).set({
            name: user.displayName,
            points: 0
          });
          window.location.href = "http://111interactiveentertainment.com/welcome.html"
        }
      });

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage);
      alert(errorMessage);
    });
  });

});
