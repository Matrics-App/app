document.addEventListener('deviceready', onDeviceReady, false);

// Variables Generales
let modalPage = 0;
let isFloatingBtnEnabled = false;
let isAtLeastOneChecked = true;

// Variables de texto
let textPageImatges;

// Variables Perfils WIP
let checkboxPerfil;
let selectedPerfil;

// Variables Drets d'imatge
let radioImatgeSi;
let radioImatgeNo;

// Variables Sortides
let radioPatiSi;
let radioPatiNo;
let radioSortidesSi;
let radioSortidesNo;

// Funcion inicial
function onDeviceReady() {
    //getImageRightsText();
}

// Funciones Wizard
function wizardPageControl() {
    removePulseEffect("wizard-floating-btn");
    applyDisabledClass("wizard-floating-btn");
    isFloatingBtnEnabled = false;
    if (modalPage === -1) {
        $("#modal-content-container").empty().append('<h4>Benvingut a <br/><span class="blue-text-gradient-modal">Matrics IETI</span></h4><p>Aquesta aplicació et permetr&agrave; matricular-te al cicle formatiu que t\'hagis preinscrit de forma r&agrave;pida i senzilla.</p><p>Per comen&ccedil;ar, et farem un parell de preguntes per determinar el teu perfil, prefer&egrave;ncies i requisits de la matricula.</p><p>Prem el bot&oacute; amb la fletxa a la part inferior dreta de la pantalla per continuar.</p>');
        modalPage = 0;
    } else if (modalPage === 0) {
        $("#modal-content-container").empty().append('<h5><span class="blue-text-gradient-modal">Perfil de requisits</span></h5><p class="custom-font-size-13px">A continuaci&oacute; es mostren els perfils d\'alumne disponibles. Aquests proporcionen descomptes parcials al preu de la matricula.</p><p class="custom-font-size-13px">Marca les caselles que m&eacute;s s\'adeqüin al teu perfil. Pots marcar m&eacute;s d\'una.</p><div class="divider custom-margin-2em"></div><div class="col s12 custom-border custom-border-radius custom-padding-top-bottom-1em custom-padding-left-2em custom-height-25 custom-scroll-y"><p><label><input id="pStandard" type="checkbox" name="perfils"/><span>Perfil est&agrave;ndard</span></label></p><p><label><input id="p28anys" type="checkbox" name="perfils"/><span>Major de 28 anys</span></label></p><p><label><input id="pBonificacio" type="checkbox" name="perfils"/><span>Bonificaci&oacute;</span></label></p><p><label><input id="pExempcio" type="checkbox" name="perfils"/><span>Exempci&oacute;</span></label></p></div>');
        $("[name=perfils]").on("click", {page: modalPage}, controlFloatingButton);
        
        modalPage = 1;
    } else if (modalPage === 1) {
        $("#modal-content-container").empty().append('<h5><span class="blue-text-gradient-modal">Drets d\'imatge</span></h5><p>Autoritzo que:</p><p class="custom-font-size-13px custom-text-justify">- la meva imatge (majors d\'edat) <br/>- la imatge del meu/va fill/a <br/> (menors d\'edat), <br/><br/>pugui apar&egrave;ixer en fotografies corresponents a activitats escolars del centre, i que es puguin publicar en algun espai de la web, o en altres mitjans del centre, en el bon ent&egrave;s que l\'objectiu serà sempre educatiu o divulgatiu d\'aquestes activitats.</p><div class="divider custom-margin-2em"></div><div><p><label><input id="radioImatgeSi" name="dretsImatge" type="radio"/><span>Si</span></label></p><p><label><input id="radioImatgeNo" name="dretsImatge" type="radio"/><span>No</span></label></p></div>');
        radioImatgeSi = $("#radioImatgeSi").on("click", {page: modalPage}, controlFloatingButton);
        radioImatgeNo = $("#radioImatgeNo").on("click", {page: modalPage}, controlFloatingButton);
        
        modalPage = 2;
    } else if (modalPage === 2) {
        $("#modal-content-container").empty().append('<h5><span class="blue-text-gradient-modal">Sortides i esbarjo</span></h5><p>Autoritzo que:</p><p class="custom-font-size-13px custom-text-justify">El meu/va fill/a pugui sortir del centre a les hores d\'esbarjo i entrar i/o sortir fora de l\'horari habitual quan, en cas excepcional, hi ha una abs&egrave;ncia del professorat.</p><div class="divider custom-margin-1em"></div><div><p><label><input id="radioPatiSi" name="dretsPati" type="radio"/><span>Si</span></label></p><p><label><input id="radioPatiNo" name="dretsPati" type="radio"/><span>No</span></label></p><p class="custom-font-size-13px custom-text-justify">El meu/va fill/a assisteixi a totes les sortides extraescolars i curriculars que es realitzin durant el curs 2021-2022</p><div class="divider custom-margin-1em"></div><div><p><label><input id="radioSortidesSi" name="dretsSortides" type="radio"/><span>Si</span></label></p><p><label><input id="radioSortidesNo" name="dretsSortides" type="radio"/><span>No</span></label></p></div></div>');
        radioPatiSi = $("#radioPatiSi").on("click", {page: modalPage}, controlFloatingButton);
        radioPatiNo = $("#radioPatiNo").on("click", {page: modalPage}, controlFloatingButton);
        radioSortidesSi = $("#radioSortidesSi").on("click", {page: modalPage}, controlFloatingButton);
        radioSortidesNo = $("#radioSortidesNo").on("click", {page: modalPage}, controlFloatingButton);
        
        modalPage = 3;
    } else if (modalPage === 3) {
        updateWizard();
        $("#wizard").modal('close'); 
    }
}

function updateWizard(){
    
    $.ajax({
        method: "POST",
        url: urlAjax + "/api/updatewizard",
        dataType: "json",
        data: ({
            "ImageRights":radioImatgeSi.prop('checked'),
            "Excursions": radioPatiSi.prop('checked'),
            "Extracurriculars": radioSortidesSi.prop('checked'),
            "Profile": selectedPerfil
        }),
        headers: ({
            "Authorization": "Token " + localStorage.getItem("token")
          }),
    }).done(function(xhr) {
        console.log(xhr.status);
        textPageImageRights = xhr.data;
    }).fail(function() {
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

function getSelectedProfile(){

    if($('#pStandard').prop('checked') == true){
        return "Standard"
    }

    if($('#pBonificacio').prop('checked') == true){
        return "Bonus"
    }

    if($('#pExempcio').prop('checked') == true){
        return "Exception"
    }

}

function controlFloatingButton(page) {
    isAtLeastOneChecked = $("[name=perfils]:checked").length > 0;
    switch (page.data.page) {
        case 0:
            profileCheckboxControl();
            selectedPerfil = getSelectedProfile();
            if (!isAtLeastOneChecked) {
                removePulseEffect("wizard-floating-btn");
                applyDisabledClass("wizard-floating-btn");
            }
            if (!isFloatingBtnEnabled && isAtLeastOneChecked) {
                applyPulseEffect("wizard-floating-btn");
                removeDisabledClass("wizard-floating-btn");
            }
            break;
        case 1:
            if (!isFloatingBtnEnabled) {
                applyPulseEffect("wizard-floating-btn");
                removeDisabledClass("wizard-floating-btn");
            }
            break;
        case 2:
            if (!isFloatingBtnEnabled && $("[name=dretsPati]:checked").length > 0 && $("[name=dretsSortides]:checked").length > 0) {
                applyPulseEffect("wizard-floating-btn");
                removeDisabledClass("wizard-floating-btn");
            }
            break;             
        default:
            break;
    }
}

function profileCheckboxControl() {
    $("#pStandard").on("click", function() {
        if ($("#pStandard").prop("checked")) {
            uncheckCheckboxById("p28anys");
            uncheckCheckboxById("pBonificacio");
            uncheckCheckboxById("pExempcio");
        }
        selectedPerfil = getSelectedProfile();
    });

    $("#p28anys").on("click", function() {
        if ($("#p28anys").prop("checked")) {
            uncheckCheckboxById("pStandard");
        }
        selectedPerfil = getSelectedProfile();
    });

    $("#pBonificacio").on("click", function() {
        if ($("#pBonificacio").prop("checked")) {
            uncheckCheckboxById("pStandard");
            uncheckCheckboxById("pExempcio");
        }
        selectedPerfil = getSelectedProfile();
    });

    $("#pExempcio").on("click", function() {
        if ($("#pExempcio").prop("checked")) {
            uncheckCheckboxById("pStandard");
            uncheckCheckboxById("pBonificacio");
        }
        selectedPerfil = getSelectedProfile();
    });

    
}

// Funciones Ajax
function getImageRightsText() {
    $.ajax({
        method: "GET",
        url: url + query,
        dataType: dataType,
        data: ({
            token: token
          })
    }).done(function(xhr) {
        console.log(xhr.status);
        textPageImageRights = xhr.data;
    }).fail(function() {
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    }).always(function() {
        
    });
}

// Funciones generales
function checkCheckboxById(id) {
    $("#" + id + "[name=perfils]").prop("checked", true);
}

function uncheckCheckboxById(id) {
    $("#" + id + "[name=perfils]").prop("checked", false);
}

function checkAllCheckboxes() {
    $("[name=perfils]").prop("checked", true);
}

function uncheckAllCheckboxes() {
    $("[name=perfils]").prop("checked", false);
}

function disableAllCheckboxes() {
    $("[name=perfils]").addClass("disabled");
}

function enableAllCheckboxes() {
    $("[name=perfils]").removeClass("disabled");
}