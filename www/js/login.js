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
let skipLogin = false;

function onDeviceReady() {
    loginButton.onclick = function() {
        $("#loading").modal('open');
        if (skipLogin) {
            // Just for testing purposes
            window.location.href = "index.html";
        } else { 
            ajaxGetLogin("http://18.234.231.223:8000", "/api/token?email=" +emailField.value + "&password=" + CryptoJS.SHA256(passwordField.value).toString(), "text");
        }
    }
} 

function ajaxGetLogin(url, query, dataType) {
    
    console.log("patata");

    var formData = new FormData;
    formData.append("email", emailField.value);
    formData.append("password", CryptoJS.SHA256(passwordField.value).toString());

    $.ajax({
        url: "http://18.234.231.223:8000/api/token",
        type: "POST",
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    }).done(function(xhr) {
        console.log(xhr);
        window.location.href = "index.html";
    }).error(function() {
        sendToast("Usuari o contrasenya err" + "\u00F2" + "nia...");
        $("#loading").modal('close');
    }).always(function() {
        $("#loading").modal('close');
    });
}

function sendToast(content, duration) {
    M.toast({html: content, displayLength: duration, classes: 'rounded'});
}
  