/*CAPTURAR DATOS AL GUARDAR CAMBIOS PARA CREAR LA PLAYLIST*/
const inputName = document.getElementById('input-name');
const inputId = document.getElementById('input-id');
const btnGuardar = document.getElementById('button-guardar');
const btnAddClips = document.getElementById('button-add-clips');
const inputMaterialId = document.getElementById('input-material-id');
const inputDuration = document.getElementById('input-duration');
const inputStartOffset = document.getElementById('input-startOffset');
// MODAL
const openModal = document.getElementById('open-modal');
const btnguardarClips = document.getElementById('guardarClips');
const clipsView = document.getElementById('container-clips-view');
// INDEX
const channels = document.getElementById('channels-container');

// CREAR CLASE PARA GUARDAR LOS CLIPS
class Clips {
    constructor(materialId, duration, startOffset){
        this.materialId = materialId;
        this.duration = duration;
        this.startOffset = startOffset;
        
    }
}
// ARRAY DE CLIPS
const clips = [];

// PARSEAR CLIPS DE OBJETO A STRING
function parseClips() {
    let clipsStr = JSON.stringify(clips);
    console.log(clipsStr[2]);
    console.log(clipsStr);
}
// CREAR LOS CLIPS
function crearClips() {
    let clipMaterialId = inputMaterialId.value;
    let clipDuration = inputDuration.value;
    let clipStartOffset = inputStartOffset.value;
    let objeto = new Clips(clipMaterialId, clipDuration, clipStartOffset);
    clips.push(objeto);
    console.log(clips);
    parseClips();
}
//EJECUCION
btnguardarClips.addEventListener('click', crearClips);

/* FUNCION CAPTURAR DATOS INPUT Y BUTTON*/
function capturarDatos() {
    let name = inputName.value;
    let id = inputId.value;
    let clipMaterialId = inputMaterialId.value;
    let clipDuration = inputDuration.value;
    let clipStartOffset = inputStartOffset.value;
}
btnGuardar.addEventListener('click', capturarDatos);

// PARA VER CUANDO CREAMOS LOS CLIPS
btnguardarClips.addEventListener(`click`, () => {
    let div = document.createElement('div');
    div.className = 'div-clips-headers'
    div.innerHTML = `
    <p>Material Id</p>
    <p>Duration (in sec)</p>
    <p>Start Offset (in sec)</p>
    <p>Actions</p>
    <hr>
    `;

    clipsView.appendChild(div);
    let div2 = document.createElement('div');
    div2.className = 'div-clips-clips';
    div2.innerHTML = `
    <p>${inputMaterialId.value}</p>
    <p>${inputDuration.value}</p>
    <p>${inputStartOffset.value}</p>
    <div class="buttons-edit-delete">
    <button id="buttonEdit"><i class="fa-light fa-pen-to-square" id="button-edit"></i></button>
    <button id="buttonDelete"><i class="fa-light fa-trash" id="button-delete"></i></button>
    </div>
    `
    clipsView.appendChild(div2);
})

/*TRAER API*/
let llamadaApi = btnGuardar.addEventListener('click', () => {
    fetch(`https://cors-anywhere.herokuapp.com/http://152.171.185.241:8080/api/services/streamConditionings/PRISMA_EVEN/endPoints/PRISMABARKER_zone1/operations/${inputId.value}`, {
    'method': 'PUT',
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(
            {
                id: `${inputId.value}`,
                type: "mediaPlaylist",
       clips: clips,
       name: `${inputName.value}`
    })
    
})
.then(response => response.json())
.then(data => console.log(data));
});

// VER LOS CANALES EN EL INDEX
/* btnGuardar.addEventListener('click', () => {
    let div = createElement('div');
    div.innerHTML= `
    <p>${inputName.value}</p>
    <p>Stream Conditioning</p>
    <div>
        <button><i class="fa-light fa-pen-to-square" id="channel-button-edit"></i></button>
        <button><i class="fa-light fa-trash" id="channel-button-delete"></i></button>
    </div>
    `
    channels.appendChild(div);

}) */
