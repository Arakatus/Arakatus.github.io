let map, selectedMarker, infoWindow, userLocation, installPromptEvent;
let url = 'http://localhost:5000/';
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

let tasks = new Array();
let config = {
    apiKey: "AIzaSyAg29xSz_IaKpmb5bWpT9F4TC0whGO8kH4",
    authDomain: "confident-58909.firebaseapp.com",
    databaseURL: "https://confident-58909.firebaseio.com",
    projectId: "confident-58909",
    storageBucket: "confident-58909.appspot.com",
    messagingSenderId: "1076549656704"
};

firebase.initializeApp(config);

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
    getData();
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
            showHeader();
        }
    });

    //markers
    /*let marker1 = new google.maps.Marker({position: {lat: 50.454, lng: 30.523}, map: map, animation: google.maps.Animation.DROP});
    let marker2 = new google.maps.Marker({position: {lat: 50.405956, lng: 30.671791}, map: map, animation: google.maps.Animation.DROP});
    let marker3 = new google.maps.Marker({position: {lat: 52.2477331, lng: 21.0136079}, map: map, animation: google.maps.Animation.DROP});
    let marker4 = new google.maps.Marker({position: {lat: 52.215252, lng: 20.969019}, map: map, animation: google.maps.Animation.DROP});*/

    let marker;
    for (let i = 0; i < tasks.length; i++) {
        marker = new google.maps.Marker({position: {lat: tasks[i].lat, lng: tasks[i].lng}, map: map, animation: google.maps.Animation.DROP});
        marker.task = i;
        addMarkerListener(marker);
    }


    infoWindow = new google.maps.InfoWindow({
        content: addInfo()
    });

    google.maps.event.addListener(infoWindow,'closeclick',function() {
        enableMap();
        showHeader();
    });

}

function getData() {
    let taskid = 1;
    firebase.database().ref('/tasks/').once('value').then(function(snapshot) {
        //console.log(snapshot.val()task1);
        while (snapshot.val()['task' + taskid]) {
            tasks.push(snapshot.val()['task' + taskid]);
            taskid++
        }
        initMap();
    });
}

function addInfo () {
    return `
        <div class="info">
            <div>
                <div>
                    <div class="inline space-right">
                        <img src="../images/icons/testIcon60.png" alt="icon">
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
        enableInfo();
        selectedMarker = this;
        console.log(tasks[marker.task]);
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
