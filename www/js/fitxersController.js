getRequisits();

function getRequisits(){

    var arrayStatus = ['<div class="valign-wrapper"><td class="center"><i class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>',
        '<div class="valign-wrapper"><td class="center"><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>',
        '<div class="valign-wrapper"><td class="center"><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>',
        '<div class="valign-wrapper"><td class="center"><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>']

    var paneRequisits = $('#paneRequisits');
    var arrayRequisits = ["DNI ANVERS","DNI REVERS","SANITARIA"];

    for (let i = 0; i < arrayRequisits.length; i++) {
        $('<form>', {
            "class": "custom-padding-1em",
            "method": "GET",
            "id": "formRequisit" + i,
            "html": '<div style="display:flex; flex-direction:row;"><h6 id="nameRequisit' + i + '">' + arrayRequisits[i] + '</h6><a id="btnRequisit' + i + '" class="custom-margin-left-1em custom-border-radius blue-gradient waves-effect waves-light btn">AFEGEIX!</a>' + arrayStatus[i]
        }).appendTo(paneRequisits);

        document.getElementById("btnRequisit" + i).onclick = function (ev, nomReq = arrayRequisits[i]) {
            var reqModal = document.getElementById("reqModal");
            var instance = M.Modal.getInstance(reqModal);
            instance.open();
            setStatus(statusR, 2, 0);
        }
    }
}