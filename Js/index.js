const livros = JSON.parse(localStorage.getItem("listaLivros")); // recupera as infos em local storage
var recentes = []; // separa e armazena informações dos recentes
var trash = []; // separa e armazena informações de BookTrash

const divRecentes = document.getElementById("recente"); // container para apresentar lidos recentemente
const booktrash = document.getElementById("divBooktrash"); //container para apresentar bookTrash

// função para incluir no array "recentes" os últimos 5 livros adicionados
function separaRecentes(){
    for(let i = 0; i<5; i++){ // precisa de ajuste na lógica: começar de trás para frente
        recentes.push(livros[i]);
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


separaRecentes();
separaBookTrash();
console.log(livros[0].titulo);

// funcional, mas precisa de ajustes
function mostrarRecentes(){
    var imagemLivro1 = document.getElementById("capa1");
    var imagemLivro2 = document.getElementById("capa2");
    var imagemLivro3 = document.getElementById("capa3");
    var imagemLivro4 = document.getElementById("capa4");
    var imagemLivro5 = document.getElementById("capa5");

    imagemLivro1.src = recentes[0].capa;
    imagemLivro1.style.display = "block";
    console.log(imagemLivro1);
    
}

// testes
function mostrarTrash(){
    for(let i=0; i<trash.length; i++){
        const arrayTrash = document.getElementsByClassName("info-trash")[i].value;
    }
}
mostrarRecentes();