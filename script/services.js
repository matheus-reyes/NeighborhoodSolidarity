firebase.initializeApp({ databaseURL: "https://neighborhood-9060d.firebaseio.com/" });
const professionalsRef = firebase.database().ref('/professionals');
professionalsRef.once('value', snap => {
  const areas = snap.val();
  for(const area in areas) {
    const areaRef = firebase.database().ref(`/professionals/${area}`); 
    areaRef.once('value', snap => {
      const professionals = snap.val();
      for(const professional in professionals) {
        const { name, details } = professionals[professional];
        const ShowElement = `
          <article class="shadow-lg p-3 mb-5 bg-white rounded">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text container">
                  <div class="row centraliza">
                      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 text">
                          <p class="body-text-p"> Name: ${name} </p>
                          <p class="body-text-p"> Area: ${area} </p>
                          <p class="body-text-p"> ${details} </p>
                      </div>
                      <div class="centraliza">
                          <button class="botao-lista botao"> Make an appointment </button>    
                      </div>     
                  </div>
              </div>
          </article>
        `
        const section = document.querySelector('#listprofessionals');
        section.innerHTML += ShowElement;
      }
    })
  }
})

