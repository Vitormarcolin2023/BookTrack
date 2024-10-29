var livros = JSON.parse(localStorage.getItem("listaLivros")) || [];
var favoritos = document.getElementById("divBookfavoritos");

window.onload = function () {
    mostrarFavoritos(livros);  // Exibe todos os livros diretamente
};

function mostrarFavoritos(listaF){
    let imagensFavoritos = [
        document.getElementById("favoritos1"),
        document.getElementById("favoritos2"),
        document.getElementById("favoritos3"),
        document.getElementById("favoritos4"),
        document.getElementById("favoritos5")
    ];

    for(let i = 0; i < 5; i++){
        imagensFavoritos[i].src = "";
        imagensFavoritos[i].style.display = "none";
    }

    for(let i = 0; i < listaF.length; i++){
        if(listaF[i]){
            imagensFavoritos[i].src = listaF[i].capa;
            imagensFavoritos[i].style.display = "block";
        } else {
            imagensFavoritos[i].style.display = "none";
        }
    }
}

document.getElementById("filtro-genero").addEventListener("change", function () {
    let arrayGenero = [];
    var genero = document.getElementById("filtro-genero").value;

    for (let i = 0; i < livros.length; i++) {
        if (livros[i].genero === genero) {
            arrayGenero.push(livros[i]);
        }
    }

    if (genero === "") {
        arrayGenero = livros;
    }

    mostrarFavoritos(arrayGenero);
});

const setaDireita = document.getElementById("seta-direita");
const setaEsquerda = document.getElementById("seta-esquerda");

setaDireita.addEventListener("click", function(){
    setaEsquerda.style.display = "block";
    setaDireita.style.display = "none";
    mostrarRecentes(recentes.slice(5, 9));
});

setaEsquerda.addEventListener("click", function(){
    setaEsquerda.style.display = "none";
    setaDireita.style.display = "block";
    mostrarRecentes(recentes.slice(0, 5));
});
