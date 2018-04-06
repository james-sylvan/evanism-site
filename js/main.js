// Initialize Firebase
var config = {
  apiKey: "AIzaSyAvPNl7O3hQOowfKlrKbf-PLmJdvPNxMs8",
  authDomain: "one-eleven-site.firebaseapp.com",
  databaseURL: "https://one-eleven-site.firebaseio.com",
  projectId: "one-eleven-site",
  storageBucket: "one-eleven-site.appspot.com",
  messagingSenderId: "304848620295"
};

firebase.initializeApp(config);

var database = firebase.database();
var playersRef = database.ref('players');

/*
var playersData = {
  "Jumah Petrisin": 1,
  "Al": 9,
  "Kyle Petseluy": 2,
  "Jaraxxus Christ": 1,
  "Chaos Gamer": 7,
  "Hoola Hoops": 2,
  "Debbie Cakes": 1,
  "Adam Green": 9,
  "TheStonerKoala": 1,
  "Luvanani": 4,
  "Isaac The Great": 1,
  "David Of Sheild": 1,
  "Lotta Bjorkman": 1,
  "Jake Wilber": 1,
  "Atlas Silver": 1,
  "Katy Thunder": 1,
  "Chud Fucksworth": 9,
  "Bojinda": 8,
  "B]": 3,
  "BBatz": 9,
  "SooP": 3,
  "BatmanGFYS": 4
};

for (var key in playersData) {
  var ref = playersRef.push();
  ref.set({
    "name": key,
    "points": playersData[key]
  });
}
*/
