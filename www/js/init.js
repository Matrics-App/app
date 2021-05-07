(function($) {
    $(function() {
        // Wizard modal options:
        var modalItems = document.querySelectorAll('#wizard');
        M.Modal.init(modalItems, {opacity: 0.7, dismissible: false, endingTop: '7%'});

        // Loading modal options:
        var modalItems = document.querySelectorAll('#loading');
        M.Modal.init(modalItems, {opacity: 0.5, dismissible: false, endingTop: '35%'});

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
    

        $(document).ready(function() {
            $('.tabs').tabs();
            $('.collapsible').collapsible();
            $('.fixed-action-btn').floatingActionButton();
            $('.collapsible').collapsible();
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
