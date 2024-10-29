window.onload = function() {
    carregarMetas();
    carregarMetaAnual();
    lerStatusDeLeitura();
};

function salvarEstadoCheckbox(id, checked) {
    let estadosCheckbox = JSON.parse(localStorage.getItem("estadosCheckbox")) || {};
    estadosCheckbox[id] = checked;
    localStorage.setItem("estadosCheckbox", JSON.stringify(estadosCheckbox));
}

function carregarEstadosCheckbox() {
    return JSON.parse(localStorage.getItem("estadosCheckbox")) || {};
}

function mostrarPromptMetas() {
    document.getElementById("promptMeta").style.display = "flex";
}

function mostrarPromptMetaAnual() {
    document.getElementById("modalMetaAnual").style.display = "flex";
}

function mostrarPromptExcluirMetas() {
    document.getElementById("modalExcluirMeta").style.display = "flex";

    var excluirContainer = document.getElementById("inputExcluirMeta");
    excluirContainer.innerHTML = "";

    var checkboxes = document.querySelectorAll("#listaCheckbox input[type='checkbox']");

    checkboxes.forEach(function(checkbox) {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.id = "excluir_" + checkbox.id;

        var newLabel = document.createElement("label");
        newLabel.htmlFor = "excluir_" + checkbox.id;
        newLabel.innerText = checkbox.id;

        var checkboxContainer = document.createElement("div");
        checkboxContainer.appendChild(newCheckbox);
        checkboxContainer.appendChild(newLabel);

        excluirContainer.appendChild(checkboxContainer);
    });
}

function salvarMetasNoLocalStorage(metas) {
    localStorage.setItem("metas", JSON.stringify(metas));
}

function obterMetasDoLocalStorage() {
    var metas = localStorage.getItem("metas");
    return metas ? JSON.parse(metas) : [];
}

function salvarMetaAnualNoLocalStorage(metaAnual) {
    localStorage.setItem("metaAnual", metaAnual);
}

function obterMetaAnualDoLocalStorage() {
    return localStorage.getItem("metaAnual");
}

function lerMetaAnual() {
    var metaAnual = document.getElementById("inputMetaAnual").value;

    salvarMetaAnualNoLocalStorage(metaAnual);
    carregarMetaAnual();

    document.getElementById("inputMetaAnual").value = "";
    document.getElementById("modalMetaAnual").style.display = "none";
}

function carregarMetaAnual() {
    var metaAnual = obterMetaAnualDoLocalStorage();
    var listaLivros = obterStatusDeLeitura();
    var livrosConcluidos = listaLivros.filter(livro => livro.progresso === "concluido").length;

    if (metaAnual) {
        desenharCirculoProgresso(metaAnual, livrosConcluidos);
    }
}

function lerImput() {
    var meta = document.getElementById("inputPrompt").value;

    if (meta) {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.id = meta;

        var newLabel = document.createElement("label");
        newLabel.htmlFor = meta;
        newLabel.innerText = meta;

        var checkboxContainer = document.createElement("div");
        checkboxContainer.appendChild(newCheckbox);
        checkboxContainer.appendChild(newLabel);

        document.getElementById("listaCheckbox").appendChild(checkboxContainer);

        var metas = obterMetasDoLocalStorage();
        metas.push(meta);
        salvarMetasNoLocalStorage(metas);

        newCheckbox.addEventListener("change", function() {
            salvarEstadoCheckbox(meta, newCheckbox.checked);
        });
    }

    document.getElementById("inputPrompt").value = "";
    document.getElementById("promptMeta").style.display = "none";
}

function carregarMetas() {
    var metas = obterMetasDoLocalStorage();
    var estadosCheckbox = carregarEstadosCheckbox();

    metas.forEach(function(meta) {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.id = meta;

        newCheckbox.checked = estadosCheckbox[meta] || false;

        var newLabel = document.createElement("label");
        newLabel.htmlFor = meta;
        newLabel.innerText = meta;

        var checkboxContainer = document.createElement("div");
        checkboxContainer.appendChild(newCheckbox);
        checkboxContainer.appendChild(newLabel);

        document.getElementById("listaCheckbox").appendChild(checkboxContainer);

        newCheckbox.addEventListener("change", function() {
            salvarEstadoCheckbox(meta, newCheckbox.checked);
        });
    });
}

function lerExcluirMeta() {
    var metas = obterMetasDoLocalStorage();

    var checkboxesExcluir = document.querySelectorAll("#inputExcluirMeta input[type='checkbox']");

    checkboxesExcluir.forEach(function(checkboxExcluir) {
        if (checkboxExcluir.checked) {
            var originalMeta = checkboxExcluir.id.replace("excluir_", "");

            var originalCheckbox = document.getElementById(originalMeta);
            if (originalCheckbox) {
                originalCheckbox.parentElement.remove();
            }

            metas = metas.filter(function(meta) {
                return meta !== originalMeta;
            });

            let estadosCheckbox = carregarEstadosCheckbox();
            delete estadosCheckbox[originalMeta];
            localStorage.setItem("estadosCheckbox", JSON.stringify(estadosCheckbox));
        }
    });

    salvarMetasNoLocalStorage(metas);

    document.getElementById("modalExcluirMeta").style.display = "none";
}

function obterStatusDeLeitura() {
    var listaLivros = localStorage.getItem("listaLivros");
    return listaLivros ? JSON.parse(listaLivros) : [];
}

function lerStatusDeLeitura() {
    var statusElemento = document.getElementById("statusLivro");
    var listaLivros = obterStatusDeLeitura();
    var livrosConcluidos = 0;

    listaLivros.forEach(function(livro) {
        if (livro.progresso === "concluido") {
            livrosConcluidos += 1;
        }
    });

    statusElemento.innerHTML = "Livros concluídos: " + livrosConcluidos;
}

function desenharCirculoProgresso(metaAnual, livrosConcluidos) {
    const canvas = document.getElementById("progressCircle");
    const ctx = canvas.getContext("2d");

    const radius = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const progresso = Math.min(livrosConcluidos / metaAnual, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, (2 * Math.PI * progresso) - 0.5 * Math.PI);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#C5A880";
    ctx.stroke();

    ctx.fillStyle = "#C5A880";
    ctx.font = "45px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(metaAnual, centerX, centerY);
}