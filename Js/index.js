var livros = JSON.parse(localStorage.getItem("listaLivros")) || []; // recupera as infos em local storage
const metas = JSON.parse(localStorage.getItem("metas")) || []; // recuoera as metas do local storage
const metaAnual = JSON.parse(localStorage.getItem("metaAnual"));
var recentes = []; // separa e armazena informações dos recentes
var trash = []; // separa e armazena informações de BookTrash

window.onload = function () {
  separaRecentes();
  separaBookTrash();
  mostrarMetas();
  carregarMetaAnual();
};

console.log(metas);
console.log(metaAnual);

function carregarMetaAnual() {
  var livrosConcluidos = livros.filter(
    (livro) => livro.progresso === "Concluído"
  ).length;
  let livrosLidos = document.getElementById("metaAnualContainer");

  if (metaAnual) {
    desenharCirculoProgresso(metaAnual, livrosConcluidos);
  }

  livrosLidos.innerText = `Livros concluídos: ${livrosConcluidos}`;
}

function desenharCirculoProgresso(metaAnual, livrosConcluidos) {
  const canvas = document.getElementById("progressCircle");
  const ctx = canvas.getContext("2d");

  const radius = 40;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const progresso = Math.min(livrosConcluidos / metaAnual, 1);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(
    centerX,
    centerY,
    radius,
    -0.5 * Math.PI,
    2 * Math.PI * progresso - 0.5 * Math.PI
  );
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#C5A880";
  ctx.stroke();

  ctx.fillStyle = "#C5A880";
  ctx.font = "28px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(metaAnual, centerX, centerY);
}

function salvarEstadoCheckbox(meta, checked) {
  let estados = JSON.parse(localStorage.getItem("estadosCheckbox")) || {};
  estados[meta] = checked;
  localStorage.setItem("estadosCheckbox", JSON.stringify(estados));
}

function carregarEstadoCheckbox(meta) {
  let estados = JSON.parse(localStorage.getItem("estadosCheckbox")) || {};
  return estados[meta] || false;
}

function mostrarMetas() {
  let listaMetas = document.getElementById("lista-metas");

  metas.forEach((item) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const textoMeta = document.createTextNode(item);

    checkbox.type = "checkbox";
    checkbox.checked = carregarEstadoCheckbox(item);
    checkbox.addEventListener("change", function () {
      salvarEstadoCheckbox(item, checkbox.checked);
    });

    li.appendChild(checkbox);
    li.appendChild(textoMeta);
    listaMetas.appendChild(li);
  });
}

// função para incluir no array "recentes" os últimos 10 livros adicionados
function separaRecentes() {
  for (let i = livros.length - 1; i >= livros.length - 10; i--) {
    // começa do último livro incluso e para com 10
    recentes.push(livros[i]); // inclui no array recentes
  }
  mostrarRecentes(recentes);
}

//função para incluir no array "trash" os livros classificados com 1 estrela. Cria um array com tamanho da quantidade de livros com 1 estrela.
function separaBookTrash() {
  for (let i = 0; i < livros.length; i++) {
    if (livros[i].avaliacao == 1) {
      trash.unshift(livros[i]); // adiciona no inicio do array
    }
  }
  mostrarTrash(trash);
}

function mostrarRecentes(lista) {
  let imagensRecentes = [
    document.getElementById("capa1"),
    document.getElementById("capa2"),
    document.getElementById("capa3"),
    document.getElementById("capa4"),
    document.getElementById("capa5"),
  ];

  for (let i = 0; i < 5; i++) {
    imagensRecentes[i].src = "";
    imagensRecentes[i].alt = "";
    imagensRecentes[i].style.display = "none";
    imagensRecentes[i].onclick = null; // remove o evento de clique antigo
  }

  for (let i = 0; i < 5; i++) {
    if (lista[i]) {
      imagensRecentes[i].src = lista[i].capa;
      imagensRecentes[i].alt = lista[i].titulo;
      imagensRecentes[i].style.display = "block";
      imagensRecentes[i].onclick = () => selecionarLivroParaEdicao(lista[i].id); // adiciona o clique
    }
  }
}

function mostrarTrash(listaT) {
  let imagensTrash = [
    document.getElementById("trash1"),
    document.getElementById("trash2"),
    document.getElementById("trash3"),
    document.getElementById("trash4"),
    document.getElementById("trash5"),
  ];

  for (let i = 0; i < 5; i++) {
    imagensTrash[i].src = "";
    imagensTrash[i].style.display = "none";
    imagensTrash[i].onclick = null;
  }

  for (let i = 0; i < listaT.length; i++) {
    if (listaT[i]) {
      imagensTrash[i].src = listaT[i].capa;
      imagensTrash[i].style.display = "block";
      imagensTrash[i].onclick = () => selecionarLivroParaEdicao(listaT[i].id);
    } else {
      imagensTrash[i].style.display = "none";
    }
  }
}

function selecionarLivroParaEdicao(livroId) {
  localStorage.setItem("livroParaEdicao", livroId);
  window.location.href = "/TELAS/telaEditarLivro.html";
}

// Função para filtrar gêneros
document
  .getElementById("filtrar-genero")
  .addEventListener("click", function () {
    let arrayGenero = []; // recebe as informações que serão mostradas em "recentes"
    let arrayTrash = []; // recebe as informações que serão mostradas em BookTrash

    var genero = document.getElementById("filtrar-genero").value; // recebe o value da seleção de gênero
    // percorre o array de livros para encontrar os generos
    for (let i = 0; i < livros.length; i++) {
      // se gênero selecionado = gênero do livro:
      if (livros[i].genero === genero) {
        arrayGenero.push(livros[i]);
        // checa se o livro pertence ao booktrash
        if (livros[i].avaliacao == 1) {
          arrayTrash.push(livros[i]);
        }
      }
      // caso o valor da seleção for vazia, ou seja, a opção "Todos"
      else if (genero === "") {
        arrayGenero = recentes;
        arrayTrash = trash;
      }
    }
    mostrarRecentes(arrayGenero);
    mostrarTrash(arrayTrash);
  });

// Constantes para guardar ids das setas no carrossel de livros
const setaDireita = document.getElementById("seta-direita");
const setaEsquerda = document.getElementById("seta-esquerda");
const setaDireitaTrash = document.getElementById("seta-direita-trash");
const setaEsquerdaTrash = document.getElementById("seta-esquerda-trash");

// Controla aparição e sumiço de setas e livros a serem mostrados
setaDireita.addEventListener("click", function () {
  setaEsquerda.style.display = "block";
  setaDireita.style.display = "none";
  mostrarRecentes(recentes.slice(5, 9)); // passa como parâmetro um pedaço do array recentes, apenas as informações dos últimos 5
});

setaEsquerda.addEventListener("click", function () {
  setaEsquerda.style.display = "none";
  setaDireita.style.display = "block";
  mostrarRecentes(recentes.slice(0, 5)); // as informações dos 5 primeiros
});

setaDireitaTrash.addEventListener("click", function () {
  setaEsquerdaTrash.style.display = "block";
  setaDireitaTrash.style.display = "none";
  mostrarTrash(trash.slice(5, 9)); // informações dos últimos 5
});

setaEsquerdaTrash.addEventListener("click", function () {
  setaEsquerdaTrash.style.display = "none";
  setaDireitaTrash.style.display = "block";
  mostrarTrash(trash.slice(0, 5)); // as informações dos 5 primeiros
});

// testes
document
  .getElementById("pesquisar-livro")
  .addEventListener("input", function (e) {
    let digitadoPesquisa = e.target.value.toLowerCase();
    let exibeResultado = document.getElementById("resultado");

    // verifica se o campo input está vazio e esconde a lista
    if (digitadoPesquisa === "") {
      exibeResultado.innerHTML = "";
      exibeResultado.style.display = "none";
      return;
    }

    // Limpa os resultados
    exibeResultado.innerHTML = "";

    // Filtra os livros com base no texto digitado
    const resultados = livros.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(digitadoPesquisa) ||
        livro.autor.toLowerCase().includes(digitadoPesquisa)
    );

    // Verifica os resultados e cria a lista
    if (resultados.length > 0) {
      resultados.forEach((livro) => {
        const item = document.createElement("li");
        item.textContent = `${livro.titulo} - ${livro.autor}`;

        // Adiciona evento de clique para o item, se necessário
        item.addEventListener("click", () => {
          document.getElementById("pesquisar-livro").value = livro.titulo;
          exibeResultado.innerHTML = ""; // Limpa os resultados após a seleção
        });
        exibeResultado.appendChild(item);
        exibeResultado.style.display = "flex";
      });
    } else {
      // se não encontrar resultados, mostra a mensagem
      const item = document.createElement("li");
      item.textContent = "Nenhum livro encontrado";
      exibeResultado.appendChild(item);
    }
  });

/*
var troca = document.getElementById("teste");
document.getElementById("capa1").addEventListener("mouseover", function(){
    troca.innerText = "ola";
    troca.style.display = "block"
})

document.getElementById("capa1").addEventListener("mouseout", function(){
    troca.style.display = "none";
})
*/
