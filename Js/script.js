var livros = JSON.parse(localStorage.getItem("listaLivros")) || []; // carrega ou cria um array com as informações salvas no local Storage
const popupAPI = document.getElementById("pesquisaAPI"); // armazena o container do pop-up

// clicando no botão fechar define o container como display none
document.getElementById("fechar").addEventListener("click", function(event){
    event.preventDefault()
    popupAPI.style.display = "none";
})

// abre o pop up
document.getElementById("botaoAPI").addEventListener("click", function(){
    popupAPI.style.display = "flex";
})

// Função ocorre quando o formulário com as informações do livro é enviado
document.getElementById("form-livro").addEventListener("submit", function(event) {
    event.preventDefault(); // impede que o formulário seja enviado antes de salvar as informações
    // constantes para armazenar as informações cadastradas
    const titulo = document.getElementById("titulo-livro").value; 
    const autor = document.getElementById("autor-livro").value;
    const resenha = document.getElementById("resenha-livro").value;
    const genero = document.getElementById("genero-livro").value;
    const progresso = document.getElementById("progresso-livro").value;
    // querySelector procura pelos elementos input com nome "star" e verfica se foram checadas. Utilza operador ternário para obter o valor das que forão checadas ? = if : = else
    const avaliacao = document.querySelector('input[name="star"]:checked') ? document.querySelector('input[name="star"]:checked').value : '';
    const capa = previewImagem.src; // armazena a src da imagem apresentada
    

    let livro; // variável para criar novo 

    // chama a função novoLivro para criar novo objeto e armazena os valores em livro
    livro = new novoLivro(titulo, autor, resenha, genero, progresso, avaliacao, capa); 

    if(titulo && autor && resenha && genero && progresso && avaliacao && capa){
        livros.push(livro) // adiciona as informações do objeto no array livros
        localStorage.setItem('listaLivros', JSON.stringify(livros)); // adiciona as informações de livros no localStorage

        alert("Livro salvo com sucesso!"); // envia um aviso para o usuário
    }
    else{
        alert("Por favor, preencha todos os campos.")
    }

    document.getElementById("form-livro").reset(); // reseta as informações preenchidas
    previewImagem.src = ""; // limpa o campo da imagem
    previewImagem.style.display = "none"; // esconde o display da imagem

})

// função para criar um objeto com as informações do formulário
function novoLivro(titulo, autor, resenha, genero, progresso, avaliacao, capa){
    this.titulo = titulo;
    this.autor = autor;
    this.resenha = resenha;
    this.genero = genero;
    this.progresso = progresso;
    this.avaliacao = avaliacao;
    this.capa = capa;
}

const inputImagem = document.getElementById('upload-imagem'); // recebe o arquivo selecionado
const previewImagem = document.getElementById('preview-imagem'); // recebe a tag img para mostrar a imagem
previewImagem.src = "http://127.0.0.1:5501/resource/imagemPadrao.png"; // caminho para a imagem padrão definida

// Quando adicionada uma imagem, carrega a função para transformar a imagem em Base64 e apresentar ao usuário
inputImagem.addEventListener('change', function(event) {
    const arquivo = event.target.files[0]; // armazena a constante o arquivo selecionado pelo usuário. Files[0] para selecionar o arquivo indicado pelo usuário
    if (arquivo) { // se existir o arquivo:
        const reader = new FileReader(); // usado para ler o arquivo e transformar em string base64 (para que possa ser armazenada em local Storage)
        // quando o arquivo for lido a função irá pegar o res
        reader.onload = function() { 
            const imagemBase64 = reader.result; // resuktado da da imagem transformada em base64
            previewImagem.src = imagemBase64; // envia para a tag img src a imagem trsnformada
            previewImagem.style.display = "block"; // torna o display visível

            console.log(imagemBase64); // para testar :)
        };

        reader.readAsDataURL(arquivo); // lê o conteúdo do arquivo. readAsDataURL lê o arquivo e o codifica como URL base 64 - nesse caso é usada para apresentar a imagem
    }
});

// Quando clicado "descartar" limpa as informações do formulário
document.getElementById("descartar").addEventListener("click", function(){
    document.getElementById("form-livro").reset();
    previewImagem.src = "";
    previewImagem.style.display = "none";
})