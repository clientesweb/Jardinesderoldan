document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Hero Slider
    new Swiper('.hero-slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Galería Filtrable
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryContainer = document.getElementById('gallery-container');
    const loadMoreBtn = document.getElementById('load-more');
    let currentItems = 6;

    const galleryItems = [
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Boda Romántica' },
        { src: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Fiesta de 15 Años' },
        { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Conferencia Anual' },
        { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'bodas', title: 'Ceremonia al Aire Libre' },
        { src: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'quince', title: 'Quinceañera Elegante' },
        { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80', category: 'empresarial', title: 'Lanzamiento de Producto' },
        // Añade más imágenes aquí...
    ];

    function renderGallery(items) {
        galleryContainer.innerHTML = items.slice(0, currentItems).map(item => `
            <div class="gallery-item ${item.category}">
                <img src="${item.src}" alt="${item.title}" class="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105">
                <p class="mt-2 text-center text-gray-600">${item.title}</p>
            </div>
        `).join('');
    }

    renderGallery(galleryItems);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            const filter = btn.getAttribute('data-filter');
            const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
            currentItems = 6;
            renderGallery(filteredItems);
            loadMoreBtn.style.display = filteredItems.length > 6 ? 'inline-block' : 'none';
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        currentItems += 3;
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const filteredItems = activeFilter === 'all' ? galleryItems : galleryItems.filter(item => item.category === activeFilter);
        renderGallery(filteredItems);
        if (currentItems >= filteredItems.length) {
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
            
            modalContent.querySelector('.swiper-wrapper').innerHTML = 
                filteredItems.map(item => `
                    <div class="swiper-slide">
                        <img src="${item.src}" alt="${item.title}" class="w-full h-full object-contain">
                    </div>
                `).join('');

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

    // Testimonios
    const testimonials = [
        { name: "Ana García", text: "¡Increíble experiencia! Nuestra boda fue perfecta gracias al equipo de Jardines de Roldán.", avatar: "https://i.pravatar.cc/150?img=1" },
        { name: "Carlos Rodríguez", text: "La fiesta de 15 de mi hija fue un éxito total. El lugar es hermoso y el servicio excelente.", avatar: "https://i.pravatar.cc/150?img=2" },
        { name: "Elena Martínez", text: "Nuestro evento corporativo dejó a todos impresionados. Definitivamente volveremos a elegir Jardines de Roldán.", avatar: "https://i.pravatar.cc/150?img=3" },
    ];

    const testimonialsContainer = document.querySelector('.testimonials-slider .swiper-wrapper');
    testimonials.forEach(testimonial => {
        testimonialsContainer.innerHTML += `
            <div class="swiper-slide">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-20 h-20 rounded-full mx-auto mb-4">
                    <p class="text-gray-600 mb-4">"${testimonial.text}"</p>
                    <p class="font-bold text-primary">${testimonial.name}</p>
                </div>
            </div>
        `;
    });

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
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });

    // Mapa
    function initMap() {
        const location = { lat: 40.416775, lng: -3.703790 }; // Coordenadas de ejemplo
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }

    // Header con efecto de scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
        }
    });
});