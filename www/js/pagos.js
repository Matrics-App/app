document.getElementById('formPayment').onsubmit = validateForm;

function validateForm(){
    var rawAmount = document.getElementById("tfAmount").value;
    
    if(rawAmount.charAt(rawAmount.length - 3) == "," ){
        var replacePos = rawAmount.length - 3;
        rawAmount = rawAmount.substring(0,replacePos) + "." + rawAmount.substring(replacePos+1);
    }

    paymentRedsys((rawAmount * 100));
}

function paymentRedsys(amount){

    const keySHA = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";                              // Clave SHA-256 proporcionada por el banco
    const descRedsys = "Matricula 2021-22 Institut Esteve Terradas i Illa";         // Descripción del la transaccion
    
    // Se obtiene la fecha actual y se formatea en ('YYYYMMDDHHMMSS') para generar un identificador unico de la transacción.
    const currentDate = new Date();
    const orderCode = currentDate.getFullYear().toString().substr(-2) + ("0" + (currentDate.getMonth() + 1)).slice(-2) + ("0" + currentDate.getDate()).slice(-2) + currentDate.getHours() + ("0" + currentDate.getMinutes()).slice(-2) + ("0" + currentDate.getSeconds()).slice(-2);

    // ObjectJS con los parametros del banco y la transaccion
    var myRedsys = {
        "DS_MERCHANT_AMOUNT": amount,                   // Cantidad a descontar (los 2 ultimos digitos son los centimos)
        "DS_MERCHANT_ORDER": orderCode,                 // Identificativo de la orden
        "DS_MERCHANT_MERCHANTCODE": '335088258',        // Codigo FUC del BANCO
        "DS_MERCHANT_CURRENCY": "978",                  // Moneda (978 = EUR)
        "DS_MERCHANT_TRANSACTIONTYPE": "0",             // Tipo de transacción, dejar en 0
        "DS_MERCHANT_TERMINAL" : "001",                 // Terminal BANCO
        "DS_MERCHANT_CONSUMERLANGUAGE": "003",          // 000/001 = ESP || 002 = ENG || 003 = CAT
        "DS_MERCHANT_PRODUCTDESCRIPTION": descRedsys    // Información de la ventana de pago.
    }

    var params = createMerchantParameters(myRedsys);
    console.log(params);

    var signature = createMerchantSignature(myRedsys, keySHA)
    console.log(signature);

    document.forms["formPayment"]["Ds_Signature"].value = signature;
    document.forms["formPayment"]["Ds_MerchantParameters"].value = params;

}

/**
 * Se monta la cadena en formato JSON con todos los datos de la peticion.
 * 
 * @param {*} data - ObjectJS con los datos de la transacción
 * @returns  - JSON con los datos de la transacción en Base64
 */
function createMerchantParameters(data){
    return window.btoa(JSON.stringify(data))
}

/**
 * La firma de la operación ("Ds_Signature") se calculará utilizando el parámetro "Ds_MerchantParameters" 
 * (ya codificado en BASE64), y la clave específica del terminal (clave del comercio). 
 * 
 * @param {*} myRedsys - ObjectJS con los datos de la transaccion
 * @param {*} key - Clave SHA-256 propocionada por el banco
 * @returns El valor del parametro: [Ds_Signature]
 */
function createMerchantSignature(myRedsys, key){

    const merchantParameters = createMerchantParameters(myRedsys);      // Genera otra vez el JSON en B64
    const orderID = myRedsys.DS_MERCHANT_ORDER;                         // Obtiene el valor de myRedsys.DS_MERCHANT_ORDER
    const orderKEY = encrypt3DES(orderID, key);                         // Encripta en 3DES y obtiene la clave de la transaccion
    const res = mac256(merchantParameters, orderKEY);                   // Encripta en HMAC-SHA256 y se obtiene la firma final
    return res;                                                         // MerchantSignature!
                                                        
}

/**
 * Se realiza el cálculo del HMAC-256 con el parámentro "Ds_MerchantParameters" y la clave de firma diversificada.
 * El valor del HMAC SHA256 debe codificarse en BASE64, siendo su resultado el valor de la firma.
 * 
 * @param {*} data - El valor del parametro [Ds_MerchantParameters]
 * @param {*} orderKEY - La clave obtenida con el cifrado 3DES-CBC
 * @returns El valor del HMAC-SHA256 codificado en Base64
 */
function mac256(data, orderKEY){

    const signature = CryptoJS.HmacSHA256(data, orderKEY.ciphertext);
    const signatureBase64 = signature.toString(CryptoJS.enc.Base64);
    return signatureBase64;

}

/**
 * Diversificar la clave de firma realizando un cifrado 3DES entre esta clave codificada y el valor del número de pedido de la operación (Ds_Merchant_Order).
 * 
 * @param {*} orderID - El valor en el ObjectJS / JSON con la clave [DS_MERCHANT_ORDER]
 * @param {*} key - Clave SHA-256 proporcionada por el banco.
 * @returns El valor de la clave de la transaccion codificado en 3DES-CBC
 */
function encrypt3DES(orderID, key){

    const keyWordArray = CryptoJS.enc.Base64.parse(key);
    const iv = CryptoJS.enc.Hex.parse("0000000000000000");
    const cipher = CryptoJS.TripleDES.encrypt(orderID, keyWordArray, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });

    return cipher;

}

