document.addEventListener('deviceready', onDeviceReady, false);

// Botones Login
let loginButton = document.getElementById("loginButton");
let googleSL = document.getElementById("googleSL");

// Inputs Login
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");

// User Token
let userToken = "";

// TEMPORAL
let skipLogin = true;

function onDeviceReady() {
    loginButton.onclick = function() {
        if (skipLogin) {
            // Change page to index.html
            window.location.href = "index.html";
        } else {
            // ajax login and more stuff
        }
    }
    
    googleSL.onclick = function() { // Chapuza but it works <-------------------------------------------------------- !!!!!
        $(".abcRioButtonContentWrapper").click();
    }
    
} 

function ajaxGet(url, query, dataType) {
    $.ajax({
        method: "GET",
        url: url + query,
        dataType: dataType,
    }).done(function(xhr) {
        console.log(xhr.satus);
    }).fail(function() {
    
    }).always(function() {
        
    });
}

function sendToast(content, duration) {
    M.toast({html: content, displayLength: duration, classes: 'rounded'});
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  