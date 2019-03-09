const main = document.querySelector('main');
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
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    });
    var opt = { minZoom: 1};
    map.setOptions(opt);

    //markers
    var marker = new google.maps.Marker({position: {lat: 50.454, lng: 30.523}, map: map, animation: google.maps.Animation.DROP});
    var marker2 = new google.maps.Marker({position: {lat: 50.405956, lng: 30.671791}, map: map, animation: google.maps.Animation.DROP});
    var marker3 = new google.maps.Marker({position: {lat: 52.2477331, lng: 21.0136079}, map: map, animation: google.maps.Animation.DROP});
    var marker4 = new google.maps.Marker({position: {lat: 52.215252, lng: 20.969019}, map: map, animation: google.maps.Animation.DROP});
    var markers = [];
    markers.push(marker);
    markers.push(marker2);
    markers.push(marker3);
    markers.push(marker4);
    infoWindow = new google.maps.InfoWindow({
        content: addInfo()
    });
    for (let i = 0; i < markers.length; ++i) {
        markers[i].addListener('click', function() {
            map.setZoom(14);
            selectedMarker = markers[i];
            /*main.innerHTML = addInfo();
            document.getElementById('info').scrollIntoView();*/
            infoWindow.open(map, markers[i]);
        });
    }
}

function addInfo () {
    return `
        <div id="info" class>
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
    alert('Zadanie zostalo zarezerwowane!');
}