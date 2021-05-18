document.addEventListener('deviceready', onDeviceReady, false);

// Botones Login
let loginButton = document.getElementById("loginButton");
let googleSL = document.getElementById("googleSL");

// Inputs Login
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");

// Testing
let skipLogin = false;

function onDeviceReady() {
    if(localStorage.getItem("token")){
       window.location.replace("index.html");
    }
    
    loginButton.onclick = function() {
        if (skipLogin) {
            $("#body").addClass("custom-blur-on");
            window.location.replace("index.html");
        }else {
            if (validateFieldsLogin()) {
                $("#loading").modal('open');
                ajaxLogin();
            } else {
                sendErrorToast("Els camps Email i Contrasenya no poden estar buits.");
            }
        }
    }

    // Animacion para quitar el blur inicial (SIEMPRE AL FINAL DE LA FUNCION onDeviceReady)
    $("#body").addClass("custom-blur-off");
} 

function validateFieldsLogin() {
    return (!emailField.value || emailField.value.trim() === "" || !passwordField.value || passwordField.value.trim() === "") ? false : true;
}

function ajaxLogin() {
    var formData = new FormData;
    formData.append("email", emailField.value);
    formData.append("password", passwordField.value);

    $.ajax({
        url: urlAjax + "/api/token",
        type: "POST",
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    }).done(function(xhr) {
        if (xhr.Token) {
            $("#body").addClass("custom-blur-on");
            localStorage.setItem("token",xhr.Token);
            window.location.replace("index.html");
        }else{
            sendErrorToast("L\'email o la contrasenya no s\u00F3n correctes.");
        }
    }).error(function() {
        sendErrorToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
        $("#loading").modal('close');
    }).always(function() {
        $("#loading").modal('close');
    });
}

function sendErrorToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded red-gradient'});
}
  