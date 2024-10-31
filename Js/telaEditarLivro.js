estrelasContainer.addEventListener("click", (event) => {
    const estrelaClicada = event.target.closest(".estrela");

    if (estrelaClicada) {
      classificacao = parseInt(estrelaClicada.dataset.classificacao, 10);
      atualizarEstrelas();
    }
  });



function atualizarEstrelas() {
    for (let i = 1; i <= 5; i++) {
      const estrela = document.querySelector(`.estrela[data-classificacao="${i}"]`);
      if (i <= classificacao) {
        estrela.textContent = '★';
      } else {
        estrela.textContent = '☆';
      }
    }
  }

  // Função para carregar informações do livro no formulário de edição
function carregarLivroParaEdicao(livroId) {
  // Recupera o array de livros do localStorage
  const listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || [];
  
  // Encontra o livro específico pelo ID
  const livro = listaLivros.find(l => l.id === livroId);
  
  if (!livro) {
    alert("Livro não encontrado.");
    return;
  }

  // Preenche o formulário com as informações do livro
  document.getElementById("titulo").value = livro.titulo || "";
  document.getElementById("autor").value = livro.autor || "";
  
  // Seleciona o gênero atual
  const botoesGenero = document.querySelectorAll(".genero");
  botoesGenero.forEach(botao => {
    if (botao.innerText === livro.genero) {
      botao.classList.add("ativo");
    } else {
      botao.classList.remove("ativo");
    }
  });

  // Define o progresso de leitura
  document.getElementById("progresso").value = livro.progresso || "";

  // Preenche a resenha
  document.getElementById("resenha").value = livro.resenha || "";

  // Exibe a avaliação com estrelas
  const estrelas = document.querySelectorAll(".estrelas .estrela");
  estrelas.forEach((estrela, index) => {
    estrela.textContent = index < livro.avaliacao ? "★" : "☆";
  });

  // Mostra a capa do livro, se disponível
  const capa = document.querySelector(".capa-livro");
  if (livro.capa) {
    capa.src = livro.capa;
  } else {
    capa.src = "../resource/livro-exemplo.webp"; // Capa padrão se não houver imagem
  }
}