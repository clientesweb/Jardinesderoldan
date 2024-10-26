document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // Menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Hero Slider
    new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Testimonios Slider
    new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Galería Filtrable
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryContainer = document.getElementById('gallery-container');
    const loadMoreBtn = document.getElementById('load-more');
    let currentItems = 6;

    const galleryItems = [
        { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: '
Boda Romántica' },
        { src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Fiesta de 15 Años' },
        { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Conferencia Anual' },
        { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Ceremonia al Aire Libre' },
        { src: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Quinceañera Elegante' },
        { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Lanzamiento de Producto' },
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Boda en la Playa' },
        { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Fiesta de 15 Temática' },
        { src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Seminario Ejecutivo' },
        { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Boda de Invierno' },
        { src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Quinceañera Moderna' },
        { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Feria de Negocios' },
    ];

    function renderGallery(items) {
        galleryContainer.innerHTML = items.slice(0, currentItems).map(item => `
            <div class="gallery-item ${item.category} appear">
                <img src="${item.src}" alt="${item.title}" class="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105">
                <p class="mt-2 text-center text-gray-700">${item.title}</p>
            </div>
        `).join('');
        appearElements();
    }

    renderGallery(galleryItems);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            
            currentItems = 6;
            const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
            renderGallery(filteredItems);
            
            if (filteredItems.length <= currentItems) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        currentItems += 3;
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const filteredItems = activeFilter === 'all' ? galleryItems : galleryItems.filter(item => item.category === activeFilter);
        renderGallery(filteredItems);
        
        if (filteredItems.length <= currentItems) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Galería Modal
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');
    let gallerySlider;

    galleryContainer.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const category = galleryItem.classList[1];
            const title = galleryItem.querySelector('p').textContent;
            const clickedSrc = galleryItem.querySelector('img').src;

            modalTitle.textContent = title;
            
            const filteredItems = galleryItems.filter(item => item.category === category);
            const startIndex = filteredItems.findIndex(item => item.src === clickedSrc);
            
            modalContent.querySelector('.swiper-wrapper').innerHTML = filteredItems.map(item => `
                <div class="swiper-slide">
                    <img src="${item.src}" alt="${item.title}" class="w-full rounded-lg">
                </div>
            `).join('');

            modalDescription.textContent = `Esta imagen pertenece a la categoría de ${category}.`;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (gallerySlider) {
                gallerySlider.destroy();
            }

            gallerySlider = new Swiper('.gallery-slider', {
                initialSlide: startIndex,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera de él
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonios
    const testimonials = [
        { name: 'María García', text: 'Nuestra boda fue un sueño hecho realidad en Jardines de Roldán.' },
        { name: 'Juan Pérez', text: 'El evento corporativo fue un éxito gracias al increíble espacio y servicio.' },
        { name: 'Ana Martínez', text: 'Celebramos el cumpleaños de mi madre y fue una experiencia inolvidable.' },
        { name: 'Carlos Rodríguez', text: 'La fiesta de 15 de mi hija superó todas nuestras expectativas.' },
        { name: 'Laura Sánchez', text: 'Nuestro workshop fue muy productivo gracias al ambiente inspirador.' },
    ];

    const testimonialsWrapper = document.querySelector('.testimonials-slider .swiper-wrapper');
    testimonialsWrapper.innerHTML = testimonials.map(testimonial => `
        <div class="swiper-slide">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-gray-700 mb-4">"${testimonial.text}"</p>
                <p class="font-bold text-primary">${testimonial.name}</p>
            </div>
        </div>
    `).join('');

    // Formulario de Contacto
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
                form.reset();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        }
    });

    // Efectos de aparición
    function appearElements() {
        const elements = document.querySelectorAll('.appear');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    appearElements();

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});