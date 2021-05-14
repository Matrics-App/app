(function($) {
    $(function() {
        if (!skipWizard) {
            // Inicio del wizard:
            $("#wizard").modal('open');
    
            // Paginamiento del wizard:
            modalBtn.on( "click", function() {
                wizardPageControl();
            });
        }
    });
})(jQuery); 

document.addEventListener('deviceready', onDeviceReady, false);

// Booleanos generales:
let skipWizard = false;

// Variables generales:
let body = document.getElementById("body");

// Variables Tab Inici (Dashboard):
let statusR = $("#statusR");   // Status Requeriments
let statusU = $("#statusU");   // Status UFs
let statusD = $("#statusD");   // Status Dades Personals

let hintDades = $("#dashboardInfoDades");
let hintUFs = $("#dashboardInfoUFs");
let hintPayment = $("#dashboardInfoPay");
let hintRequisits = $("#dashboardInfoRequisits");

// Variables Tab Requisits:

// Variables Tab UFs:
let saveUFsButton = $("#saveUFsButton");

// Variables Tab Dades:

// Modal variables: 
let modalBtn = $("#wizard-floating-btn");

// Funcion inicial
function onDeviceReady() {
    // MOCKUP UFS - BORRAR <------------------------------------------------------- !!!!!!!!!!!!!!!!!!!!!!!
    addModule("MP01","MP1. Fonaments agronomics");
    addModule("MP02","MP2. Taller i equips de traccio");
    addModule("MP03", "MP3. Infraestructures i instal.lacions agricoles");
    addModule("MP04","MP4. Principis de sanitat vegetal");
    addModule("MP05","MP5. Control fitosanitari");
    addModule("MP06","MP6. Implantació de jardins i zones verdes");

    addUf("MP01", "UF1", "UF1. Clima i microclima");
    addUf("MP01", "UF2", "UF2. Aigua, sol i fertilitzacio");
    addUf("MP01", "UF3", "UF3. Topografia");
    addUf("MP01", "UF4", "UF4. Botanica");
    addUf("MP02", "UF1", "UF1. El taller");
    addUf("MP02", "UF2", "UF2. Maneig i manteniment del tractor i maquines motrius");
    addUf("MP03", "UF1", "UF1. Infraestructures agricoles");
    addUf("MP03", "UF2", "UF2. Manteniment d'instal.lacions agricoles");
    addUf("MP03", "UF3", "UF3. Instal.lacions de reg");
    addUf("MP03", "UF4", "UF4. Sistemes de proteccio i produccio forcada");
    addUf("MP04", "UF1", "UF1. Vegetacio espontania i agents abiotics");
    addUf("MP04", "UF2", "UF2. Plagues");
    addUf("MP04", "UF3", "UF3. Malalties");
    addUf("MP04", "UF4", "UF4. Estat sanitari de les plantes");
    addUf("MP04", "UF5", "UF5. Metodes de proteccio");
    addUf("MP05", "UF1", "UF1. Productes quimics fitosanitaris");
    addUf("MP05", "UF2", "UF2. Preparacio i aplicacio de productes quimics fitosanitaris");
    addUf("MP05", "UF3", "UF3. Manipulacio i emmagatzematge de productes quimics fitosanitaris");
    addUf("MP06", "UF1", "UF1. Replantejament i preparació per a la implantacio");
    addUf("MP06", "UF2", "UF2. Instal.lació d'elements no vegetals");

    // Control the expand icons on each Module in UFs Tab
    checkExpandables();

    //Load user data
    getUserData(localStorage.getItem("token"));

    saveUFsButton.on('click', function() {
        setUfs("esto es para que falle", "", "text");
    });

    // Animacion para quitar el blur inicial (SIEMPRE AL FINAL DE LA FUNCION onDeviceReady)
    $("#body").addClass("custom-blur-off");
}

// Funciones Tab Inici (Dashboard):
function setStatus(type, status) {
    if (status == 0) {
        type.removeClass("orange-text");
        type.removeClass("green-text");
        type.removeClass("grey-text");
        type.removeClass("text-lightn-1");
        type.addClass("green-text");
    } else if (status == 1) {
        type.removeClass("green-text");
        type.removeClass("red-text");
        type.removeClass("grey-text");
        type.removeClass("text-lightn-1");
        type.addClass("orange-text");
    } else if (status == 2) {
        type.removeClass("orange-text");
        type.removeClass("red-text");
        type.removeClass("grey-text");
        type.removeClass("text-lightn-1");
        type.addClass("red-text");
    }
}

function hintMenuControl() {
    switch (statusR) {
        case 0:
            
            break;
        case 1:
        
            break;
        case 2:
    
            break;
        default:
            break;
    }

    switch (statusU) {
        case 0:
            
            break;
        case 1:
        
            break;
        case 2:
    
            break;
        default:
            break;
    }
    
    switch (statusD) {
        case 0:
            
            break;
        case 1:
        
            break;
        case 2:
    
            break;
        default:
            break;
    }

}

// Funciones Tab Requisits:


// Funciones Tab UFs:

/** Cada vez que se agregue un Modulo, esta funcion reiniciara los onclick para tener dicho modulo nuevo en cuenta.
 *  Si la checkbox de un modulo se marca, todas sus checkbox de UF se marcaran.
 */
function checkSelectionListenersMPs() {
    $("[name=MP]").each(function() {
        $(this).prop("onclick", null).off("click");
        $(this).on("click", function() {
            if ($(this).prop("checked")) {
                $("[name=UF][module=" + $(this)[0].id + "]").prop('checked', 'checked');
            } else {
                $("[name=UF][module=" + $(this)[0].id + "]").prop('checked', false);
            }
        });
    });
}

/** Cada vez que se agregue una UF, esta funcion reiniciara los onclick para tener dicha UF nueva en cuenta.
 *  Si la checkbox de una UF se marca o desmarca, se controlara si todas las UF hermanas del mismo modulo 
 *  estan marcadas o no, para marcar la checkbox del Modulo padre o desmarcarla (VALGA LA REDUNDANCIA).
 */
function checkSelectionListenersUFs() {
    let areAllchecked = false;
    $("[name=UF]").each(function() {
        $(this).prop("onclick", null).off("click");
        $(this).on("click", function() {
            $("[name=UF][module=" + $(this)[0].attributes.module.value + "]").each(function() {
                if ($(this).prop("checked")) {
                    areAllchecked = true;
                } else {
                    $("[id=" + $(this)[0].attributes.module.value + "][name=MP]").prop('checked', false);
                    areAllchecked = false;
                    return false;
                }
            });
            if (areAllchecked) {
                $("[id=" + $(this)[0].attributes.module.value + "][name=MP]").prop('checked', 'checked');
            }
        });
    });
}

function getAllSelected() {
    $("[name=UF]:checked");
}

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
        console.log(xhr.status);
        
    }).fail(function() {
        console.log("Internal error: no se han podido recuperar las UFs del servidor");
        // sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

// funcion a la que llamar cuando se pulse el boton de guardar y que mandara las UFs seleccionadas a la base
function setUfs(url, query, token){
    $.ajax({
        method: "POST",
        url: url + query,
        datatype: String,
        data: ({
          token: token
        })
    }).done(function(xhr) {
        console.log(xhr.status);
        
        // Cambiar el estado del las UFs a 1 (Ambar)
        setStatus(statusU, 1);
    }).fail(function() {
        // Cambiar el estado del las UFs a 2 (Rojo)
        setStatus(statusU, 2);
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

function addModule(idModule, moduleName) {                                                                            
    $("#ufList").append('<li><div id="' + idModule + '-header" class="collapsible-header valign-wrapper"><label style="margin-left: 0.5em; max-width: 95%; white-space: break-spaces;"><input id="' + idModule + '" type="checkbox" name="MP"/><span></span></label><label style="margin-left: 0.5em; max-width: 95%; white-space: break-spaces; font-size: 1em">' + moduleName + '</span></label><i id="expandable" name="UfTab" class="material-icons circle blue-text-gradient-modal">expand_more</i></div><div id="' + idModule + '-body" class="collapsible-body custom-padding-0"></div></li>');
    checkExpandables();
    checkSelectionListenersMPs();
}

function addUf(idModule, idUf, ufName) {
    $("#" + idModule + "-body").append('<p><label style="margin-left: 2.5em; max-width: 95%; white-space: break-spaces; display: block;"><input id="' + idUf + '" type="checkbox" name="UF" module="' + idModule + '"/><span>' + ufName + '</span></label></p>');
    checkSelectionListenersUFs();
}

// Funciones Tab Dades:
function getUserData(){
    console.log(localStorage.getItem("token"));
    $.ajax({
        method: "GET",
        url: "http://34.203.46.101:8000/api/token",
        datatype: String,
        headers: {
            "Authorization": "Token " + localStorage.getItem("token")
        }
    }).done(function(userData) {
        $("#dadesNom")[0].innerHTML=userData.first_name ? userData.first_name : "-";
        $("#dadesCognoms")[0].innerHTML=userData.last_name ? userData.last_name : "-";
        $("#dadesDNI")[0].innerHTML=userData.dni ? userData.dni : "-";
        $("#dadesLlocNaixement")[0].innerHTML=userData.birthplace ? userData.birthplace : "-";
        $("#dadesNaixement")[0].innerHTML=userData.birthday ? userData.birthday : "-";
        $("#dadesDireccio")[0].innerHTML=userData.address ? userData.address : "-";
        $("#dadesCiutat")[0].innerHTML=userData.city ? userData.city : "-";
        $("#dadesCodiPostal")[0].innerHTML=userData.postal_code ? userData.postal_code : "-";
        $("#dadesTelefon")[0].innerHTML=userData.phone_number ? userData.phone_number : "-";
        $("#dadesTelefonEmergencia")[0].innerHTML=userData.emergency_number ? userData.emergency_number : "-";
        $("#dadesTutor1")[0].innerHTML=userData.tutor_1 ? userData.tutor_1 : "-";
        $("#dadesTutor2")[0].innerHTML=userData.tutor_2 ? userData.tutor_2 : "-";
        setStatus(statusU, 1);
    }).fail(function() {
        setStatus(statusU, 2);
        console.log("Internal error: no se han podido recuperar los datos personales");
        //sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
       
        
       // window.location.href = "index.html";
    


    
}

// Funciones generales:
function sendToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded red-gradient'});
}

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

function checkExpandables() {
    $("i.blue-text-gradient-modal").each(function() {
        $(this).parent().prop("onclick", null).off("click");
        $(this).parent().on("click", function() {
            if ($(this).children("i.blue-text-gradient-modal[name=dashboardTab]").length > 0) {
                if ($(this).children("i.blue-text-gradient-modal[name=dashboardTab]")[0].innerHTML === "expand_more") {
                    $("i.blue-text-gradient-modal[name=dashboardTab]").each(function() {$(this)[0].innerHTML = "expand_more";});
                    $(this).children("i.blue-text-gradient-modal[name=dashboardTab]")[0].innerHTML = "expand_less";
                } else {
                    $(this).children("i.blue-text-gradient-modal[name=dashboardTab]")[0].innerHTML = "expand_more";
                }
            } else {
                if ($(this).children("i.blue-text-gradient-modal[name=UfTab]")[0].innerHTML === "expand_more") {
                    $("i.blue-text-gradient-modal[name=UfTab]").each(function() {$(this)[0].innerHTML = "expand_more";});
                    $(this).children("i.blue-text-gradient-modal[name=UfTab]")[0].innerHTML = "expand_less";
                } else {
                    $(this).children("i.blue-text-gradient-modal[name=UfTab]")[0].innerHTML = "expand_more";
                }
            }
        });
    });
}