firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });
const professionalsRef = firebase.database().ref('/professionals');

const form = document.querySelector('form');

function submitform() {
  const name = document.querySelector('#inputName').value;
  const area = document.querySelector('#inputArea').value;
  const details = document.querySelector('#inputDetails').value;

  professionalsRef.child(formatProfessionals(area)).push({ name, details });
  window.location.assign('http://localhost:5500/pages/services.html');

}

function formatProfessionals(input) {
  const lower = input.toLowerCase();
  const formated = lower[lower.length - 1] === 's' ? lower : lower + 's';
  return formated;
}

form.onsubmit = e => {
  e.preventDefault();
  submitform()
}