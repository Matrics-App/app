document.addEventListener('deviceready', onDeviceReady, false);

// Funcion inicial
function onDeviceReady() {
    $("[name=perfils]").on("click", function() {
        
    });
}

// Funciones modal
function wizardPageControl() {
    removePulseEffect("wizard-floating-btn");
    //applyDisabledClass("wizard-floating-btn");
    if (modalPage === 0) {
        $("#modal-content-container").empty().append('<h5><span class="blue-text-gradient-modal">Perfil de requisits</span></h5><p class="custom-font-size-13px">A continuaci&oacute; es mostren els perfils d\'alumne disponibles. Aquests proporcionen descomptes parcials al preu de la matricula.</p><p class="custom-font-size-13px">Marca les caselles que m&eacute;s s\'adeqüin al teu perfil. Pots marcar m&eacute;s d\'una.</p><div class="divider custom-margin-2em"></div><div class="col s12 custom-border-1px custom-border-radius custom-padding-top-bottom-1em custom-padding-left-2em custom-height-25 custom-scroll-y"><p><label><input id="pStandard" type="checkbox" name="perfils"/><span>Perfil est&agrave;ndard</span></label></p><p><label><input id="p28anys" type="checkbox" name="perfils"/><span>Major de 28 anys</span></label></p><p><label><input id="pMonoparental" type="checkbox" name="perfils"/><span>Monoparental</span></label></p><p><label><input id="pNombrosa" type="checkbox" name="perfils"/><span>Familia Nombrosa</span></label></p></div>');
        modalPage = 1;
    } else if (modalPage === 1) {
        $("#modal-content-container").empty().append('<h5><span class="blue-text-gradient-modal">Drets d\'imatge</span></h5><p class="custom-font-size-13px custom-text-justify">Autoritzo que: <br/>- la meva imatge (majors d\'edat) <br/>- la imatge del meu/va fill/a <br/> (menors d\'edat), <br/><br/>pugui apar&egrave;ixer en fotografies corresponents a activitats escolars del centre, i que es puguin publicar en algun espai de la web, o en altres mitjans del centre, en el bon ent&egrave;s que l\'objectiu serà sempre educatiu o divulgatiu d\'aquestes activitats.</p><div class="divider custom-margin-2em"></div><div><p><label><input id="radioImatgeSi" name="dretsImatge" type="radio"/><span>Si</span></label></p><p><label><input id="radioImatgeNo" name="dretsImatge" type="radio"/><span>No</span></label></p></div>');
        modalPage = 2;
    } else if (modalPage === 2) {
        $("#modal-content-container").empty().append('<h5><span class="blue-text-gradient-modal">Sortides</span></h5>');
        modalPage = 3;
    } else if (modalPage === 3) {
        $("#wizard").modal('close'); 
    }
}

// Funciones generales
function checkAllCheckboxes() {
    $("[name=perfils]").prop("checked", false);
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