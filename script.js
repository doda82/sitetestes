document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // SLIDER / CARROSSEL DA HOME
    // ===============================

    const prevBtn = document.getElementById('prev');    // botão esquerda
    const nextBtn = document.getElementById('next');    // botão direita
    const items = document.querySelectorAll('.item');   // slides reais
    const dots = document.querySelectorAll('.dot');     // bolinhas
    const numbersIndicator = document.querySelector('.numbers');
    const container = document.querySelector('main.container'); // contêiner correto

    if (items.length > 0) {

        let activeIndex = 0;
        const totalItems = items.length;

        const showSlide = (index) => {

            items.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            if (numbersIndicator) {
                numbersIndicator.textContent = String(index + 1).padStart(2, "0");
            }
        };

        const nextSlide = () => {
            activeIndex = (activeIndex + 1) % totalItems;
            showSlide(activeIndex);
        };

        const prevSlide = () => {
            activeIndex = (activeIndex - 1 + totalItems) % totalItems;
            showSlide(activeIndex);
        };

        // AUTO SLIDE
        let slideInterval = setInterval(nextSlide, 7000);

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 7000);
        };

        // Botões de Seta (Prev/Next) funcionando
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
        
        // CORREÇÃO APLICADA: Botões de Ponto/Dot funcionando
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                activeIndex = index;
                showSlide(activeIndex);
                resetInterval();
            });
        });

        // Pausa ao passar mouse
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(slideInterval));
            container.addEventListener('mouseleave', () => resetInterval());
        }

        // Mostra o primeiro slide
        showSlide(activeIndex);
    }

    // ===============================
    // MENU MOBILE
    // ===============================

    const menuToggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggleBtn?.addEventListener('click', () => {
        document.body.classList.toggle('menu-aberto');
        mobileMenu?.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-menu-container a').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-aberto');
            mobileMenu?.classList.remove('active');
        });
    });

});