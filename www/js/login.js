document.addEventListener('deviceready', onDeviceReady, false);

// Botones Login
let loginButton = document.getElementById("loginButton");
let googleSL = document.getElementById("googleSL");

// Inputs Login
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");

// User Token
let userToken = "";

// Testing
let skipLogin = true;

function onDeviceReady() {
    loginButton.onclick = function() {
        $("#loading").modal('open');
        if (skipLogin) {
            // Just for testing purposes
            window.location.href = "index.html";
        } else { 
            ajaxGetLogin("https://", "/api?email=" +emailField.value + "&password=" + CryptoJS.SHA256(passwordField.value).toString(), "text");
        }
    }
} 

function ajaxGetLogin(url, query, dataType) {
    $.ajax({
        method: "GET",
        url: url + query,
        dataType: dataType,
    }).done(function(xhr) {
        console.log(xhr.status);
        window.location.href = "index.html";
    }).fail(function() {
        sendToast("Usuari o contrasenya err" + "\u00F2" + "nia...");
        $("#loading").modal('close');
    }).always(function() {
        $("#loading").modal('close');
    });
}

function sendToast(content, duration) {
    M.toast({html: content, displayLength: duration, classes: 'rounded'});
}
  