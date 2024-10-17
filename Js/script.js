var livros = JSON.parse(localStorage.getItem("listaLivros")) || [];


document.getElementById("form-livro").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const titulo = document.getElementById("titulo-livro").value;
    const autor = document.getElementById("autor-livro").value;
    const resenha = document.getElementById("resenha-livro").value;
    const genero = document.getElementById("genero-livro").value;
    const progresso = document.getElementById("progresso-livro").value;
    const avaliacao = document.querySelector('input[name="star"]:checked') ? document.querySelector('input[name="star"]:checked').value : '';
    const capa = previewImagem.src;

    let livro;

    if (titulo && autor && genero && progresso && avaliacao && capa) {
        
        livro = new novoLivro(titulo, autor, resenha, genero, progresso, avaliacao, capa);

        livros.push(livro)
        localStorage.setItem('listaLivros', JSON.stringify(livros));

        alert("Livro salvo com sucesso!");

        document.getElementById("form-livro").reset();
        previewImagem.src = "";
        previewImagem.style.display = "none";
    } else {
        alert("Por favor, preencha todos os campos.");
    }

})

function novoLivro(titulo, autor, resenha, genero, progresso, avaliacao, capa){
    this.titulo = titulo;
    this.autor = autor;
    this.resenha = resenha;
    this.genero = genero;
    this.progresso = progresso;
    this.avaliacao = avaliacao;
    this.capa = capa;
}

const inputImagem = document.getElementById('upload-imagem');
const previewImagem = document.getElementById('preview-imagem');

inputImagem.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
        const imageUrl = URL.createObjectURL(arquivo);
        previewImagem.src = imageUrl;
        previewImagem.style.display = "block"; 
    }
});

document.getElementById("descartar").addEventListener("click", function(){
    document.getElementById("form-livro").reset();
    previewImagem.src = "";
        previewImagem.style.display = "none";
})
