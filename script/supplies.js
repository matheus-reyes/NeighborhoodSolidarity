firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

navigator.geolocation.getCurrentPosition(async ({ coords }) => { 
  await localStorage.setItem('latitude', coords.latitude);
  await localStorage.setItem('longitude', coords.longitude);
});

const currentCity = 'saopaulo';

const requestsRef = firebase.database().ref(`requests/${currentCity}`);
requestsRef.on('value', snap => { renderRequests(snap.val()) });

function getDistanceBetweenCurrentUserAndOther(position) {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');

  const distance = getDistanceFromLatLonInMeters({
    lat: latitude, lng: longitude
  }, {
    lat: position.latitude, lng: position.longitude
  }) / 1000;

  return distance.toFixed(1) + ' Kilometers'
}

function getDistanceFromLatLonInMeters(position1, position2) {
  "use strict";
  var deg2rad = function (deg) { return deg * (Math.PI / 180); },
      R = 6371,
      dLat = deg2rad(position2.lat - position1.lat),
      dLng = deg2rad(position2.lng - position1.lng),
      a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(deg2rad(position1.lat))
          * Math.cos(deg2rad(position1.lat))
          * Math.sin(dLng / 2) * Math.sin(dLng / 2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return ((R * c *1000).toFixed());
}

function createCardElement(data) {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');

    const firstCol = document.createElement('div');
    firstCol.setAttribute('class', 'col-lg-4 col-md-4 col-sm-12 col-xs-12 text');

      const name = document.createElement('p');
      name.setAttribute('class', 'body-text-p');
      name.appendChild(document.createTextNode(data.name))
      
      const distance = document.createElement('p');
      distance.setAttribute('class', 'body-text-p');
      distance.appendChild(document.createTextNode(data.distance))

      const priority = document.createElement('p');
      priority.setAttribute('class', 'body-text-p');
      priority.appendChild(document.createTextNode(data.priority))

    firstCol.appendChild(name);
    firstCol.appendChild(distance);
    firstCol.appendChild(priority);
  
  row.appendChild(firstCol);

    const secondCol = document.createElement('div');
    secondCol.setAttribute('class', 'col-lg-4 col-md-4 col-sm-12 col-xs-12 text text-center');

      const itens = document.createElement('p');
      itens.setAttribute('class', 'body-text-p');
      for(const item in data.itens) {
        itens.appendChild(document.createTextNode(`${data.itens[item]} - ${item}`));
        itens.appendChild(document.createElement('br'));
      }

    secondCol.appendChild(itens);

  row.appendChild(secondCol);  

    const thridCol = document.createElement('div');
    thridCol.setAttribute('class', 'col-lg-4 col-md-4 col-sm-12 col-xs-12 text text-right');

      const button = document.createElement('button');
      button.setAttribute('class', 'botao');
      button.setAttribute('id', 'botao-lista')
      button.appendChild(document.createTextNode('Accept Request'));

    thridCol.appendChild(button);
  
  row.appendChild(thridCol);  
  
  return row;
}

function addRequestOnList(data) {
  const container = document.querySelector('#listrequest');
  const card = createCardElement(data);
  container.appendChild(card);
}

function clearRequestList() {
  const container = document.querySelector('#listrequest');
  container.innerHTML = '';
}

function renderRequests(requests) {
  clearRequestList();
  for(const requestID in requests) {
    const request = requests[requestID];
    const data = { itens: request.itens };

    const userRef = firebase.database().ref(`users/${request.userrequest}`);
    userRef.once('value', snap => {
      const user = snap.val();
      
      data.name = user.name;
      data.distance = getDistanceBetweenCurrentUserAndOther(user.location);
      user.riskgroup ? data.priority = 'High Priority' : data.priority = 'Low Priority';

      addRequestOnList(data); 
    })
  }
}