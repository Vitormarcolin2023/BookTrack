window.onload = function() {
    lerResenhas();
};

function obterResenhas() {
    var resenhas = localStorage.getItem("listaLivros");
    return resenhas ? JSON.parse(resenhas) : [];
}

function lerResenhas() {
    var container = document.getElementById("container-resenhas");
    var listaLivros = obterResenhas();

    container.innerHTML = '';

    listaLivros.forEach(function(livro) {
        var resenhaDiv = document.createElement("div");
        resenhaDiv.classList.add("resenha-item");

        var imagemDiv = document.createElement("div");
        imagemDiv.classList.add("imagem-container");
        
        var imagem = document.createElement("img");
        imagem.src = "/resource/image.png"; 
        imagem.alt = "Imagem padrão";
        imagem.classList.add("imagem");
        imagemDiv.appendChild(imagem);
        
        var conteudoDiv = document.createElement("div");
        conteudoDiv.classList.add("conteudo-container");

        var infoDiv = document.createElement("div");
        infoDiv.classList.add("info-container");

        var nome = document.createElement("h2");
        nome.textContent = "Maju:";
        nome.classList.add("nome");
        infoDiv.appendChild(nome);

        var novaClassificacao = document.createElement("div");
        novaClassificacao.textContent = "Avaliação: " + livro.avaliacao;
        novaClassificacao.classList.add("avaliacao");
        infoDiv.appendChild(novaClassificacao);

        conteudoDiv.appendChild(infoDiv);

        var resenhaConteudoDiv = document.createElement("div");
        resenhaConteudoDiv.classList.add("resenha-container");
        
        var novaResenha = document.createElement("p");
        novaResenha.textContent = livro.resenha;
        novaResenha.classList.add("resenhas");
        resenhaConteudoDiv.appendChild(novaResenha);

        conteudoDiv.appendChild(resenhaConteudoDiv);

        resenhaDiv.appendChild(imagemDiv);
        resenhaDiv.appendChild(conteudoDiv);

        container.appendChild(resenhaDiv);
    });
}