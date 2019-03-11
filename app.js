let map, selectedMarker, infoWindow, userLocation, installPromptEvent;
let infoWindowOpened = false;
let mapOptionsNormal = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    draggable: true,
    scrollwheel: true,
    disableDoubleClickZoom: false
};
let mapOptionsDisabled = {
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
};

/////test///////
//function that gets the location and returns it
/*function getUserLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geo Location not supported by browser");
    }
}
//function that retrieves the position
function showPosition(position) {
    userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
}*/
////test/////////

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
    let element = document.querySelector("#info");
    element.innerHTML = addInfo();
    element.style.display = 'none';
    //getUserLocation();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, center: {lat: 52.215252, lng: 20.969019},
        gestureHandling: "greedy",
        minZoom: 1,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        clickableIcons: false
    });

    google.maps.event.addListener(map, 'click', function(event) {
        if (infoWindowOpened) {
            disableInfo();
            enableMap();
        }
    });

    //markers
    var marker1 = new google.maps.Marker({position: {lat: 50.454, lng: 30.523}, map: map, animation: google.maps.Animation.DROP});
    var marker2 = new google.maps.Marker({position: {lat: 50.405956, lng: 30.671791}, map: map, animation: google.maps.Animation.DROP});
    var marker3 = new google.maps.Marker({position: {lat: 52.2477331, lng: 21.0136079}, map: map, animation: google.maps.Animation.DROP});
    var marker4 = new google.maps.Marker({position: {lat: 52.215252, lng: 20.969019}, map: map, animation: google.maps.Animation.DROP});

    infoWindow = new google.maps.InfoWindow({
        content: addInfo()
    });

    google.maps.event.addListener(infoWindow,'closeclick',function() {
        enableMap();
        showHeader();
    });

    addMarkerListener(marker1);
    addMarkerListener(marker2);
    addMarkerListener(marker3);
    addMarkerListener(marker4);
}

function addInfo () {
    return `
        <div class="info">
            <div>
                <div>
                    <div class="inline space-right">
                        <img src="images/icons/testIcon60.png" alt="icon">
                    </div>
                    <div class="inline">
                        <h1>Nazwa sklepu</h1>
                        <h2 class="not-bold">Zabka</h2>
                    </div>
                </div>
                <hr>
                <h1>Adres</h1>
                <h2 class="not-bold">Mazowiecka 8, Warszawa</h2>
                <hr>
                <h1>Wynagrodzenie</h1>
                <h2 class="not-bold">25 zł</h2>
                <hr>
                <h1>Instrukcja zadania<h1>
                <h2 class="not-bold">Szczegółowy opis</h2>
                <h3 class="not-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.</h3>
                <hr>
            </div>
            <br/>
            <button class="small blue button" onclick="bookTask()">WYKONAJ ZADANIE</button>
        </div>
    `;
}

function bookTask () {
    enableMap();
    showHeader();
    infoWindow.close();
    map.setCenter(selectedMarker.getPosition());
    disableInfo();
    alert('Zadanie zostalo zarezerwowane!');
}

function addMarkerListener(marker) {
    marker.addListener('click', function() {
        disableMap();
        clearHeader();
        selectedMarker = this;
        //infoWindow.open(map, this);
        enableInfo();
    });
}

function clearHeader () {
    let element = document.querySelector("#helpText");
    element.style.display = 'none';
}

function showHeader () {
    let element = document.querySelector("#helpText");
    element.style.display = '';
}

function disableInfo () {
    infoWindowOpened = false;
    let element = document.querySelector("#info");
    element.style.display = 'none';
}

function enableInfo () {
    infoWindowOpened = true;
    let element = document.querySelector("#info");
    element.style.display = '';
}

function disableMap () {
    map.setOptions(mapOptionsDisabled);
}

function enableMap () {
    map.setOptions(mapOptionsNormal);
}
