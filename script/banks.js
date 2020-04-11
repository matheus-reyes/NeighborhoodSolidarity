firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });

const busyRef = firebase.database().ref('/banks');
busyRef.once('value', snap => {
  const places = snap.val();
  for(const place in places) {
    showPlace(places[place]);
  }
  startAnimation();
})

function getAverage(place, hour) {
  let average = 0;
  for(let i = 0; i < 7; i++) {
    average += place.populartimes[i].data[hour]/7;
  }
  return Math.floor(average);
}

function showPlace(place) {
  const sectionElement = `
    <section>
      <article class="align-self-center bg-white rounded">
        <div id="container" class="container">
          <div class="row shadow-lg p-3 mb-5">
            <div class="offset-lg-1 offset-md-1 col-lg-5 col-md-5 col-sm-12 col-xs-12 text">
              <h2 class="titulo-grafico text-center"> ${place.name} </h2>
              <div class="holder">
                <p>Address: ${place.address}</p> 
                <p>Rating: ${place.rating}</p>
                <p>Phone Number: ${place.international_phone_number}</p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>

            <div class="offset-lg-1 offset-md-1 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <h2 class="titulo-grafico text-center"> BUSIEST HOURS </h2> 
                <div class="bar" data-percent="${getAverage(place, 6)}"><span class="label">6:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 7)}%"><span class="label second">7:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 8)}%"><span class="label">8:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 9)}%"><span class="label second">9:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 10)}%"><span class="label">10:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 11)}%"><span class="label second">11:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 12)}%"><span class="label ">12:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 13)}%"><span class="label second">13:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 14)}%"><span class="label">14:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 15)}%"><span class="label second">15:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 16)}%"><span class="label">16:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 17)}%"><span class="label second">17:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 18)}%"><span class="label">18:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 19)}%"><span class="label second">19:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 20)}%"><span class="label">20:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 21)}%"><span class="label second">21:00h</span></div>
                <div class="bar" data-percent="${getAverage(place, 22)}%"><span class="label">22:00h</span></div>
            </div>
          </div>
        </div>
      </article>
    </section>
  `;

  document.querySelector('#section').innerHTML += sectionElement;
}