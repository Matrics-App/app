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
        if (skipLogin) {
            if (validateFieldsLogin()) {
                $("#loading").modal('open');
                window.location.href = "index.html";
            } else {
                sendToast("Els camps Email i Contrasenya no poden estar buits.", 3000);
            }
        } else {
            if (validateFieldsLogin()) {
                $("#loading").modal('open');
                ajaxLogin("https://", "/api?email=" +emailField.value + "&password=" + CryptoJS.SHA256(passwordField.value).toString(), "text");
            } else {
                sendToast("Els camps Email i Contrasenya no poden estar buits.", 3000);
            }
        }
    }
} 

function validateFieldsLogin() {
    return (!emailField.value || emailField.value.trim() === "" || !passwordField.value || passwordField.value.trim() === "") ? false : true;
}

function ajaxLogin(url, query, dataType) {
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
    M.toast({html: content, displayLength: duration, classes: 'rounded blue-gradient'});
}
  