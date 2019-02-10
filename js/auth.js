
// Set user logged in
firebase.auth().onAuthStateChanged(function(user) {
  loginChanged(user);
});

