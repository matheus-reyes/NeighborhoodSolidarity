firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });
const usersRef = firebase.database().ref('/users');

const form = document.querySelector('form');

const data = JSON.parse(localStorage.getItem('data'));
console.log(data.results[0])


form.onsubmit = e => {
  e.preventDefault();

  const name = document.getElementById("inputName").value;
  const adress = document.getElementById("inputAdress").value;
  const supply = document.getElementById("inputSupply").value;

  
  console.log(name, adress, supply)
  // test(adress)
}



async function test (input) {
  const apikey = '&key=AIzaSyAmMhKrT7FzP2csp881g__Aq47mOP1uWaM';
  const adress = input.replace(' ', '+');
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + adress + apikey)
  const data = await response.json();
  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);
}


