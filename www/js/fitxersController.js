'use strict'

getRequisits();

function getRequisits(){

    var arrayStatus = ['<td class="center"><i class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle green-text custom-icon-padding">brightness_1</i></td>',
        '<td class="center"><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle green-text custom-icon-padding">brightness_1</i></td>',
        '<td class="center"><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i class="material-icons circle green-text custom-icon-padding">brightness_1</i></td>',
        '<td class="center"><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle green-text custom-icon-padding">brightness_1</i></td>']

    var paneRequisits = $('#paneRequisits');
    var tempArray = '["DNI","TOMATE","PATATA"]';
    var arrayRequisits = JSON.parse(tempArray);

    for (let i = 0; i < arrayRequisits.length; i++) {
        console.log("Patat");
        $('<form>', {
            "class": "custom-padding-1em",
            "method": "GET",
            "id": "formRequisit" + i,
            "html": '<div style="display:flex; flex-direction:row;"><h6 id="nameRequisit' + i + '">' + arrayRequisits[i] + '</h6><a id="btnRequisit' + i + '" class="custom-margin-left-1em custom-border-radius blue-gradient waves-effect waves-light btn">AFEGEIX!</a>' + arrayStatus[i]
        }).appendTo(paneRequisits);
        $('btnRequisit' + i).on('click', function(){
            console.log($('nameRequisit0').val());
        })
    }
}