(function($) {
    $(function() {
        // Wizard modal options:
        var modalItems = document.querySelectorAll('.modal');
        M.Modal.init(modalItems, {opacity: 0.7, dismissible: false, endingTop: '7%'});

        // Wizard modal css:
        $(".modal-content").css("padding", "0px");
        $("#wizard").css("max-height", "85%");
        $("#wizard").css("overflow", "hidden");
        $("#wizard").addClass("custom-height-90");
        $("#wizard").addClass("custom-border-radius");


        $(document).ready(function() {
            $('.tabs').tabs();
            $('.fixed-action-btn').floatingActionButton();
        });

    }); //end of document ready
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





