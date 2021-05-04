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
  