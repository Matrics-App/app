'use strict'

getRequisits();

function getRequisits(){

    var paneRequisits = $('#paneRequisits');
    var tempArray = '["DNI","TOMATE","PATATA"]';
    var arrayRequisits = JSON.parse(tempArray);

    for (let i = 0; i < arrayRequisits.length; i++) {
        console.log("Patat");
        $('<form>', {
            "class": "custom-padding-1em",
            "method": "GET",
            "id": "formRequisit" + i,
            "html": '<div style="display:flex; flex-direction:row;"><h6>' + arrayRequisits[i] + '</h6><a id="btnRequisit' + i + '" class="custom-margin-left-1em custom-border-radius blue-gradient waves-effect waves-light btn">AFEGEIX!</a></input>',
            "action": window.siteRoot + 'ComponentInvoice/GetInvoiceImage/'
        }).appendTo(paneRequisits);
    }
}