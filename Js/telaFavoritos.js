var livros = JSON.parse(localStorage.getItem("listaLivros")) || [];
var favorites = [];

var favoritos = document.getElementById("divBookfavoritos");

window.onload = function () {
    separaFavoritos();
    mostrarFavoritos(favorites);
};

function separaFavoritos(){
    for(let i = 0; i<livros.length; i++){
        if(livros[i].avaliacao == 5){
            favorites.unshift(livros[i]);
        }
    }
}


function mostrarFavoritos(listaF){
    let imagensFavoritos = [
        document.getElementById("favoritos1"),
        document.getElementById("favoritos2"),
        document.getElementById("favoritos3"),
        document.getElementById("favoritos4"),
        document.getElementById("favoritos5")
    ];

    let editar = [
        document.getElementById("editT1"),
        document.getElementById("editT2"),
        document.getElementById("editT3"),
        document.getElementById("editT4"),
        document.getElementById("editT5"),
      ]

    for(let i = 0; i < 5; i++){
        imagensFavoritos[i].src = "";
        imagensFavoritos[i].style.display = "none";
        editar[i].style.display = "none";
        editar[i].onclick = null;
    }

    for(let i = 0; i < listaF.length; i++){
        if(listaF[i]){
            imagensFavoritos[i].src = listaF[i].capa;
            imagensFavoritos[i].style.display = "block";
            editar[i].style.display = "block";
            editar[i].onclick = () => selecionarLivroParaEdicao(listaF[i].id);
            } else {
            imagensFavoritos[i].style.display = "none";
        }
    }
}

function selecionarLivroParaEdicao(livroId) {
    localStorage.setItem("livroParaEdicao", livroId);
    window.location.href = "/TELAS/telaEditarLivro.html";
  }


document.getElementById("filtro-genero").addEventListener("change", function () {
    let arrayGenero = [];
    var genero = document.getElementById("filtro-genero").value;

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].genero === genero) {
            arrayGenero.push(favorites[i]);
        }
    }

    if (genero === "") {
        arrayGenero = favorites;
    }

    mostrarFavoritos(arrayGenero);
});


const setaDireita = document.getElementById("seta-direita");
const setaEsquerda = document.getElementById("seta-esquerda");

setaDireita.addEventListener("click", function(){
    setaEsquerda.style.display = "block";
    setaDireita.style.display = "none";
   mostrarRecentes(recentes.slice(5, 9));
})

setaEsquerda.addEventListener("click", function(){
    setaEsquerda.style.display = "none";
    setaDireita.style.display = "block";
    mostrarRecentes(recentes.slice(0,5));
})