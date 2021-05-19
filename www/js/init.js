(function($) {
    $(function() {
        // Wizard modal options:
        var modalWizard = document.querySelectorAll('#wizard');
        M.Modal.init(modalWizard, {opacity: 0.7, dismissible: false, endingTop: '7%'});

        // Loading modal options:
        var modalLoading = document.querySelectorAll('#loading');
        M.Modal.init(modalLoading, {opacity: 0.5, dismissible: false, endingTop: '35%'});

        // Requisits upload modal options:
        var modalUpload = document.querySelectorAll('#reqUpload');
        M.Modal.init(modalUpload, {opacity: 0.5, dismissible: true});

        //Wrong user data modal options
        var modalLoginHelper = document.querySelectorAll('#loginHelper');
        M.Modal.init(modalLoginHelper, {opacity: 0.5, dismissible: true, endingTop: '50%'});

        //Wrong user data modal options
        var modalErrorData = document.querySelectorAll('#wrongDataModal');
        M.Modal.init(modalErrorData, {opacity: 0.5, dismissible: true});

        // Wizard modal css:
        $(".modal-content").css("padding", "0px");
        $("#wizard").css("max-height", "85%");
        $("#wizard").css("overflow", "hidden");
        $("#wizard").addClass("custom-height-90");
        $("#wizard").addClass("custom-border-radius");

        // Loading modal css:
        $("#loading").css("padding", "2em");
        $("#loading").css("overflow", "hidden");
        $("#loading").addClass("custom-border-radius");

        $(".preloader-wrapper").css("display", "block");
        $(".preloader-wrapper").css("margin", "auto");
        $(".preloader-wrapper").css("margin-bottom", "2em");

        // Login helper modal css:
        $("#loginHelper").css("overflow", "hidden");
        $("#loginHelper").addClass("custom-transform-vertical-translate");
        $("#loginHelper").addClass("custom-border-radius");

        // Upload modal css:
        $("#reqUpload").css("overflow-y", "scroll");
        $("#reqUpload").css("max-height", "50%");

        // Wrong user data modal:
        $("#wrongDataModal").css("max-height", "85%");
        $("#wrongDataModal").css("overflow", "hidden");
        $("#wrongDataModal").addClass("custom-height-90");
        $("#wrongDataModal").addClass("custom-border-radius");

        
        // Para cambiar el click de cancelar en el pago. Hara que vuelva a la aplicacion (WIP)
        $("#divImgCancelar").on("click", function() {window.location.href = "javascript:history.back()"});

        $(document).ready(function() {
            $('.tabs').tabs();
            $('.collapsible').collapsible();
            $('.fixed-action-btn').floatingActionButton();
            $('.sidenav').sidenav();
            $('.dropdown-trigger').dropdown();
        });        


    });
})(jQuery);

var urlAjax = "https://matrics-test.ieti.cat";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Personalizar los insets y la navigationBar del movil
    if (cordova.platformId == 'android') {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString('#2196F3');
        NavigationBar.backgroundColorByHexString('#FFFFFF', true);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
