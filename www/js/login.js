document.addEventListener('deviceready', onDeviceReady, false);

// Botones Login
let loginButton = document.getElementById("loginButton");
let googleSL = document.getElementById("googleSL");

// Inputs Login
let emailField = document.getElementById("emailField");
let passwordField = document.getElementById("passwordField");

// Testing
let skipLogin = false;

async function onDeviceReady() {

    console.log("Prueba de Dani: " + localStorage.getItem("token"));
    if(localStorage.getItem("token")){
        $.ajax({
            method: "GET",
            url: urlAjax + "/api/verify",
            dataType: "json",
            headers: ({
                "UID": localStorage.getItem("UID"),
                // "Authorization": localStorage.getItem("token")
            })
        }).done(function(xhr) {
            console.log(xhr);
            alert(xhr);
            if(xhr == true) {
                window.location.replace("index.html");
            }
        }).fail(function(error) {
            alert(JSON.stringify(error));
        });
    }
    

    await sleep(2000);
    
    loginButton.onclick = async function() {
        if (skipLogin) {
            $("#body").addClass("custom-blur-on");
            window.location.replace("index.html");
        }else {
            if (validateFieldsLogin()) {
                $("#loading").modal('open');
                await sleep(500);
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

async function ajaxLogin() {
    let login = false;
    var formData = new FormData;
    formData.append("email", emailField.value);
    formData.append("password", passwordField.value);

    await $.ajax({
        url: urlAjax + "/api/token",
        type: "POST",
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    }).done(function(xhr) {
        if (xhr.Token) {
            localStorage.setItem("token",xhr.Token);
            localStorage.setItem("UID", xhr.UserId);

            if(xhr.BoolWizard == true){
                localStorage.setItem("skipWizard", "true");
            }

            login = true;

        }else{
            sendErrorToast("L\'email o la contrasenya no s\u00F3n correctes.");
            $("#loading").modal('close');
            login = false;
        }
    }).error(function() {
        sendErrorToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
        $("#loading").modal('close');
        login = false;
    }).always(function() {
        
    });

    if (login) {
        $("#body").removeClass("custom-blur-off");
        await sleep(500);
        window.location.replace("index.html");
    }
}

function sendErrorToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded red-gradient'});
}
  