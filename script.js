// ==================== MENU MOBILE ==================== 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== SCROLL SUAVE ==================== 
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

// ==================== EFEITO DE SCROLL NAV ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ==================== ANIMAÇÃO AO SCROLL ==================== 
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

// Aplicar animação aos cards
document.querySelectorAll('.feature-card, .case-card, .pricing-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== FORM SUBMISSION ==================== 
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obter valores do formulário
    const formData = new FormData(e.target);
    const data = {
        name: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        company: e.target.querySelectorAll('input[type="text"]')[1].value,
        message: e.target.querySelector('textarea').value
    };
    
    // Simular envio (em produção, seria uma chamada AJAX)
    console.log('Formulário enviado:', data);
    
    // Mostrar mensagem de sucesso
    showSuccessMessage();
    
    // Limpar formulário
    e.target.reset();
});

function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    message.textContent = '✓ Mensagem enviada com sucesso!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// ==================== ANIMAÇÕES CSS ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== COUNTER ANIMATION ==================== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== LAZY LOADING DE IMAGENS ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== EFEITO HOVER EM CARDS ==================== 
document.querySelectorAll('.feature-card, .case-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
});

// ==================== ATIVAR LINKS ATIVOS NA NAVEGAÇÃO ==================== 
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.style.color = 'var(--text-dark)';
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.style.color = 'var(--primary-color)';
                    link.style.borderBottom = '2px solid var(--primary-color)';
                }
            });
        }
    });
});

// ==================== VALIDAÇÃO DE FORM ==================== 
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.style.borderColor = 'var(--border-color)';
        }
    });
});

// ==================== SMOOTH SCROLL FALLBACK ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== INICIALIZAR TILT EFFECT (OPCIONAL) ==================== 
function addTiltEffect() {
    document.querySelectorAll('.feature-card, .case-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            const xRotate = (yPercent - 50) * 0.5;
            const yRotate = (xPercent - 50) * 0.5;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    addTiltEffect();
    console.log('✓ Site carregado com sucesso!');
});

// ==================== PWA NOTIFICATION ==================== 
if ('Notification' in window && Notification.permission === 'granted') {
    window.addEventListener('load', () => {
        new Notification('Bem-vindo à Makal!', {
            body: 'Confira como podemos transformar seu negócio com IA.',
            icon: '🤖'
        });
    });
}

// ==================== DARK MODE TOGGLE (OPCIONAL) ==================== 
function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.style.colorScheme = 'dark';
    }
}

window.addEventListener('load', initDarkMode);
