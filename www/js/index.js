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

// Variables generales:
let body = document.getElementById("body");

// Variables Tab Inici (Dashboard):
let statusR = $("#statusR");   // Status Requeriments
let statusU = $("#statusU");   // Status UFs
let statusD = $("#statusD");   // Status Dades Personals

// Variables Tab Requisits:

// Variables Tab UFs:

// Variables Tab Dades:
let userData =JSON.parse('{"nombre":"dani","apellido1":"ronda","apellido2":"palasi","dni":"46465871K","birthplace":"Barcelona","birthday":"01/08/2000","address":"plz milagros consarnau sabate 15 4 3","city":"Hospitalet","postal_code":"54815","phone_number":"936558741","emergency_number":"98563221","tutor_1":"dani powenwne jhjdwcmokwd","tutor_2":"safiupbdvsapi dsaihadvsiunl"}');
// Booleanos generales:
let skipWizard = true;

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
    getUserData();

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
function checkExpandables() {
    $("i.blue-text-gradient-modal").each(function() {
        $(this).parent().prop("onclick", null).off("click");
        $(this).parent().on("click", function() {
            if ($(this).children("i.blue-text-gradient-modal")[0].innerHTML === "expand_more") {
                $("i.blue-text-gradient-modal").each(function() {$(this)[0].innerHTML = "expand_more";});
                $(this).children("i.blue-text-gradient-modal")[0].innerHTML = "expand_less";
            } else {
                $(this).children("i.blue-text-gradient-modal")[0].innerHTML = "expand_more";
            }
        });
    });
}

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
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

// funcion a la que llamar cuando se pulse el boton de guardar y que mandara las UFs seleccionadas a la base
function setUfs(){

    $("[name=UF]:checked");

    $.ajax({
        method: "POST",
        url: url + query,
        datatype: String,
        data: ({
          token: token
        })
    }).done(function(xhr) {
        console.log(xhr.status);
        
    }).fail(function() {
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

function addModule(idModule, moduleName) {                                                                            
    $("#ufList").append('<li><div id="' + idModule + '-header" class="collapsible-header valign-wrapper"><label style="margin-left: 0.5em; max-width: 95%; white-space: break-spaces;"><input id="' + idModule + '" type="checkbox" name="MP"/><span></span></label><label style="margin-left: 0.5em; max-width: 95%; white-space: break-spaces; font-size: 1em">' + moduleName + '</span></label><i id="expandable" class="material-icons circle blue-text-gradient-modal">expand_more</i></div><div id="' + idModule + '-body" class="collapsible-body custom-padding-0"></div></li>');
    checkExpandables();
    checkSelectionListenersMPs();
}

function addUf(idModule, idUf, ufName) {
    $("#" + idModule + "-body").append('<p><label style="margin-left: 2.5em; max-width: 95%; white-space: break-spaces; display: block;"><input id="' + idUf + '" type="checkbox" name="UF" module="' + idModule + '"/><span>' + ufName + '</span></label></p>');
    checkSelectionListenersUFs();
}

// Funciones Tab Dades:
function getUserData(){
    //llamada ajax
    console.log();
    $("#dadesNombre")[0].innerHTML=userData.nombre;
    $("#dadesApellidos")[0].innerHTML=userData.apellido1;
    $("#dadesDNI")[0].innerHTML=userData.dni;
    $("#dadesLlocNaixement")[0].innerHTML=userData.birthplace;
    $("#dadesNaixement")[0].innerHTML=userData.birthday;
    $("#dadesDireccio")[0].innerHTML=userData.address;
    $("#dadesCiutat")[0].innerHTML=userData.city;
    $("#dadesCodiPostal")[0].innerHTML=userData.postal_code;
    $("#dadesTelefon")[0].innerHTML=userData.phone_number;
    $("#dadesTelefonEmergencia")[0].innerHTML=userData.emergency_number;
    $("#dadesTutor1")[0].innerHTML=userData.tutor_1;
    $("#dadesTutor2")[0].innerHTML=userData.tutor_2;
}
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