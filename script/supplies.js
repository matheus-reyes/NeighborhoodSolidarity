console.log(firebase);

firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

const requestsRef = firebase.database().ref('requests');

requestsRef.on('value', snap => { renderRequests(snap.val()) });

function renderRequests(requests) {

  console.log(requests);
}