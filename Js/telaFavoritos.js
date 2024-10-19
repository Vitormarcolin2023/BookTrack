// Redirecionamento (apenas como referência)
window.location.href = '/page';

const select = document.getElementById("genero");

// Função para mostrar o gênero selecionado
function mostrarGenero() {
    const generoSelecionado = select.value; // Captura o valor selecionado

    switch (generoSelecionado) {
        case "Todos":
            // Inserir aqui todos os livros
            break;
        case "Auto Ajuda":
            // Equilíbrio...
            break;
        case "Aventura":
            // Harry Potter 4
            break;
        case "Comédia":
            // Clube do livro dos homens
            break;
        case "Drama":
            // Morro dos ventos uivantes
            break;
        case "Distopia":
            // O conto da Aia
            break;
        case "Fantasia":
            // A guerra dos tronos
            break;
        case "Ficção Científica":
            // Duna
            break;
        case "Não Ficção":
            // Rita Lee
            break;
        case "Romance":
            // Orgulho e preconceito
            break;
        case "Suspense":
            // Agatha Christie
            break;
        case "Terror":
            // A irmã
            break;
        default:
            console.warn("Gênero não encontrado.");
    }
}

// Adiciona um evento ao 'select' para chamar a função sempre que o usuário escolher um gênero
select.addEventListener("change", mostrarGenero);
