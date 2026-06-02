// Uses user geolocation in order to pinpoint where they currently are
function getLocation() {
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
   } else {
    XMLDocument.innerHTML = "Geolocation is not supported by this broswer type."
   }
}

function success(position) {
    XMLDocument.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function error() {
    alert("Sorry, no position available.");
}