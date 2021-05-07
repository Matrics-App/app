

document.addEventListener('deviceready', onDeviceReady, false);

let statusR = $("#statusR");   // Status Requeriments
let statusU = $("#statusU");   // Status UFs
let statusD = $("#statusD");   // Status Dades Personals

// Variables generales:
let body = document.getElementById("body");

// Booleanos generales:
let skipWizard = false;

// Modal variables: 
let modalBtn = $("#wizard-floating-btn");

// Funcion inicial
function onDeviceReady() {
    if (!skipWizard) {
        $("#wizard").modal('open');

        // Paginamiento del wizard:
        modalBtn.on( "click", function() {
            wizardPageControl();
        });
    }
}

// Funciones Tab Inici (Dashboard):

function setStatus(type, status, bool) {
    if (status == 0) {
        type.removeClass("orange-text");
        type.removeClass("green-text");
        type.addClass("red-text");
        
        generalStatus[bool] = false;
    } else if (status == 1) {
        type.removeClass("green-text");
        type.removeClass("red-text");
        type.addClass("orange-text");
        generalStatus[bool] = false;
    } else if (status == 2) {
        type.removeClass("orange-text");
        type.removeClass("red-text");
        type.addClass("green-text");
        generalStatus[bool] = true;
    }

    if (generalStatus[0] && generalStatus[1] && generalStatus[2]) {
        applyPulseEffect();
    } else {
        removePulseEffect();
    }
}

// Funciones Tab Requisits:

// Funciones Tab UFs:

// funcion para printar los modulos y UFs desde la API
function getUfs(url, query, dataType) {
    $("#listaModulos").html("");
    $.ajax({
        method: "GET",
        url: url + query,
        
        datatype: String,
        data: ({
          token: token
        })
    }).done(function(xhr) {
        console.log(xhr.satus);
        // for insert de nuevo modulo
        for (let i = 0; i < array.length; index++) {
            
            $("#listaModulos").append('<li> <div class="collapsible-header"> <p> <label> <input id="chk_modul-+i+" type="checkbox" /> <span>M01</span> </label> </p> </div> <div id="modul-i" class="collapsible-body"> </div>'); 
            
        }
       
        // insert de nueva UF a la id de un modulo anadido anteriormente
        for (let i = 0; i < array.length; index++) {
            
            $("#chk_modul-+i+").append('<p> <label> <input id="chk_modul-+i+" type="checkbox" /> <span>M01</span> </label> </p>');
            
        }
        
        
    }).fail(function() {
    
    }).always(function() {
        
    });
}


// funcion a la que llamar cuando se pulse el boton de guardar y que mandara las UFs seleccionadas a la base
function setUfs(){

    $("[name=UF]:checked");

    $.ajax({
        method: "GET",
        url: url + query,
        
        datatype: String,
        data: ({
          token: token
        })
    }).done(function(xhr) {
        console.log(xhr.satus);
        // insert de nuevo modulo
        
        
    }).fail(function() {
    
    }).always(function() {
        
    });
}


// Funciones Tab Dades:

// Funciones generales:
function applyPulseEffect(id) {
    $("#" + id).addClass("pulse");
}

function removePulseEffect(id) {
    $("#" + id).removeClass("pulse");
}

function applyDisabledClass(id) {
    $("#" + id).addClass("disabled");
}

function removeDisabledClass(id) {
    $("#" + id).removeClass("disabled");
}