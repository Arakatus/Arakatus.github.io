const header = document.getElementById('header');
let map;
let selectedMarker;
let infoWindow;

window.addEventListener('load', async e => {
    if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
            console.log("Active service worker found, no need to register");
        } else {
            // Register the service worker
            navigator.serviceWorker
                .register("sw.js", {
                    scope: "./"
                })
                .then(function (reg) {
                    console.log("Service worker has been registered for scope: " + reg.scope);
                });
        }
    }
    initMap();
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13, center: {lat: 52.237049, lng: 21.017532},
        gestureHandling: "greedy",
        minZoom: 1,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false
    });

    //markers
    var marker1 = new google.maps.Marker({position: {lat: 50.454, lng: 30.523}, map: map, animation: google.maps.Animation.DROP});
    var marker2 = new google.maps.Marker({position: {lat: 50.405956, lng: 30.671791}, map: map, animation: google.maps.Animation.DROP});
    var marker3 = new google.maps.Marker({position: {lat: 52.2477331, lng: 21.0136079}, map: map, animation: google.maps.Animation.DROP});
    var marker4 = new google.maps.Marker({position: {lat: 52.215252, lng: 20.969019}, map: map, animation: google.maps.Animation.DROP});

    infoWindow = new google.maps.InfoWindow({
        content: addInfo()
    });
    google.maps.event.addListener(infoWindow,'closeclick',function(){
        console.log('test')
    });

    addMarkerListener(marker1);
    addMarkerListener(marker2);
    addMarkerListener(marker3);
    addMarkerListener(marker4);
}

function clearHeader () {
    header.innerHTML = `
        <div></div>
    `;
}

function addInfo () {
    return `
        <div id="info">
            <h1>Nazwa sklepu</h1>
            <h2>Zabka</h2>
            <hr>
            <h1>Adres</h1>
            <h2>Mazowiecka 8, Warszawa</h2>
            <hr>
            <h1>Wynagrodzenie</h1>
            <h2>25 zł</h2>
            <hr>
            <h1>Instrukcja zadania<h1>
            <h2>Tło biznesowe</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.</h3>
            <hr>
        </div>
        <br/>
        <button class="small blue button" onclick="bookTask()">WYKONAJ ZADANIE</button>
    `;
}

function bookTask () {
    infoWindow.close();
    map.setCenter(selectedMarker.getPosition());
    map.setZoom(14);
    alert('Zadanie zostalo zarezerwowane!');
}

function addMarkerListener(marker) {
    marker.addListener('click', function() {
        clearHeader();
        map.setZoom(14);
        selectedMarker = this;
        infoWindow.open(map, this);
    });
}