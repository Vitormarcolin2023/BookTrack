var livros = JSON.parse(localStorage.getItem("listaLivros")) || []; // recupera as infos em local storage
var recentes = []; // separa e armazena informações dos recentes
var trash = []; // separa e armazena informações de BookTrash

const divRecentes = document.getElementById("recente"); // container para apresentar lidos recentemente
const booktrash = document.getElementById("divBooktrash"); //container para apresentar bookTrash

console.log(livros[1].avaliacao);

// função para incluir no array "recentes" os últimos 5 livros adicionados
function separaRecentes(){
    for(let i = livros.length-1; i>=livros.length-5; i--){ // começa do último livro incluso e para com 5
        recentes.push(livros[i]); // inclui no array recentes
    }
    console.log(recentes) // teste :)
}

//função para incluir no array "trash" os livros classificados com 1 estrela. Igual a função de separaRecentes
function separaBookTrash(){
    for(let i = livros.length-1; i>=livros.length-5; i--){
        if(livros[i].avaliacao == 1){
            trash.push(livros[i]);
        }
    }
}

// função para mostrar lidos recentemente
function mostrarRecentes(){
    // array para armazenar os IDs das divs para apresentar livros
   let imagensRecentes = [
    document.getElementById("capa1"),
    document.getElementById("capa2"),
    document.getElementById("capa3"),
    document.getElementById("capa4"),
    document.getElementById("capa5")
   ];

   // laço for para percorrer o array de recentes e apresentar para o usuário
   for(let i=0; i<recentes.length; i++){

        if(recentes[i]){ // verifica se a posição possui informação
            imagensRecentes[i].src = recentes[i].capa; // acessa src da img que está no indice e manda a capa para ela
            imagensRecentes[i].style.display = "block"; // torna visivel
        }
        else{
            imagensRecentes[i].style.display = "none"; // mantém escondido caso esteja vazia a posição
        }
   }
    
}
// Igual a função de mostrarRecentes
function mostrarTrash(){
    let imagensTrash = [
        document.getElementById("trash1"),
        document.getElementById("trash2"),
        document.getElementById("trash3"),
        document.getElementById("trash4"),
        document.getElementById("trash5")
    ]

    for(let i=0; i<trash.length; i++){

        if(trash[i]){
            imagensTrash[i].src = trash[i].capa;
            imagensTrash[i].style.display = "block";
        }
        else{
            imagensTrash[i].style.display = "none";
        }
    }
}

var genero = document.getElementById("genero-livro").value;

function filtrarGenero(genero){
    for (let i=0; i<livros.length; i++){
        if(livros[i].genero === genero){
            //mostrarRecentes();
            //mostrarTrash();
        }
    }
}


separaRecentes();
separaBookTrash();
mostrarRecentes();
mostrarTrash();
