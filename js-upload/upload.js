const form = document.querySelector('form');
const fileInput = document.querySelector('.file-input');
const progresoArea = document.querySelector('.progreso-area');
const subidoArea = document.querySelector('.subido-area');

form.addEventListener('dragover', (e) => {
    e.preventDefault();
});

form.addEventListener('drop', (e) => {
    e.preventDefault();

    fileInput.files = e.dataTransfer.files;
    let file = fileInput.files[0];
    preUploadFile(file);
});

form.addEventListener('click', (e) => {
    fileInput.click();
});

form.addEventListener('change', (e) => {
    let file = fileInput.files[0];
    preUploadFile(file);
});

function preUploadFile(file) {
    if (file) {
        let filename = file.name;
        if (filename.length >= 12) {
            let splitName = filename.split('.');
            filename = splitName[0].substring(0, 12) + '... .' + splitName[1];
        }
        uploadFile(filename);
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/upload.php');

    xhr.upload.addEventListener('progress', (e) => {
        let fileLoaded = Math.floor((e.loaded / e.total) * 100);
        let fileTotal = Math.floor(e.total / 1000);
        let fileSize = (fileTotal < 1024) ? fileTotal + ' KB' : (e.loaded / (1024 * 1024)).toFixed(2) + ' MB';
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="contenido">
                                    <div class="detalles">
                                        <span class="nombre">${name} • Subiendo</span>
                                        <span class="porcentaje">${fileLoaded}%</span>
                                    </div>
                                    <div class="progreso-bar">
                                        <div class="progreso" style="width: ${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`;

        subidoArea.classList.add('onprogress');
        progresoArea.innerHTML = progressHTML;
        if(e.loaded == e.total) {
            progresoArea.innerHTML = '';
            let uploadedHTML = `<li class="row">
                                    <div class="contenido">
                                        <i class="fas fa-file-alt"></i>
                                        <div class="detalles">
                                            <span class="nombre">${name} • Subido</span>
                                            <span class="size">${fileSize}</span>
                                        </div>
                                    </div>
                                    <i class="fas fa-check"></i>
                                </li>`;
            subidoArea.classList.remove('onprogress');
            subidoArea.insertAdjacentHTML('afterbegin', uploadedHTML);
        }
    });

    let formData = new FormData(form);
    xhr.send(formData);
}
