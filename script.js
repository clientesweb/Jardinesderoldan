document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });

    // Menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Hero Slider
    new Swiper('.hero-slider', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Galería
    const galleryContainer = document.getElementById('gallery-container');

    const galleryItems = [
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Boda Romántica', description: 'Una hermosa ceremonia al atardecer en nuestros jardines.' },
        { src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: '15 Años Mágicos', description: 'Celebración de quinceañera con decoración de ensueño.' },
        { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Conferencia Anual', description: 'Evento corporativo con las mejores instalaciones.' },
        { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Ceremonia al Aire Libre', description: 'Boda íntima rodeada de naturaleza.' },
        { src: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Quinceañera Elegante', description: 'Fiesta de 15 con temática de princesa.' },
        { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Lanzamiento de Producto', description: 'Presentación de nuevo producto en nuestro salón principal.' },
        { src: 'https://images.unsplash.com/photo-1532117892888-38948e152b3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'cumpleanos', title: 'Fiesta de Cumpleaños', description: 'Celebración de cumpleaños con amigos y familia.' },
        { src: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'infantiles', title: 'Fiesta Infantil', description: 'Diversión garantizada para los más pequeños.' },
    ];

    function renderGallery(filter = 'todos') {
        galleryContainer.innerHTML = galleryItems
            .filter(item => filter === 'todos' || item.category === filter)
            .map(item => `
                <div class="gallery-item ${item.category}">
                    <img src="${item.src}" alt="${item.title}" class="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105">
                    <p class="mt-2 text-center text-gray-600">${item.title}</p>
                    <button class="ver-mas mt-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition-colors" data-title="${item.title}">Ver más</button>
                </div>
            `).join('');
    }

    renderGallery();

    // Filtros de galería
    document.querySelectorAll('.filtro-btn').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filtro');
            renderGallery(filter);
            
            // Actualizar estilos de los botones
            document.querySelectorAll('.filtro-btn').forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-primary');
            });
            button.classList.remove('bg-white', 'text-primary');
            button.classList.add('bg-primary', 'text-white');
        });
    });

    // Galería Modal
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');
    let gallerySlider;

    galleryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('ver-mas')) {
            const title = e.target.getAttribute('data-title');
            const item = galleryItems.find(item => item.title === title);
            
            modalTitle.textContent = item.title;
            modalDescription.textContent = item.description;
            
            const modalContent = document.querySelector('.gallery-slider .swiper-wrapper');
            modalContent.innerHTML = `
                <div class="swiper-slide">
                    <img src="${item.src}" alt="${item.title}" class="w-full h-full object-contain">
                </div>
                <div class="swiper-slide">
                    <img src="${item.src}" alt="${item.title}" class="w-full h-full object-contain">
                </div>
                <div class="swiper-slide">
                    <img src="${item.src}" alt="${item.title}" class="w-full h-full object-contain">
                </div>
            `;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (gallerySlider) {
                gallerySlider.destroy();
            }

            gallerySlider = new Swiper('.gallery-slider', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Testimonios Slider
    const testimonials = [
        { name: 'María García', text: 'Nuestra boda en Jardines de Roldán fue un sueño hecho realidad. El lugar es hermoso y el servicio impecable.', rating: 5 },
        { name: 'Juan Pérez', text: 'Organizamos un evento corporativo y quedamos muy satisfechos. Las instalaciones son excelentes y el personal muy profesional.', rating: 4 },
        { name: 'Ana Rodríguez', text: 'La fiesta de 15 de mi hija fue perfecta. Todos nuestros invitados quedaron encantados con el lugar.', rating: 5 },
    ];

    const testimonialsWrapper = document.querySelector('.testimonials-slider .swiper-wrapper');
    testimonialsWrapper.innerHTML = testimonials.map(testimonial => `
        <div class="swiper-slide">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-gray-600 mb-4">"${testimonial.text}"</p>
                <div class="flex items-center">
                    <div class="mr-4">
                        <p class="font-bold">${testimonial.name}</p>
                        <div class="flex text-yellow-400">
                            ${Array(5).fill().map((_, i) => `
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();
            if (response.ok) {
                alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            console.error('Error:', error);
        }
    });

    // Mapa
    function initMap() {
        const location = { lat: 40.416775, lng: -3.703790 }; // Coordenadas de ejemplo (Madrid)
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }

    // Llamar a initMap cuando se cargue la API de Google Maps
    window.initMap = initMap;
});