function mostrarPromptMetas() {
    document.getElementById("promptMeta").style.display = "flex";
}

function mostrarPromptMetaAnual(){
    document.getElementById("modalMetaAnual").style.display = "flex";
}

function lerImput() {
    var metas = document.getElementById("inputPrompt").value;

    if (metas) {
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.id = metas;

        var newLabel = document.createElement("label");
        newLabel.htmlFor = metas;
        newLabel.innerText = metas;

        var checkboxContainer = document.createElement("div");
        checkboxContainer.appendChild(newCheckbox);
        checkboxContainer.appendChild(newLabel);

        document.getElementById("listaCheckbox").appendChild(checkboxContainer);
    }

    document.getElementById("inputPrompt").value = "";
    document.getElementById("promptMeta").style.display = "none";
}

function lerMetaAnual(){
    var metaAnual = document.getElementById("inputMetaAnual").value;
    if(metaAnual){
        document.getElementById("metaAnualContainer").innerText = metaAnual;
    }

    document.getElementById("inputMetaAnual").value = "";
    document.getElementById("modalMetaAnual").style.display = "none";
}