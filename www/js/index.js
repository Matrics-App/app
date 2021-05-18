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
let skipWizard = true;

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
let reqPhoto;
let reqGallery;
let reqFile;
let btnRequisit;

// Variables Tab UFs:
let saveUFsButton = $("#saveUFsButton");

// Variables Tab Dades:

let btnValid =$("#validData");
let btnInvalid =$("#invalidData");

// Modal variables: 
let modalBtn = $("#wizard-floating-btn");
let modalDataBtn = $("#error-data-floating-btn");

// Funcion inicial
function onDeviceReady() {

    $("#btnLogout").on("click", function(){
        console.log("Estoy saliendoooo")
        localStorage.setItem("token", "");
        $("#body").removeClass("custom-blur-off");
        $("#body").addClass("custom-blur-on");
        window.location.href = "login.html";
    });

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

    // Load requirements
    getRequisits();

    // Load user data
    getUserData(localStorage.getItem("token"));

    // Control the expand icons on each Module in UFs Tab
    checkExpandables();

    // Onclick listeners
    saveUFsButton.on('click', function() {
        setUfs("esto es para que falle (temporalmente)", "", "text");
    });

    console.log(navigator.camera);
    reqPhoto = $("#reqPhoto").on("click", function() {
        navigator.camera.getPicture(onSuccess, onFail, setOptions(1));
    });

    reqGallery = $("#reqGallery").on("click", function() {
        navigator.camera.getPicture(onSuccess, onFail, setOptions(0));
    });

    reqFile = $("#reqFile").on("click", function() {
        customFileChooser.open('application/pdf',function (uri) {
            alert(uri);
            const file = new File(uri);
            alert(file);
            // Do something with that file, probably an ajax
        }, function(err){
            sendErrorToast("No s'ha pogut carregar l'arxiu.")
        });
    });

    btnValid.on('click', function() {
        setStatus(statusD, 0);
        hintMenuControl();
        sendToast("Dades personals validades correctament.");
        applyDisabledClass("validData");
    });

    btnInvalid.on('click', function() {
        setStatus(statusD, 1);
        hintMenuControl();
        $("#wrongDataModal").modal('open');
        removeDisabledClass("validData");
    });

    modalDataBtn.on( "click", function() {
       $("#wrongDataModal").modal('close');
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
        type.attr("name", 0);
    } else if (status == 1) {
        type.removeClass("green-text");
        type.removeClass("red-text");
        type.removeClass("grey-text");
        type.removeClass("text-lightn-1");
        type.addClass("orange-text");
        type.attr("name", 1);
    } else if (status == 2) {
        type.removeClass("orange-text");
        type.removeClass("red-text");
        type.removeClass("grey-text");
        type.removeClass("text-lightn-1");
        type.addClass("red-text");
        type.attr("name", 2);
    }
}

function hintMenuControl() {
    switch (statusR.attr("name")) {
        case "0":
            
            break;
        case "1":
        
            break;
        case "2":
    
            break;
        default:
            break;
    }

    switch (statusU.attr("name")) {
        case "0":
            
            break;
        case "1":
        
            break;
        case "2":
    
            break;
        default:
            break;
    }

    switch (statusD.attr("name")) {
        case "0":
            $("#dashboardInfoDades").addClass("custom-display-none");
            break;
        case "1":
            $("#dashboardInfoDades").removeClass("custom-display-none");
            break;
        case "2":
    
            break;
        default:
            break;
    }

}

// Funciones Tab Requisits:
function addRequirement(reqName) {
    $("#reqBody").append('<tr class="valign-wrapper"><th class="custom-padding-left-1em" style="white-space: break-spaces; overflow-wrap: anywhere;">' + reqName + '</th><td class="valign-wrapper" style="margin-left: auto;"><a id="btnRequisit" name="reqBtn" class="waves-effect waves-light custom-border-radius custom-margin-top-bottom-05em blue-gradient btn">AFEGEIX!</a><i id="statusReq' + reqName + '" class="material-icons custom-margin-05em circle grey-text text-lighten-1">brightness_1</i></td></tr>');

    $("[name=reqBtn]").each(function() {
        $(this).prop("onclick", null).off("click");
        $(this).on("click", function() {
            $("#reqUpload").modal('open');
        });
    });
}

function getRequisits(){
    $.ajax({
        method: "GET",
        url: urlAjax + "/api/profilesandrequirements",
        dataType: "json",
        headers: ({
            "Authorization": "Token " + localStorage.getItem("token")
          }),
        timeout: 3000
    }).done(function(xhr) {
        setRequisits(xhr);
    }).fail(function() {
        console.log("Internal log - Error: no se han podido recuperar los requisitos del usuario");
        addRequirement("DNI Anvers");
        addRequirement("DNI Revers");
        addRequirement("Sanit\u00E0ria");
        //sendErrorToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    });
}

function setRequisits(xhr) {
    for (const key in xhr) {
        if (Object.hasOwnProperty.call(xhr, key)) {
            addRequirement(xhr[key].requirements);
        }
    }
}

function setOptions(srcType) {
    return {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
    }
    
}

function onSuccess(imageData) {
    var image = "data:image/jpeg;base64," + imageData;
    console.log(image);
}

function onFail(message) {
    console.log(message);
    console.log("Internal log - Error: no se ha podido obtener el documento o imagen");
}

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

function getUfs(query, dataType) {
    $("#listaModulos").html("");
    $.ajax({
        method: "GET",
        url: urlAjax + query,
        datatype: String,
        data: ({
          token: token
        })
    }).done(function(xhr) {
        console.log(xhr.status);
        
    }).fail(function() {
        console.log("Internal log - Error: no se han podido recuperar las UFs del servidor");
        // sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

// funcion a la que llamar cuando se pulse el boton de guardar y que mandara las UFs seleccionadas a la base
function setUfs(url, query, token){
    $.ajax({
        method: "POST",
        url: urlAjax + query,
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
        console.log("Internal log - Error: no se han podido guardar las UFs del servidor");
        sendErrorToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
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
    $.ajax({
        method: "GET",
        url: urlAjax + "/api/user",
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
        setStatus(statusD, 1);
    }).fail(function() {
        setStatus(statusD, 2);
        console.log("Internal log - Error: no se han podido recuperar los datos personales");
        //sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

// Funciones generales:
function sendErrorToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded red-gradient'});
}
function sendToast(content) {
    M.toast({html: content, displayLength: 3000, classes: 'rounded blue-gradient'});
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

