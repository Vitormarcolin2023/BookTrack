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
function mostrarRecentes(lista){
    // array para armazenar os IDs das divs para apresentar livros
   let imagensRecentes = [
    document.getElementById("capa1"),
    document.getElementById("capa2"),
    document.getElementById("capa3"),
    document.getElementById("capa4"),
    document.getElementById("capa5")
   ];

   // Limpa as informações exibidas para receber novo array sem sobrescrever informações
   for(let i=0; i<imagensRecentes.length; i++){
        imagensRecentes[i].src = "";
        imagensRecentes[i].style.display = "none";
   }

   // laço for para percorrer o array de recentes e apresentar para o usuário
   for(let i=0; i<lista.length; i++){

        if(lista[i]){ // verifica se a posição possui informação
            imagensRecentes[i].src = lista[i].capa; // acessa src da img que está no indice e manda a capa para ela
            imagensRecentes[i].style.display = "block"; // torna visivel
        }
        else{
            imagensRecentes[i].style.display = "none"; // mantém escondido caso esteja vazia a posição
        }
   }
    
}
// Igual a função de mostrarRecentes
function mostrarTrash(listaT){
    let imagensTrash = [
        document.getElementById("trash1"),
        document.getElementById("trash2"),
        document.getElementById("trash3"),
        document.getElementById("trash4"),
        document.getElementById("trash5")
    ]

    for(let i=0; i<imagensTrash.length; i++){
        imagensTrash[i].src = "";
        imagensTrash[i].style.display = "none";
   }

    for(let i=0; i<listaT.length; i++){

        if(listaT[i]){
            imagensTrash[i].src = listaT[i].capa;
            imagensTrash[i].style.display = "block";
        }
        else{
            imagensTrash[i].style.display = "none";
        }
    }
}

separaRecentes();
separaBookTrash();
mostrarRecentes(recentes);
mostrarTrash(trash);

// Função para filtrar gêneros
document.getElementById("filtrar-genero").addEventListener("click", function (){
    let arrayGenero = [] // recebe as informações que serão mostradas em "recentes"
    let arrayTrash = [] // recebe as informações que serão mostradas em BookTrash

    var genero = document.getElementById("filtrar-genero").value; // recebe o value da seleção de gênero
    // percorre o array de livros para encontrar os generos
    for (let i=0; i<livros.length; i++){
        // se gênero selecionado = gênero do livro:
        if(livros[i].genero === genero){
            arrayGenero.push(livros[i]);  
            // checa se o livro pertence ao booktrash 
            if (livros[i].avaliacao == 1){
                arrayTrash.push(livros[i]);
            }
        }
        // caso o valor da seleção for vazia, ou seja, a opção "Gênero"
        else if (genero === ""){
            arrayGenero = recentes;
            arrayTrash = trash;
        }
    } 
    mostrarRecentes(arrayGenero);
    mostrarTrash(arrayTrash);
})



