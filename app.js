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
    checkCookie();
});

function submit () {
    let providedEmail = document.getElementById("email").value;
    if (providedEmail != null && providedEmail !== '') {
        if (validateEmail(providedEmail)) {
            setCookie("email", providedEmail, 365);
            checkCookie();
        } else {
            alert('Invalid Email!')
        }
    }
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function checkCookie() {
    let email = getCookie("email");
    if (email !== "") {
        document.location.href = url + 'Screens/main';
    }
}
