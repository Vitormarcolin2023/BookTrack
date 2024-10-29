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
            favorites.unshift(livros[i]); // adiciona no inicio do array
        }
    }
}


// Igual a função de mostrarRecentes
function mostrarFavoritos(listaF){
    let imagensFavoritos = [
        document.getElementById("favoritos1"),
        document.getElementById("favoritos2"),
        document.getElementById("favoritos3"),
        document.getElementById("favoritos4"),
        document.getElementById("favoritos5")
    ]

    for(let i=0; i<5; i++){
        imagensFavoritos[i].src = "";
        imagensFavoritos[i].style.display = "none";
   }

    for(let i=0; i<listaF.length; i++){

        if(listaF[i]){
            imagensFavoritos[i].src = listaF[i].capa;
            imagensFavoritos[i].style.display= "block";
        }
        else{
            imagensFavoritos[i].style.display = "none";
        }
    }
}

// Função para filtrar gêneros
document.getElementById("filtro-genero").addEventListener("change", function () {
    let arrayGenero = []; // Recebe as informações que serão mostradas em favoritos

    var genero = document.getElementById("filtro-genero").value; // Recebe o value da seleção de gênero

    // Percorre o array de favoritos para encontrar os gêneros
    for (let i = 0; i < favorites.length; i++) {
        // Se gênero selecionado = gênero do livro:
        if (favorites[i].genero === genero) {
            arrayGenero.push(favorites[i]);
        }
    }

    // Caso o valor da seleção seja vazio, ou seja, a opção "Todos"
    if (genero === "") {
        arrayGenero = favorites; // Mostra todos os favoritos
    }

    mostrarFavoritos(arrayGenero); // Mostra apenas os livros favoritos filtrados
});


// Constantes para guardar ids das setas no carrossel de livros
const setaDireita = document.getElementById("seta-direita");
const setaEsquerda = document.getElementById("seta-esquerda");

// Controla aparição e sumiço de setas e livros a serem mostrados
setaDireita.addEventListener("click", function(){
    setaEsquerda.style.display = "block";
    setaDireita.style.display = "none";
   mostrarRecentes(recentes.slice(5, 9)); // passa como parâmetro um pedaço do array recentes, apenas as informações dos últimos 5
})

setaEsquerda.addEventListener("click", function(){
    setaEsquerda.style.display = "none";
    setaDireita.style.display = "block";
    mostrarRecentes(recentes.slice(0,5)); // as informações dos 5 primeiros
})