(function($) {
    $(function() {
        // Wizard modal options:
        var modalWizard = document.querySelectorAll('#wizard');
        M.Modal.init(modalWizard, {opacity: 0.7, dismissible: false, endingTop: '7%'});

        // Loading modal options:
        var modalLoading = document.querySelectorAll('#loading');
        M.Modal.init(modalLoading, {opacity: 0.5, dismissible: false, endingTop: '50%'});

        // Login helper modal options:
        var modalHelper = document.querySelectorAll('#loginHelper');
        M.Modal.init(modalHelper, {opacity: 0.7, dismissible: true, endingTop: '50%'});

        // Wizard modal css:
        $(".modal-content").css("padding", "0px");
        $("#wizard").css("max-height", "85%");
        $("#wizard").css("overflow", "hidden");
        $("#wizard").addClass("custom-height-90");
        $("#wizard").addClass("custom-border-radius");

        // Loading modal css:
        $("#loading").css("padding", "2em");
        $("#loading").css("overflow", "hidden");
        $("#loading").addClass("custom-transform-vertical-translate");
        $("#loading").addClass("custom-border-radius");
        $(".preloader-wrapper").css("display", "block");
        $(".preloader-wrapper").css("margin", "auto");
        $(".preloader-wrapper").css("margin-bottom", "2em");

        // Login helper modal css:
        $("#loginHelper").css("overflow", "hidden");
        $("#loginHelper").addClass("custom-transform-vertical-translate");
        $("#loginHelper").addClass("custom-border-radius");
        
        // Para cambiar el click de cancelar en el pago. Hara que vuelva a la aplicacion (WIP)
        $("#divImgCancelar").on("click", function() {window.location.href = "javascript:history.back()"});

        $(document).ready(function() {
            $('.tabs').tabs();
            $('.collapsible').collapsible();
            $('.fixed-action-btn').floatingActionButton();
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Personalizar los insets y la navigationBar del movil
    if (cordova.platformId == 'android') {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString('#2196F3');
        NavigationBar.backgroundColorByHexString('#FFFFFF', true);
    }
}
