    // Função para carregar os dados do livro
    function carregarDadosDoLivro() {
        // Recupera a lista de livros do local storage
        const listaLivros = JSON.parse(localStorage.getItem("listaLivros")) || [];
        
        // Recupera o ID do livro a ser editado
        const livroId = localStorage.getItem("livroParaEdicao");

        // Encontra o livro correspondente ao ID
        const livro = listaLivros.find(livro => livro.id == livroId);

        // Se o livro for encontrado, preenche os campos
        if (livro) {
            document.getElementById("titulo").value = livro.titulo;
            document.getElementById("autor").value = livro.autor;
            document.getElementById("progresso").value = livro.progresso;
            document.getElementById("resenha").value = livro.resenha;

            // Preencher os gêneros, se necessário
            // Aqui você pode adicionar lógica para marcar o gênero selecionado, se houver
            // Exemplo:
            const generos = document.querySelectorAll('.genero');
            generos.forEach(genero => {
                if (livro.genero === genero.innerText) {
                    genero.classList.add('ativo'); // Adiciona a classe ativo ao gênero correspondente
                } else {
                    genero.classList.remove('ativo'); // Remove a classe ativo dos outros gêneros
                }
            });
        }
    }

    // Chama a função quando a página carrega
    window.onload = carregarDadosDoLivro;