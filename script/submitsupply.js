firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

const form = document.querySelector('form');

const data = JSON.parse(localStorage.getItem('data'));
console.log(data.results)

/*
form.onsubmit = e => {
  const adress = document.getElementById("inputAdress").value;

  e.preventDefault();
  test(adress)
}



async function test (input) {
  const apikey = '&key=AIzaSyAmMhKrT7FzP2csp881g__Aq47mOP1uWaM';
  const adress = input.replace(' ', '+');
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + adress + apikey)
  const data = await response.json();
  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);
}



*/