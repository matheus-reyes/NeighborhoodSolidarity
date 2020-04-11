firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

const form = document.querySelector('form');

form.onsubmit = e => {
  e.preventDefault();

  const name = document.querySelector('#inputName').value;
  const area = document.querySelector('#inputArea').value;
  const details = document.querySelector('#inputDetails').value;

  console.log(name, area, details);
}