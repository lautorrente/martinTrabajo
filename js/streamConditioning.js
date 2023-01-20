// STREAM CONDITIONING ENDPOINT VALUES
let inputEndpointID = document.getElementById('input-endpoint-id');
let inputEndpointNetworkN = document.getElementById('input-endpoint-netName');
let inputEndpointZoneIdent = document.getElementById('input-endpoint-ZoneIdentity');
let inputNameID = document.getElementById('input-name-id');
// BUTTONS
let btnAddEndpoints = document.getElementById('button-add-endpoints');
let btnAddSignal = document.getElementById('btnAddSignals');
let btnSaveChanges = document.getElementById('btnSaveChanges');
let btnAddBlock = document.getElementById('button-add-block');


// ELEMENTOS SIGNAL ACQUISITIONS

let inputURL = document.getElementById('sa-input-url');
let inputListeningPath = document.getElementById('sa-input-listening-path');
let btnDeleteSignal = document.getElementById('button-trash-signal-aq');
// CONTAINER
let signalAcquisitionsContainer = document.getElementById('signal-acquisitions-container');
let signalBlockContainer = document.getElementById('signal-block-container');


// CREAR CLASE PARA SIGNAL ACQUISITIONS
class signalAcquisitions {
    constructor(url, listeningPath){
        this.url = url;
        this.listeningPath = listeningPath;
    }
}
// ARRAY 
const signalsArray = [];

// PUSH AL ARRAY

//PARSEAR A JS
function parseAcquisitions() {
        let acquisitionsStr = JSON.stringify(signalsArray);
        console.log(acquisitionsStr);
    }

btnSaveChanges.addEventListener('click', () => {
    let url = inputURL.value;
    let listeningPath = inputListeningPath.value;
    let objeto = new signalAcquisitions(url, listeningPath);
    signalsArray.push(objeto);
    console.log(signalsArray);
    parseAcquisitions();

    if (signalsArray.length === 2) {
        btnAddEndpoints.classList.add('d-none');
    }
    else {
        
    }
})

// DELETE ELEMENT 
btnDeleteSignal.addEventListener('click', () => {
    signalsArray.splice(0);
    console.log(signalsArray);
    signalBlockContainer.classList.add('d-none');
    btnAddSignal.classList.remove('d-none');

});


// ATTRIBUTES ------------------------------------
btnAddAttributes = document.getElementById('button-add-attributes');
// CONTAINER
let attributesContainer = document.getElementById('majorAttributesContainer');


// CREAR ATRIBUTOS
btnAddAttributes.addEventListener('click', () => {
    let div = document.createElement('div');
    div.className = 'attributes-container';
    div.innerHTML = `
    <div><span>Name</span><input type="text" name="" id="attributes-name"></div>
    <div><span>Value</span><input type="text" name="" id="attributes-value"></div>
    <div><span>Actions</span><span id="trash-attributes"></span></div>
    `;
    attributesContainer.appendChild(div);
})

// VER LOS DATOS EN PANTALLA
let spaceID = document.getElementById('space-id-endpoint');
let spaceNetName = document.getElementById('space-netName-endpoint');
let spaceZoneId = document.getElementById('space-zoneId-endpoint');
let spaceURL = document.getElementById('space-URL-endpoint');
let spaceAttributes = document.getElementById('space-attributes-endpoint');
let spaceActions = document.getElementById('space-actions-endpoint');

btnSaveChanges.addEventListener('click', () => {
    spaceID.innerHTML = inputEndpointID.value;
    spaceNetName.innerHTML = inputEndpointNetworkN.value;
    spaceZoneId.innerHTML = inputEndpointZoneIdent.value;
    spaceURL.innerHTML = inputURL.value;
    /* spaceAttributes.innerHTML = `
    ${inputAttributeName.value}:${inputAttributeValue.value}
    `;
    spaceActions.innerHTML = `
    <button class="button-trash"><i class="fa-solid fa-trash"></i></button>
    `;

    capturarDatos(); */
})

//

// TRAER API SC
let btnSaveExit = document.getElementById('btnSaveExit');
let llamadaApiSC = btnSaveExit.addEventListener('click', () => {
    fetch(`https://cors-anywhere.herokuapp.com/http://152.171.185.241:8080/api/services/streamConditionings`, {
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(
        {
            "id" : `${inputNameID.value}`,
             "connection": {
                 "type": "esam",
                 "mode": "external",
                 "esamVersion": "2013",
                 "healthCheck": false,
                 "expectNotifications": false,
                 "endPoints": [{
                     "id": `${inputEndpointID.value}`,
                     "dataId": "5f60afb7b994673a62f6c450",
                     "networkName": `${inputEndpointNetworkN.value}`,
                     "zoneIdentity": `${inputEndpointZoneIdent.value}`,
                     "signalAcquisitions": signalsArray,
                     "server": {
                        "port": 8975
                     }
                 }]
             },
             "timings": {
                  "eventExpirationDelay": 86400,
                  "eventPrerollDelay": 5,
                  "prepareDelayForPlayRequest": 8,
                  "prepareDelayForSelectInput": 5
            }
          })
    
})
.then(response => response.json())
.then(data => console.log(data));
});


// LOCAL STORAGE
let inputTypeOfService = document.getElementById('input-stream-conditioning');



/*------------- VER CANALES EN EL INDEX ------------------*/ 
btnSaveExit.addEventListener('click', () => {
    localStorage.setItem("Name of service", inputNameID.value);
    localStorage.setItem("Type of service", inputTypeOfService.value);
    let div = document.createElement('div');
    div.innerHTML = `
    <p>${localStorage.getItem('Name of Service')}</p>
    <p>${inputTypeOfService.value}</p>
    <div>
        <span><i class="fa-solid fa-pen-to-square"></i></span>
        <span><i class="fa-solid fa-trash"></i></span>
    </div>
    `;
    channels.appendChild(div);
})