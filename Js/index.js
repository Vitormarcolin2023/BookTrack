const livros = JSON.parse(localStorage.getItem("listaLivros")); // recupera as infos em local storage
var recentes = []; // separa e armazena informações dos recentes
var trash = []; // separa e armazena informações de BookTrash

const divRecentes = document.getElementById("recente"); // container para apresentar lidos recentemente
const booktrash = document.getElementById("divBooktrash"); //container para apresentar bookTrash

// função para incluir no array "recentes" os últimos 5 livros adicionados
function separaRecentes(){
    for(let i = 0; i<5; i++){
        recentes.push(livros[i].);
    }
    console.log(recentes)
}

//função para incluir no array "trash" os livros classificados com 1 estrela
function separaBookTrash(){
    for(let i=0; i<livros.length; i++){
        if(livros[i].avaliacao == 1){
            trash.push(livros[i])
        }
    }
    console.log(trash)
}

function exibeRecentes(){
    livros.forEach(livro => {
        const criaDiv = document.createElement('div');
        
    });
}

separaRecentes();
separaBookTrash();
