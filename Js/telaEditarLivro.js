let avaliacaoLivro = 0; // Variável para armazenar a avaliação selecionada

// Função para carregar os dados do livro
function carregarDadosDoLivro() {
    const listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || [];
    const livroId = localStorage.getItem("livroParaEdicao");
    const livro = listaLivros.find(livro => livro.id == livroId);

    if (livro) {
        document.getElementById("titulo").value = livro.titulo;
        document.getElementById("autor").value = livro.autor;
        document.getElementById("progresso").value = livro.progresso;
        document.getElementById("resenha").value = livro.resenha;
        avaliacaoLivro = livro.avaliacao;

        const generos = document.querySelectorAll('.genero');
        generos.forEach(genero => {
            if (livro.genero === genero.innerText) {
                genero.classList.add('ativo');
            } else {
                genero.classList.remove('ativo');
            }
        });

        const capaImg = document.querySelector(".capa-livro");
        capaImg.src = livro.capa;

        atualizarEstrelas(avaliacaoLivro); // Chama a função para exibir a avaliação atual
    }
    
}

// Função para atualizar as estrelas visuais com base na avaliação
function atualizarEstrelas(nota) {
    const estrelas = document.querySelectorAll("#estrelas-avaliacao .estrela");
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.classList.add("ativa");
        } else {
            estrela.classList.remove("ativa");
        }
    });
}

// Adiciona evento de clique nas estrelas para definir a nova avaliação
document.querySelectorAll("#estrelas-avaliacao .estrela").forEach(estrela => {
    estrela.addEventListener("click", function() {
        avaliacaoLivro = parseInt(this.getAttribute("data-value"));
        atualizarEstrelas(avaliacaoLivro); // Atualiza visualmente as estrelas
    });
});

// Função para salvar as alterações do livro
function salvarLivroEditado() {
    const listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || [];
    const livroId = localStorage.getItem("livroParaEdicao");
    const livro = listaLivros.find(livro => livro.id == livroId);

    if (livro) {
        livro.titulo = document.getElementById("titulo").value;
        livro.autor = document.getElementById("autor").value;
        livro.progresso = document.getElementById("progresso").value;
        livro.resenha = document.getElementById("resenha").value;
        livro.avaliacao = avaliacaoLivro; // Salva a avaliação atualizada

        localStorage.setItem("listaLivros", JSON.stringify(listaLivros));
        alert("Livro atualizado com sucesso!");
    }
    window.location.href = "/index.html";
}

window.onload = carregarDadosDoLivro;
