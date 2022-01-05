//sheets submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbwz37W3f4mNtO0ZIegUfQ64-u7GGzjBV1KtNZjrYbYf_IdGRhMA1MRo/exec';
const form = document.forms['clientForm'];
const formSubmitBtn = document.querySelector("#submit-form");

//bad dude protection
const extra = document.querySelector("#last-name");
const extra2 = document.querySelector("#name");
const extra3 = document.querySelector("#password");

if(formSubmitBtn) {
  //hide honeypot
  extra.style.display = "none";
  extra2.setAttribute('tabindex', "-1");

  if(!extra.value && !extra3.value){
    form.addEventListener('submit', e => {
      if(!extra.value && extra2.value === "Enter Roboname" && !extra3.value){
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
          .then(response => {
            console.log('Success!', response);
            window.location.href = "thank-you.html";
          })
          .catch(error => console.error('Error!', error.message));
      //clears form and goes to thank you page
      emailjs.sendForm('default_service', 'template_46i647i', form)
      .then(function() {
        console.log('SUCCESS!');
      }, function(error) {
        console.log('FAILED...', error);
      });
        form.reset();
        return false;
            }
        })
    }
  }

const clicker = document.querySelector("#clicker");
const constructionUpdates = document.querySelector(".construction-updates");

function handleClick(event){
  constructionUpdates.classList.toggle("hide-const-updates")
}
clicker.addEventListener('click', handleClick);


//  **For map location finder**

//for dialog
const closeBtn = document.querySelector('#close-button');
const newLat = document.querySelector('#lat');
const newLong = document.querySelector('#long');
const transferLocation = (marker) => {
  var droppedLat = marker.getPosition().lat();
  var droppedLong = marker.getPosition().lng();
  console.log(droppedLat, droppedLong);
  newLat.value = droppedLat;
  newLong.value = droppedLong;}

//for map
const yeksOne = "AIzaSyD7ibu8agqR5Ob";
const yeksTwo = "FKIDgQ-vKGuTRrclg_oI";
const reCenterMap = () => {
  var geocoder1 = new google.maps.Geocoder();
  setCenter(geocoder1);
}

//listen for open dialog button
const makeMap = () => {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + yeksOne + yeksTwo+ '&libraries=geometry,places' + '&callback=initMap';
      script.defer = true;
      // Append the 'script' element to 'head'
      document.head.appendChild(script);
      locationBtn.removeEventListener('click', console.log('done'));
      locationBtn.addEventListener('click', reCenterMap);
}
const locationBtn = document.querySelector('#geolocation');
if(locationBtn){
  locationBtn.addEventListener('click', makeMap, {once: true});
}

//get lat long from Address
var geocoder, map;
window.initMap = function() {
 var geocoder1 = new google.maps.Geocoder();
 setCenter(geocoder1);
}
function setCenter(geocoder) {
  let stAdd = document.querySelector('#st-address').value;
  let city = document.querySelector('#city').value;
  let state = document.querySelector('#state').value;
  let zip = document.querySelector('#zip').value;
  let address = (stAdd + ' ' + city + ', ' + state + ' ' + zip);
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let map = new google.maps.Map(document.getElementById('map'), {
            center: results[0].geometry.location,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
          });
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
                optimized: true
            });
            let calcLat = marker.getPosition().lat();
            let calcLong = marker.getPosition().lng();
            console.log(calcLat, calcLong, 'calculated');
            newLat.value = calcLat;
            newLong.value = calcLong;
            google.maps.event.addListener(marker, 'dragend', function(event) {
              transferLocation(marker);
              return(marker);
            });
        }else {
          console.log(status);
        }
    });
}
