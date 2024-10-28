
// Função para filtragem de  gêneros
document.getElementById("filtrar-genero").addEventListener("click", function (){
    let arrayRomance = [] // recebe as informações que serão mostradas em "Romance"
    let arrayTrash = [] // recebe as informações que serão mostradas em BookTrash
    let arrayTodos = [] // recebe as informações que serão mostradas em todos"

    var genero = document.getElementById("filtrar-genero").value; // recebe o value da seleção de gênero
    // percorre o array de livros para encontrar os generos
    for (let i=0; i<livros.length; i++){
        // se gênero selecionado = gênero do livro:
        if(livros[i].genero === genero){
            arrayRomance.push(livros[i]); 
        }
        // caso o valor da seleção for vazia, ou seja, a opção "Todos"
        else if (genero === ""){
            arrayTodos = todos;
            arrayTrash = trash;
        }
    } 
    mostrarRecentes(arrayRomance);
    mostrarTrash(arrayTrash);
})
