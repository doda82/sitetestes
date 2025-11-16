document.addEventListener('DOMContentLoaded', () => {

    const seletorOrdenacao = document.getElementById('ordenar-produtos');
    const campoBusca = document.getElementById('input-busca');
    const container = document.querySelector('.products-grid');
    const todosOsProdutos = Array.from(container.querySelectorAll('.product-card'));

    /* FILTRAR */
    function filtrarProdutos() {
        const termo = campoBusca.value.toLowerCase();

        todosOsProdutos.forEach(produto => {
            const nome = produto.querySelector('.product-card-name').textContent.toLowerCase();
            produto.style.display = nome.includes(termo) ? 'flex' : 'none';
        });

        ordenarProdutos();
    }

    /* ORDENAR */
    function ordenarProdutos() {
        const ordem = seletorOrdenacao.value;
        const visiveis = todosOsProdutos.filter(p => p.style.display !== 'none');

        visiveis.sort((a, b) => {
            const A = parseFloat(a.dataset.price);
            const B = parseFloat(b.dataset.price);

            if (ordem === 'menor-preco') return A - B;
            if (ordem === 'maior-preco') return B - A;
            return parseInt(a.dataset.order) - parseInt(b.dataset.order);
        });

        visiveis.forEach(p => container.appendChild(p));
    }

    if (campoBusca) campoBusca.addEventListener('input', filtrarProdutos);
    if (seletorOrdenacao) seletorOrdenacao.addEventListener('change', ordenarProdutos);
    ordenarProdutos();

    // ==============================
    // 🔥 MODAL DE DETALHES
    // ==============================

    const modal = document.getElementById("product-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");

    // Abrir modal
    document.querySelectorAll('.product-card .btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const card = e.target.closest('.product-card');
            const img = card.querySelector('img').src;
            const nome = card.querySelector('.product-card-name').textContent;
            const preco = card.querySelector('.product-card-price').textContent;

            modalImg.src = img;
            modalTitle.textContent = nome;
            modalPrice.textContent = preco;

            modal.classList.add("ativo");
        });
    });

    // Fechar modal
    document.querySelector(".modal-close").addEventListener("click", () => {
        modal.classList.remove("ativo");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("ativo");
    });

});