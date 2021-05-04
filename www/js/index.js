/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);

// Variables generales:
let body = document.getElementById("body");

// Booleanos generales:
let skipWizard = false;

// Modal variables: 
let modalBtn = $("#wizard-floating-btn");
let modalPage = 0;

// Funcion inicial
function onDeviceReady() {
    if (!skipWizard) {
        $("#wizard").modal('open');

        // Paginamiento del wizard:
        modalBtn.on( "click", function() {
            wizardPageControl();
        });
    }
}

// Funciones Tab Inici (Dashboard):

// Funciones Tab Requisits:

// Funciones Tab UFs:

// Funciones Tab Dades:

// Funciones generales:
function applyPulseEffect(id) {
    $("#" + id).addClass("pulse");
}

function removePulseEffect(id) {
    $("#" + id).removeClass("pulse");
}

function applyDisabledClass(id) {
    $("#" + id).addClass("disabled");
}

function removeDisabledEffect(id) {
    $("#" + id).removeClass("disabled");
}