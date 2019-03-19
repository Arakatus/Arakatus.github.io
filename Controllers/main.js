let map, selectedMarker, infoWindow, userLocation, installPromptEvent;
let url = 'https://arakatus.github.io/';
let infoWindowOpened = false;
let mapOptionsNormal = {
    minZoom: 2,
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
    checkCookie();
});


function initMap() {
    let element = document.querySelector("#info");
    element.innerHTML = addInfo();
    element.style.display = 'none';
    //getUserLocation();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15, center: {lat: 52.215252, lng: 20.969019},
        gestureHandling: "greedy",
        minZoom: 2,
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
        //showHeader();
    });

}

function getData() {
    let taskid = 1;
    firebase.database().ref('/tasks/').once('value').then(function(snapshot) {
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
                        <h2 id="nameInfo" class="not-bold"></h2>
                    </div>
                </div>
                <hr>
                <h1>Adres</h1>
                <h2 id="addressInfo" class="not-bold"></h2>
                <hr>
                <h1>Wynagrodzenie</h1>
                <h2 id="priceInfo" class="not-bold"></h2>
                <hr>
                <h1>Instrukcja zadania<h1>
                <h2 class="not-bold">Szczegółowy opis</h2>
                <h3 id="descInfo" class="not-bold"></h3>
                <hr>
            </div>
            <br/>
            <button class="small blue button" onclick="bookTask()">WYKONAJ ZADANIE</button>
        </div>
    `;
}

function fillInfo (task) {
    let element = document.querySelector("#nameInfo");
    element.innerHTML = task.place;
    element = document.querySelector("#addressInfo");
    element.innerHTML = task.adress;
    element = document.querySelector("#priceInfo");
    element.innerHTML = task.stake;
    element = document.querySelector("#descInfo");
    element.innerHTML = task.instruction;
}

function bookTask () {
    console.log(selectedMarker.task);
    enableMap();
    //showHeader();
    infoWindow.close();
    map.setCenter(selectedMarker.getPosition());
    disableInfo();
    firebase.database().ref('/tasks/task' + selectedMarker.task + '/').set({
        booked: true
    });
    alert('Zadanie zostalo zarezerwowane!');
}

function addMarkerListener(marker) {
    marker.addListener('click', function() {
        disableMap();
        //clearHeader();
        enableInfo(tasks[marker.task]);
        selectedMarker = this;
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

function enableInfo (task) {
    infoWindowOpened = true;
    let element = document.querySelector("#info");
    fillInfo(task);
    element.style.display = '';
}

function disableMap () {
    map.setOptions(mapOptionsDisabled);
}

function enableMap () {
    map.setOptions(mapOptionsNormal);
}

function checkCookie() {
    let email = getCookie("email");
    if (email !== "") {
        console.log('test1');
        getData();
    } else {
        console.log('test2');
        document.location.href = url + 'Screens/login';
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

