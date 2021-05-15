document.addEventListener('deviceready', onDeviceReady, false);

// Botones Login
let loginButton = document.getElementById("loginButton");
let googleSL = document.getElementById("googleSL");

// Inputs Login
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");

// Testing
let skipLogin = true;

function onDeviceReady() {
    loginButton.onclick = function() {
        if (skipLogin) {
                window.location.href = "index.html";
        } else {
            if (validateFieldsLogin()) {
                $("#loading").modal('open');
                ajaxLogin();
            } else {
                sendToast("Els camps Email i Contrasenya no poden estar buits.");
            }
        }
    }
} 

function validateFieldsLogin() {
    return (!emailField.value || emailField.value.trim() === "" || !passwordField.value || passwordField.value.trim() === "") ? false : true;
}

function ajaxLogin() {
    var formData = new FormData;
    formData.append("email", emailField.value);
    formData.append("password", passwordField.value.toString());

    $.ajax({
        url: "http://34.203.46.101:8000/api/token",
        type: "POST",
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    }).done(function(xhr) {
        if (xhr.Token) {
            localStorage.setItem("token",xhr.Token);
            window.location.href = "index.html";
        }else{
            sendToast("L\'email o la contrasenya no s\u00F3n correctes.");
        }
    }).error(function() {
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
        $("#loading").modal('close');
    }).always(function() {
        $("#loading").modal('close');
    });
}

function sendToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded red-gradient'});
}
  