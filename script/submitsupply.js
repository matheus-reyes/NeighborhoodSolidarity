firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });
const usersRef = firebase.database().ref('/users');
const requestsRef = firebase.database().ref('/requests');

const form = document.querySelector('form');

form.onsubmit = e => {
  e.preventDefault();

  const adress = document.getElementById("inputAdress").value;
  const supply = document.getElementById("inputSupply").value;
  const itens = supply.replace(/[0-9\,]/g, '').split(' ').filter(item => (item.length > 2));

  if(itens.length === 0) {
    alert('error');
    return;
  }

  getDataAdress(adress).then(
    response => {
      setDatabase(response);
    },
    error => {
      console.log(error);
    }
  );
}

function setDatabase(dataAdress) {
  const supply = document.getElementById("inputSupply").value;
  const itens = supply.replace(/[0-9\,]/g, '').split(' ').filter(item => (item.length > 2));

  
  const result = dataAdress.results[0];
  const region = result.address_components[result.address_components.length - 3].short_name;

  const name = document.getElementById("inputName").value;
  const location = { latitude: result.geometry.location.lat, longitude: result.geometry.location.lng };
  const formatedAdress = result.formatted_address;
  const riskGroup = false;

  const user = usersRef.push({
    adress: formatedAdress,
    location,
    name,
    riskGroup,
  });
  
  const itensToRequest = {}
  for(const item of itens) {
    itensToRequest[item] = Math.floor((Math.random() * 5) + 1);
  }

  const userID = user.key;
  
  requestsRef.child(region.replace(' ', '_')).push({
    itens: itensToRequest,
    userrequest: userID
  });

  window.location.assign('http://localhost:5500/pages/supplies.html');
}

async function getDataAdress (input) {
  const apikey = '&key=AIzaSyAmMhKrT7FzP2csp881g__Aq47mOP1uWaM';
  const adress = input.replace(' ', '+');
  const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + adress + apikey)
  const data = await response.json();
  return data
}


