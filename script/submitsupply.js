firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

const form = document.querySelector('form');
const adress = document.getElementById("inputAdress").value;

form.onsubmit = e => {
  e.preventDefault();
  console.log(adress)
  test(adress)
}



async function test (input) {
  const apikey = 'AIzaSyAmMhKrT7FzP2csp881g__Aq47mOP1uWaM';
  const adress = input.replace(' ', '+');
  console.log(input);return;
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + adress + apikey)
  const data = await response.json();
  console.log(data);
}

