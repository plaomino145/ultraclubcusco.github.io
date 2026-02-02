/**
 * ULTRA CLUB CUSCO - Main JavaScript
 * The House of Energy
 */

// Variables globales
let currentEventName = '';
let currentTicketType = '';

/**
 * Crear partículas de fondo animadas
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animación aleatoria
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Configurar listeners de eventos
 */
function setupEventListeners() {
    // Validación de DNI (solo números)
    const dniInput = document.getElementById('buyerDNI');
    if (dniInput) {
        dniInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Smooth scroll para enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cerrar modal y menú al hacer clic fuera
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('ticketModal');
        const sideMenu = document.getElementById('sideMenu');
        
        if (event.target === modal) closeModal();
        if (event.target === sideMenu) closeSideMenu();
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeSideMenu();
        }
    });
    
    // Animación al hacer scroll
    setupScrollAnimations();
}

/**
 * Animaciones al hacer scroll
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    document.querySelectorAll('.ticket-card, .event-card, .video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Funciones del menú lateral
 */
function openSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const floatingMenu = document.querySelector('.floating-menu');
    
    if (sideMenu) {
        sideMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Ocultar botones flotantes cuando el menú está abierto
    if (floatingMenu) {
        floatingMenu.classList.add('hidden');
    }
}

function closeSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const floatingMenu = document.querySelector('.floating-menu');
    
    if (sideMenu) {
        sideMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Mostrar botones flotantes cuando se cierra el menú
    if (floatingMenu) {
        floatingMenu.classList.remove('hidden');
    }
}

/**
 * Scroll hacia arriba
 */
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

/**
 * Scroll a sección específica
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeSideMenu();
    }
}

/**
 * Abrir modal de reserva
 */
function openTicketModal(eventName, ticketType, price) {
    currentEventName = eventName;
    currentTicketType = ticketType;
    
    // Actualizar título del modal
    const modalTitle = document.getElementById('modalEventTitle');
    if (modalTitle) {
        modalTitle.textContent = `RESERVAR: ${ticketType.toUpperCase()}`;
    }
    
    // Actualizar resumen
    const summaryEvent = document.getElementById('summaryEvent');
    const summaryTicketType = document.getElementById('summaryTicketType');
    
    if (summaryEvent) summaryEvent.textContent = eventName;
    if (summaryTicketType) summaryTicketType.textContent = ticketType;
    
    // Mostrar modal
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar menú lateral si está abierto
    closeSideMenu();
}

/**
 * Cerrar modal de reserva
 */
function closeModal() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Limpiar formulario
    resetForm();
}

/**
 * Resetear formulario
 */
function resetForm() {
    const buyerName = document.getElementById('buyerName');
    const buyerDNI = document.getElementById('buyerDNI');
    
    if (buyerName) buyerName.value = '';
    if (buyerDNI) buyerDNI.value = '';
}

/**
 * Enviar reserva por WhatsApp
 */
function sendToWhatsApp() {
    const name = document.getElementById('buyerName')?.value.trim();
    const dni = document.getElementById('buyerDNI')?.value.trim();

    // Validaciones
    if (!name) {
        showAlert('⚠️ Por favor ingresa tu nombre completo', 'warning');
        document.getElementById('buyerName')?.focus();
        return;
    }

    if (!dni) {
        showAlert('⚠️ Por favor ingresa tu DNI', 'warning');
        document.getElementById('buyerDNI')?.focus();
        return;
    }

    if (dni.length < 8) {
        showAlert('⚠️ El DNI debe tener 8 dígitos', 'warning');
        document.getElementById('buyerDNI')?.focus();
        return;
    }

    // Construir mensaje para WhatsApp
    const message = 
        `🎉 *RESERVA ULTRA CLUB CUSCO*%0A%0A` +
        `━━━━━━━━━━━━━━━━%0A` +
        `👤 *Nombre:* ${name}%0A` +
        `🆔 *DNI:* ${dni}%0A%0A` +
        `━━━━━━━━━━━━━━━━%0A` +
        `🎫 *Tipo de Entrada:* ${currentTicketType}%0A` +
        `🎪 *Evento:* ${currentEventName}%0A` +
        `👥 *Personas:* 1%0A` +
        `💰 *Total:* GRATIS ✨%0A` +
        `━━━━━━━━━━━━━━━━%0A%0A` +
        `✅ ¡Quiero confirmar mi reserva gratuita!%0A` +
        `📍 Ultra Club Cusco%0A` +
        `📞 Mayores de 21 años`;

    // Número de WhatsApp oficial
    const whatsappNumber = '51956246405';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Mostrar confirmación
    setTimeout(() => {
        showAlert(
            '✅ Serás redirigido a WhatsApp para confirmar tu reserva gratuita.\n\n¡Nos vemos en Ultra Club Cusco! 🎉',
            'success'
        );
        closeModal();
    }, 500);
}

/**
 * Mostrar alerta personalizada
 */
function showAlert(message, type = 'info') {
    alert(message);
}

/**
 * Cambiar entre tabs de redes sociales
 */
function switchTab(tabName) {
    // Remover clase active de todos los tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ocultar todo el contenido
    document.querySelectorAll('.social-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar el tab seleccionado
    const activeBtn = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-content`);
    
    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
    
    // Recargar embeds de TikTok o Instagram si es necesario
    if (tabName === 'tiktok' && window.tiktokEmbed) {
        window.tiktokEmbed.lib.render(document.getElementById('tiktok-content'));
    } else if (tabName === 'instagram' && window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Ultra Club Cusco - Initialized');
    
    // Crear partículas
    createParticles();
    
    // Configurar listeners
    setupEventListeners();
    
    // Log para debugging
    console.log('✅ All systems ready');
});

/**
 * Manejar errores globales
 */
window.addEventListener('error', function(e) {
    console.error('Error:', e.message);
});

/**
 * Performance: Lazy loading de imágenes
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Exponer funciones globalmente para uso en HTML
window.openSideMenu = openSideMenu;
window.closeSideMenu = closeSideMenu;
window.scrollToTop = scrollToTop;
window.scrollToSection = scrollToSection;
window.openTicketModal = openTicketModal;
window.closeModal = closeModal;
window.sendToWhatsApp = sendToWhatsApp;
window.switchTab = switchTab;
