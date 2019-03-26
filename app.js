let url = 'https://arakatus.github.io/';
//http://localhost:5000/

window.addEventListener('load', async e => {
    if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
            console.log("Active service worker found, no need to register");
        } else {
            // Register the service worker
            navigator.serviceWorker.register("sw.js", {
                scope: "./"
            }).then(function (reg) {
                console.log("Service worker has been registered for scope: " + reg.scope);
            });
        }
    }
    document.location = 'Screens/login.html'
    //checkCookie();
});

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

function checkCookie() {
    let email = getCookie("email");
    if (email !== "") {
        document.location.href = url + 'Screens/main';
    } else {
        document.location.href = url + 'Screens/login';
    }
}
