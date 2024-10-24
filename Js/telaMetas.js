window.onload = function() {
    carregarMetas();
    carregarMetaAnual();
};

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
        }
    });

    salvarMetasNoLocalStorage(metas);

    document.getElementById("modalExcluirMeta").style.display = "none";
}

function salvarMetasNoLocalStorage(metas) {
    localStorage.setItem("metas", JSON.stringify(metas));
}

function obterMetasDoLocalStorage() {
    var metas = localStorage.getItem("metas");
    return metas ? JSON.parse(metas) : [];
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
    }

    document.getElementById("inputPrompt").value = "";
    document.getElementById("promptMeta").style.display = "none";
}

function salvarMetaAnualNoLocalStorage(metaAnual) {
    localStorage.setItem("metaAnual", metaAnual);
}

function obterMetaAnualDoLocalStorage() {
    return localStorage.getItem("metaAnual");
}

function carregarMetaAnual() {
    var metaAnual = obterMetaAnualDoLocalStorage();
    
    if (metaAnual) {
        document.getElementById("metaAnualContainer").innerText = metaAnual;
    }
}

function lerMetaAnual() {
    var metaAnual = document.getElementById("inputMetaAnual").value;

    if (metaAnual) {
        document.getElementById("metaAnualContainer").innerText = metaAnual;
        salvarMetaAnualNoLocalStorage(metaAnual);
    }

    document.getElementById("inputMetaAnual").value = "";
    document.getElementById("modalMetaAnual").style.display = "none";
}

function carregarMetas() {
    var metas = obterMetasDoLocalStorage();

    metas.forEach(function(meta) {
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
    });
}