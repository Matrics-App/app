getRequisits()

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.getElementById("reqPhoto").onclick = function () {
        navigator.camera.getPicture(onSuccess, onFail, setOptions(1));
    }

    document.getElementById("reqGallery").onclick = function () {
        navigator.camera.getPicture(onSuccess, onFail, setOptions(0));
    }

    document.getElementById("reqFile").onclick = function () {
        customFileChooser.open('application/pdf',function (uri){
            alert(uri)
            const file = new File(uri);
            alert(file)
      }, function(err){
            alert(err);
      });
    }
}

function getRequisits(){
    $.ajax({
        method: "GET",
        url: "http://api-matrics-test.ieti.cat:8000/api/profilesandrequirements",
        dataType: "json",
        headers: ({
            "Authorization": "Token " + localStorage.getItem("token")
          })
    }).done(function(xhr) {
        console.log(xhr),
        setRequisits(xhr)
    }).fail(function() {
        sendToast("No s'ha pogut connectar amb el servidor. Si us plau torna a intentar-ho m\u00E9s tard.");
    })
}

function setRequisits(xhr){
    
    var arrayStatus = ['<div class="valign-wrapper"><td class="center"><i style="opacity:0.3" class="material-icons circle gray-text custom-icon-padding">brightness_1</i><i class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>',
        '<div class="valign-wrapper"><td class="center"><i style="opacity:0.3" class="material-icons circle gray-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>',
        '<div class="valign-wrapper"><td class="center"><i style="opacity:0.3" class="material-icons circle gray-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>',
        '<div class="valign-wrapper"><td class="center"><i style="opacity:1" class="material-icons circle gray-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle red-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle amber-text custom-icon-padding">brightness_1</i><i style="opacity:0.3" class="material-icons circle light-green-text custom-icon-padding">brightness_1</i></td></div>']

    var paneRequisits = $('#paneRequisits');
    var arrayRequisits = ["DNI ANVERS","DNI REVERS","SANITARIA"];

    var i = 0;
    for (const key in xhr) {
        if (Object.hasOwnProperty.call(xhr, key)) {
            const element = xhr[key].requirements;
            if(element){
                i++;
                $('<form>', {
                    "class": "custom-padding-1em",
                    "method": "GET",
                    "id": "formRequisit" + i,
                    "html": '<div style="justify-content: flex-end; display:flex; flex-direction:row;"><h6 id="nameRequisit' + i + '">' + element + '</h6><a id="btnRequisit' + i + '" class="custom-margin-left-1em custom-border-radius blue-gradient waves-effect waves-light btn">AFEGEIX!</a>' + arrayStatus[0]
                }).appendTo(paneRequisits);
        
                document.getElementById("btnRequisit" + i).onclick = function (ev, nomReq = element) {
                    
                    var reqModal = document.getElementById("reqModal");
                    var instance = M.Modal.init(reqModal);
                    instance.open();
                }
            }   
        }
    }

    /*

    for (let i = 0; i < arrayRequisits.length; i++) {
        $('<form>', {
            "class": "custom-padding-1em",
            "method": "GET",
            "id": "formRequisit" + i,
            "html": '<div style="justify-content: flex-end; display:flex; flex-direction:row;"><h6 id="nameRequisit' + i + '">' + arrayRequisits[i] + '</h6><a id="btnRequisit' + i + '" class="custom-margin-left-1em custom-border-radius blue-gradient waves-effect waves-light btn">AFEGEIX!</a>' + arrayStatus[i]
        }).appendTo(paneRequisits);

        document.getElementById("btnRequisit" + i).onclick = function (ev, nomReq = arrayRequisits[i]) {
            
            var reqModal = document.getElementById("reqModal");
            var instance = M.Modal.init(reqModal);
            instance.open();
        }
    }

    */
}

function setOptions(srcType) {
    var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true,
        direction: Camera.Direction.BACK
    }
    return options;
}

function onSuccess(imageData) {
    var image = "data:image/jpeg;base64," + imageData;
    console.log(image);
}

function onFail(message) {
    alert('Failed because: ' + message);
}