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