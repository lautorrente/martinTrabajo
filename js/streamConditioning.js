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


// CREAR CLASE PARA SIGNAL ACQUISITIONS
class signalAcquisitions {
    constructor(url, listeningPath){
        this.url = url;
        this.listPath = listeningPath;
    }
}
// ARRAY 
const signalsArray = [];

// PUSH AL ARRAY


// AGREGAR 2do BLOQUE SIGNAL ACQUISITIONS
btnAddBlock.addEventListener('click', () => {
    btnAddBlock.classList.add('d-none');
    let div = document.createElement('div');
    div.innerHTML = `
    <div id="signal-block-container2">
        <div><span>URL</span><input type="text" placeholder="http://" id="sa-input-url2"></div>
        <div><span>Listening Path</span><input type="text" placeholder="/" id="sa-input-listening-path2"></div>
        <div><span>Actions</span><span id="button-trash-signal-aq2"><i class="fa-solid fa-trash"></i></span></div>
    </div>
    `;
    signalAcquisitionsContainer.appendChild(div);
    
    
})
// ELEMENTOS 2do BLOQUE 
let inputURL2 = document.getElementById('sa-input-url2');
let inputListeningPath2 = document.getElementById('sa-input-listening-path2');
let btnDeleteSignal2 = document.getElementById('button-trash-signal-aq2');

btnSaveChanges.addEventListener('click', () => {
    let url = inputURL.value;
    let listeningPath = inputListeningPath.value;
    let objeto = new signalAcquisitions(url, listeningPath);
    signalsArray.push(objeto);

    let url2 = inputURL2.value;
    let listeningPath2 = inputListeningPath2.value;
    let objeto2 = new signalAcquisitions(url2, listeningPath2);
    signalsArray.push(objeto2);
    console.log(signalsArray);
})


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
let llamadaApi = btnSaveExit.addEventListener('click', () => {
    fetch(`https://cors-anywhere.herokuapp.com/http://152.171.185.241:8080/api/services/streamConditionings/PRISMA_EVEN/endPoints/PRISMABARKER_zone1/operations/${inputId.value}`, {
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
                     "signalAcquisitions": [
                        {
                            "url": "http://10.3.3.36:80003/esam?tt=12",
                            "listeningPath": "/?variant=Primary"
                        },
                        {
                            "url": "http://10.3.3.37:80003/esam?tt=12",
                            "listeningPath": "/?variant=Secondary"
                        }
                     ],
                     "server": {
                        "port": 8975
                     }
                 }]
             },
             "notification": {
                 "receivers": [
                     {
                         "id": "webhookEp1",
                         "url": "http://172.17.159.45:3000/webhookEp1",
                         "eventType": "scte35",
                         "signal": "incoming",
                         "filters": [
                             [
                                 {
                                     "field": "{{segmentationTypeId}}",
                                     "operator": "==",
                                     "value": "16"
                                 }
                             ]
                         ],
                         "key": " "
                     },
                     {
                         "id": "webhookEp2",
                         "eventType": "scte35",
                         "url": "http://172.17.159.45:3000/webhookEp2",
                         "signal": "outgoing",
                         "filters": []
                     }
                 ]
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