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
        url: "http://api-matrics-test.ieti.cat:8000/api/token",
        type: "POST",
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    }).done(function(xhr) {
       console.log(xhr)
       alert(xhr);
       if (xhr.Token) {
        localStorage.setItem("token",xhr.Token );
        window.location.href = "index.html";
       }else{
           console.log("maaal")
       }
       
        
       // window.location.href = "index.html";
    }).error(function() {
        alert("Patata");
        sendToast("L\'email o la contrasenya no s\u00F3n correctes.");
        $("#loading").modal('close');
    }).always(function() {
        $("#loading").modal('close');
    });
}

function sendToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded red-gradient'});
}
  