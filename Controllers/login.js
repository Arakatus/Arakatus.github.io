//Firebase configuration details
let signUpMode = false;

let config = {
    apiKey: "AIzaSyANhJ4ZqyMuzupRLM4BpFyKR9NluWwxmPU",
    authDomain: "hustleapp-d7c9f.firebaseapp.com",
    databaseURL: "https://hustleapp-d7c9f.firebaseio.com",
    projectId: "hustleapp-d7c9f",
    storageBucket: "hustleapp-d7c9f.appspot.com",
    messagingSenderId: "854291696423"
};

//Firebase initialization
firebase.initializeApp(config);

document.getElementById("repeatedPassword").style.display = "none";

//credentials variables
var email, password, repeatedPassword;

document.querySelector('.signIn-btn').addEventListener('click', function() {
    console.log('sign in');
    getCredentials();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            alert(error.message);
            return;
        }).then(function(result) {
            console.log(result)
            document.location.href = 'main.html';
        });
});

document.querySelector('.signUp-btn').addEventListener('click', function() {
    if (signUpMode) {
        console.log('signup');
        getCredentials();
        if (repeatedPassword !== password) {
            alert('Provided passwords are different');
            return;
        } 
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            alert(error.message);
            return;
        }).then(function(result){
            alert("Your account has been successfuly created, please sign in with provided credentials.");
            document.getElementById("repeatedPassword").style.display = "none";
            document.getElementById("password").value = "";
        });
    } else {
        signUpMode = true;
        document.getElementById("repeatedPassword").style.display = "block";
    }
    
});

document.querySelector('.remind-btn').addEventListener('click', function() {
    getCredentials();
});

function getCredentials() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    repeatedPassword = document.getElementById("repeatedPassword").value;
}








// let url = 'https://arakatus.github.io/';
// function submit () {
//     let providedEmail = document.getElementById("email").value;
//     if (providedEmail != null && providedEmail !== '') {
//         if (validateEmail(providedEmail)) {
//             setCookie("email", providedEmail, 365);
//             //checkCookie();
//         } else {
//             alert('Invalid Email!');
//         }
//     } else {
//         alert('Invalid Email!');
//     }
// }

// function validateEmail(email) {
//     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// function setCookie(cname, cvalue, exdays) {
//     let d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     let name = cname + "=";
//     let ca = document.cookie.split(';');
//     for(let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     let email = getCookie("email");
//     if (email !== "") {
//         document.location.href = url + 'Screens/main';
//     }
// }