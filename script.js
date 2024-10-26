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

    const galleryItems = [
        { src: 'https://via.placeholder.com/400x300', category: 'bodas', title: 'Boda Romántica' },
        { src: 'https://via.placeholder.com/400x300', category: 'quince', title: 'Fiesta de 15 Años' },
        { src: 'https://via.placeholder.com/400x300', category: 'empresarial', title: 'Conferencia Anual' },
        { src: 'https://via.placeholder.com/400x300', category: 'bodas', title: 'Ceremonia al Aire Libre' },
        { src: 'https://via.placeholder.com/400x300', category: 'quince', title: 'Quinceañera Elegante' },
        { src: 'https://via.placeholder.com/400x300', category: 'empresarial', title: 'Lanzamiento de Producto' },
    ];

    function renderGallery(items) {
        galleryContainer.innerHTML = items.map(item => `
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
            
            const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
            renderGallery(filteredItems);
        });
    });

    // Galería Modal
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');

    galleryContainer.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const category = galleryItem.classList[1];
            const title = galleryItem.querySelector('p').textContent;
            const src = galleryItem.querySelector('img').src;

            modalTitle.textContent = title;
            modalContent.innerHTML = `<img src="${src}" alt="${title}" class="w-full rounded-lg">`;
            modalDescription.textContent = `Esta imagen pertenece a la categoría de ${category}.`;

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
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