firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

async function test () {
  const adress = '1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAmMhKrT7FzP2csp881g__Aq47mOP1uWaM';
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + adress)
  const data = await response.json();
  console.log(data);
}

test();