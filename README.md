# app
--------------------------------
****ENDPOINTS DOCUMENTATION****:
--------------------------------

<h2>Alumn Login</h2>
<h4>REQUEST</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>email
</td>
<td>text
</td>
<td>Email de usuari
</td></tr>
<tr>
<td>password
</td>
<td>text
</td>
<td>Password del usuari hasheada a SHA256
</td></tr></tbody></table>
<br>
<h4>RESPONSE</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>status
</td>
<td>text
</td>
<td>OK o KO dependiendo de si el login ha sido correcto o no
</td></tr>
<tr>
<td>statusData
</td>
<td>text
</td>
<td>en caso de OK será el token con el user_id y la caducidad dentro, en caso de KO será el mensaje de error con el motivo
</td>
</tr>
<tr>
<td>statusMatricula
</td>
<td>int
</td>
<td>0 si no se han puesto los documentos necesarios para el perfil, 1 si los documentos están pendientes de verificación, y 2 cuando la matrícula ya se ha completado
</td></tr> 
<tr>
<td>boolWizard
</td>
<td>boolean
</td>
<td>true si ya ha configurado su perfil con el wizard y false si todavía no lo ha hecho
</td></tr>   
</tbody></table>

<h2>Get profiles and requirements</h2>
<h4>REQUEST (url query)</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">GET 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>token
</td>
<td>text
</td>
<td>Token de usuario
</td></tr>
</tbody></table>
<br>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td></td><td></td><td>Se devuelve un array de JSON que contiene los perfiles de la base de datos y dentro otro array con sus respectivos requisitos.</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /get/grade
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>


  <h2>Get Grade</h2>
    <h4>REQUEST (url query)</h4>
    <table class="wikitable">
<tbody><tr>
<th colspan="3">Request (url query)
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>token
</td>
<td>text
</td>
<td>Token del usuario
</td></tr>
<tr>
<td>carreerCode
</td>
<td>text
</td>
<td>Codigo del ciclo
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td></td><td></td><td>Se devuelve un objeto JSON de grado entero, igual que el de base de datos. 
</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>


<h2>Insert wizard</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON(Array)
</th></tr>
<tr>
<th colspan="3">POST
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description</th>
<tr>
<td>documentsProfile</td>
<td>JSON Object</td>
<td>Se debe informar de un objeto JSON de perfil entero, igual que el de base de datos.</td></tr>
<tr><td>overwrite</td><td>text</td><td>Permite sobreescribir en caso de que ya exista un perfil con el mismo nombre. Debe ser "true" o "false" en texto plano</td></tr></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/documentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>insertCount
</td>
<td>integer
</td>
<td>Numero de inserciones
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /insert/documentsProfile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>



<h2>Get user info</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description</th>
<tr>
<td>token</td>
<td>text</td>
<td>Token de usuario</td></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>name
</td>
<td>text
</td>
<td>Nombre del usuario
</td>
<tr>
<td>firstSurname
</td>
<td>text
</td>
<td>Primer apellido del usuario
</td>
<tr>
<td>secondSurname
</td>
<td>text
</td>
<td>Segundo apellido del usuario
</td>
<tr>
<td>DNI
</td>
<td>text
</td>
<td>DNI del usuario
</td>
<tr>
<td>birthplace
</td>
<td>text
</td>
<td>Lugar de nacimiento del usuario
</td>
<tr>
<td>birthday
</td>
<td>text
</td>
<td>Fecha de nacimiento del usuario
</td>
<tr>
<td>address
</td>
<td>text
</td>
<td>Dirección del usuario
</td>
<tr>
<td>city
</td>
<td>text
</td>
<td>Ciudad del usuario
</td>  
<tr>
<td>postal_code 
</td>
<td>text
</td>
<td>Código postal del usuario
</td>  
<tr>
<td>phone_number  
</td>
<td>text
</td>
<td>Número de telefono del usuario
</td>
<tr>
<td>emergency_number   
</td>
<td>text
</td>
<td>Número de telefono de emergéncia del usuario
</td>
<tr>
<td>tutor_1   
</td>
<td>text
</td>
<td>Primer tutor del usuario
</td>
<tr>
<td>tutor_2   
</td>
<td>text
</td>
<td>Segundo tutor del usuario
</td>
</tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>



<h2>Get image rights</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>token
</td>
<td>text
</td>
<td>Token de usuario
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : Text
</th></tr>
<tr>
<th colspan="3">GET 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>imageRightsText
</td>
<td>text
</td>
<td>Texto de los derechos de imagen
</td></tr>
</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : text
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<h2>Insert image rights</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : text
</th></tr>
<tr>
<th colspan="3">POST
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description</th>
<tr>
<td>imageRightsTest</td>
<td>Text</td>
<td>Texto de los derechos que ha aceptado el usuario</td></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response 
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
</tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<h2>Get document requirements</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>token
</td>
<td>text
</td>
<td>Token de usuario
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON(Array)
</th></tr>
<tr>
<th colspan="3">GET 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>documentRequirements
</td>
<td>JSON Object
</td>
<td>Objeto JSON de los requisitos de documentos
</td></tr>
</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : text
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<h2>Get user UFs</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>token
</td>
<td>text
</td>
<td>Token de usuario
</td></tr>
</tbody></table>
<h4>RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON(Array)
</th></tr>
<tr>
<th colspan="3">GET 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>ufList
</td>
<td>JSON
</td>
<td>Array de las UFs seleccionadas por el usuario a la hora de matricularse(Almacenado en el user)
</td></tr>
</td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : text
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<h2>Insert user UFs</h2>
<h4> REQUEST </h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Request : JSON(Array)
</th></tr>
<tr>
<th colspan="3">POST
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description</th>
<tr>
<td>ufList</td>
<td>JSON</td>
<td>Array de las UFs seleccionadas por el usuario a la hora de matricularse(Almacenado en el user)</td></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response 
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
</tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>




<h2>Upload Documents File</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : FORM DATA
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>token</td><td>Text</td><td>Token del alumno</td></tr>
<tr><td>file</td><td>archivo</td><td>Fichero que se sube en base 64</td></tr></tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>ok
</td>
<td>text
</td>
<td>contiene "Fichero subido correctamente"
</td></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>



<h2>Get Document</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : GET
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>email</td><td>Text</td><td>Email del alumno</td></tr>
  <tr><td>profileName</td><td>text</td><td>Nombre del perfil</td></tr>
  <tr><td>documentName</td><td>text</td><td>Nombre del documento</td></tr>
  </tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET 
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>filePath
</td>
<td>text
</td>
<td>contiene la ruta del fichero (incluye el nombre y extension)
  </td></tr>
  <tr>
<td>data
</td>
<td>text
</td>
<td>Fichero en string base64
  </td></tr></tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>


<h2>Update, validate file</h2>
  <h4> REQUEST </h4>
  <table class="wikitable">
<tbody><tr>
<th colspan="3">Request : POST
</th></tr>
<tr>
<th colspan="3">POST /update/validateFile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th><tr><td>email</td><td>Text</td><td>Email del alumno</td></tr>
  <tr><td>profileName</td><td>text</td><td>Nombre del perfil</td></tr>
  <tr><td>documentName</td><td>text</td><td>Nombre del documento</td></tr>
  </tr>
</tbody></table>
<h4> RESPONSE STATUS 200</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/validateFile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>ok
</td>
<td>text
</td>
<td>contiene "fichero validado correctamente"
  </td></tr>
  </tbody></table>
<h4> RESPONSE STATUS 400</h4>
<table class="wikitable">
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /update/validateFile
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>error
</td>
<td>text
</td>
<td>Motivo del error
</td></tbody></table>
