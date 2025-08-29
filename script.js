/**
 * Landing Page Flamengo - JavaScript
 * Arquivo com todas as funcionalidades interativas
 */

// ===== VARIÁVEIS GLOBAIS =====
let isMenuOpen = false;
let currentSlide = 0;
let slideInterval;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa todas as funcionalidades da aplicação
 */
function initializeApp() {
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initFormValidation();
    initPartidaCards();
    initLoadingStates();
    initMobileMenu();
    initCountdownTimer();
    initImageLazyLoading();
    initMatchesSlider(); // Adicionado para o slider de partidas
    initPacotesModal(); // Adicionado para o modal dos pacotes
    initPacoteZoomEffect(); // Adicionado para o efeito de zoom progressivo
    initTypewriter(); // Adicionado para o efeito máquina de escrever
    
    // Reinicializar smooth scroll após carregamento de conteúdo dinâmico
    initDynamicContentHandlers();
    
    console.log('✅ Landing Page Flamengo inicializada com sucesso!');
}

/**
 * Inicializa handlers para conteúdo dinâmico
 */
function initDynamicContentHandlers() {
    // Observar mudanças no DOM para reinicializar event listeners
    const observer = new MutationObserver(function(mutations) {
        let shouldReinit = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.querySelectorAll) {
                        const links = node.querySelectorAll('a[href^="#"]');
                        if (links.length > 0) {
                            shouldReinit = true;
                        }
                    }
                });
            }
        });
        
        if (shouldReinit) {
            // Aguardar um pouco para garantir que o conteúdo foi renderizado
            setTimeout(() => {
                initSmoothScroll();
            }, 100);
        }
    });
    
    // Observar mudanças no body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// ===== FAQ ACCORDION =====
/**
 * Inicializa o sistema de FAQ accordion
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQItem(this);
        });
        
        // Adicionar suporte a teclado
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQItem(this);
            }
        });
    });
}

/**
 * Toggle FAQ item (abrir/fechar)
 */
function toggleFAQItem(questionElement) {
    const faqItem = questionElement.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os itens
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = '0';
    });
    
    // Abrir o item clicado se não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// ===== SMOOTH SCROLL =====
/**
 * Inicializa scroll suave para links internos
 * 
 * Funcionalidades:
 * - Scroll suave para seções internas
 * - Detecção automática de links de pacotes específicos
 * - Abertura automática de modais após navegação
 * - Suporte a conteúdo dinâmico
 * - Feedback visual com destaque de cards
 */
function initSmoothScroll() {
    // Remover event listeners existentes para evitar duplicação
    removeSmoothScrollListeners();
    
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScrollClick);
    });
}

/**
 * Remove event listeners de scroll suave para evitar duplicação
 */
function removeSmoothScrollListeners() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScrollClick);
    });
}

/**
 * Handler para clique em links de scroll suave
 */
function handleSmoothScrollClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        // Verificar se é um link de pacote específico
        const pacoteId = getPacoteIdFromLink(this);
        
        if (pacoteId) {
            // Navegar para a seção e abrir modal do pacote
            smoothScrollToAndOpenModal(targetElement, pacoteId);
        } else {
            // Navegação normal
            smoothScrollTo(targetElement);
        }
    }
}

/**
 * Identifica o ID do pacote baseado no texto do link
 */
function getPacoteIdFromLink(linkElement) {
    const linkText = linkElement.textContent.trim().toLowerCase();
    
    // Mapeamento dos textos dos links para os IDs dos pacotes
    const linkToPacoteMap = {
        'pacote oeste inferior': 'oeste-inferior',
        'pacote espaço fla+': 'espaco-fla',
        'pacote maracanã+': 'camarote',
        'pacote maracanã mais': 'camarote',
        // Fallbacks para variações de texto
        'pacote oeste inferior': 'oeste-inferior',
        'pacote espaço fla': 'espaco-fla',
        'pacote maracanã': 'camarote'
    };
    
    // Verificar correspondência exata primeiro
    if (linkToPacoteMap[linkText]) {
        return linkToPacoteMap[linkText];
    }
    
    // Verificar correspondência parcial para maior flexibilidade
    for (const [key, value] of Object.entries(linkToPacoteMap)) {
        if (linkText.includes(key) || key.includes(linkText)) {
            return value;
        }
    }
    
    return null;
}

/**
 * Navega para a seção e abre o modal do pacote após um delay
 */
function smoothScrollToAndOpenModal(element, pacoteId) {
    const offsetTop = element.offsetTop - 80; // Compensar header fixo
    
    // Fechar menu mobile se estiver aberto
    closeMobileMenu();
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    // Aguardar o scroll terminar antes de abrir o modal
    setTimeout(() => {
        // Destacar o card do pacote antes de abrir o modal
        highlightPacoteCard(pacoteId);
        
        // Abrir modal após um pequeno delay para mostrar o destaque
        setTimeout(() => {
            openPacoteModal(pacoteId);
        }, 300);
    }, 800); // Delay para permitir que o scroll suave termine
}

/**
 * Destaca temporariamente o card do pacote
 */
function highlightPacoteCard(pacoteId) {
    const pacoteCard = document.querySelector(`[data-pacote="${pacoteId}"]`);
    
    if (pacoteCard) {
        // Adicionar classe de destaque
        pacoteCard.classList.add('pacote-highlight');
        
        // Remover classe após animação
        setTimeout(() => {
            pacoteCard.classList.remove('pacote-highlight');
        }, 1000);
    }
}

/**
 * Scroll suave para elemento específico
 */
function smoothScrollTo(element) {
    const offsetTop = element.offsetTop - 80; // Compensar header fixo
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// ===== ANIMAÇÕES NO SCROLL =====
/**
 * Inicializa animações que aparecem no scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.partida-card, .produto-card, .section-title');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
/**
 * Inicializa validação de formulários
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                submitForm(this);
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

/**
 * Valida um formulário completo
 */
function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Valida um campo específico
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remover classes de erro anteriores
    field.classList.remove('error', 'success');
    
    // Validação por tipo
    let isValid = true;
    let errorMessage = '';
    
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (fieldType === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Email inválido';
    } else if (fieldName === 'telefone' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Telefone inválido';
    }
    
    // Aplicar estilo e mensagem
    if (isValid) {
        field.classList.add('success');
        removeErrorMessage(field);
    } else {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida formato de telefone
 */
function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
}

/**
 * Mostra mensagem de erro
 */
function showErrorMessage(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

/**
 * Remove mensagem de erro
 */
function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Submete formulário
 */
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Estado de carregamento
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Simular envio (substituir por integração real)
    setTimeout(() => {
        showNotification('Formulário enviado com sucesso!', 'success');
        form.reset();
        
        // Restaurar botão
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 2000);
}

// ===== CARDS DE PARTIDAS =====
/**
 * Inicializa funcionalidades dos cards de partidas
 */
function initPartidaCards() {
    const partidaCards = document.querySelectorAll('.partida-card');
    
    partidaCards.forEach(card => {
        const button = card.querySelector('.partida-btn');
        if (button) {
            button.addEventListener('click', function() {
                handlePartidaClick(card);
            });
        }
    });
}

/**
 * Lida com clique em card de partida
 */
function handlePartidaClick(card) {
    const partidaData = card.querySelector('.partida-data').textContent;
    const partidaMes = card.querySelector('.partida-mes').textContent;
    const partidaInfo = card.querySelector('.partida-info h4').textContent;
    
    showNotification(`Redirecionando para ingressos: ${partidaInfo} - ${partidaData}/${partidaMes}`, 'info');
    
    // Simular redirecionamento
    setTimeout(() => {
        // window.location.href = `/ingressos/${partidaData}-${partidaMes}`;
        console.log('Redirecionamento simulado para página de ingressos');
    }, 1500);
}

// Slider de Partidas
function initMatchesSlider() {
    // Inicializar slider principal (jogos em casa)
    initSingleSlider('#matches-slider-container');
    
    // Inicializar slider de jogos fora de casa
    initSingleSlider('#matches-slider-fora-casa-container');
}

// Função para inicializar um slider individual
function initSingleSlider(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const slider = container.querySelector('.matches-slider');
    const prevBtn = container.querySelector('.slider-btn.prev');
    const nextBtn = container.querySelector('.slider-btn.next');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const cardWidth = 300; // largura do card + gap
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });
    
    // Auto-scroll no mobile (touch)
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events para mobile
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// ===== ESTADOS DE CARREGAMENTO =====
/**
 * Inicializa estados de carregamento
 */
function initLoadingStates() {
    const buttons = document.querySelectorAll('.btn-primary, .partida-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                addLoadingState(this);
            }
        });
    });
}

/**
 * Adiciona estado de carregamento ao botão
 */
function addLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    
    // Remover loading após 2 segundos
    setTimeout(() => {
        removeLoadingState(button, originalText);
    }, 2000);
}

/**
 * Remove estado de carregamento
 */
function removeLoadingState(button, originalText) {
    button.disabled = false;
    button.classList.remove('loading');
    button.textContent = originalText;
}

// ===== MENU MOBILE =====
/**
 * Inicializa menu mobile (se existir)
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Fechar menu ao clicar em link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && isMenuOpen) {
                closeMobileMenu();
            }
        });
    }
}

/**
 * Toggle menu mobile
 */
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.add('open');
        menuToggle.classList.add('active');
        // Correção para mobile - usar position fixed em vez de overflow hidden
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
    } else {
        closeMobileMenu();
    }
}

/**
 * Fecha menu mobile
 */
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    isMenuOpen = false;
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    
    // Restaurar scroll position no mobile
    if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}

// ===== COUNTDOWN TIMER =====
/**
 * Inicializa timer de contagem regressiva
 */
function initCountdownTimer() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(element => {
        const targetDate = element.getAttribute('data-target-date');
        if (targetDate) {
            startCountdown(element, new Date(targetDate));
        }
    });
}

/**
 * Inicia contagem regressiva
 */
function startCountdown(element, targetDate) {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            element.innerHTML = '<span>Evento iniciado!</span>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Dias</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Min</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seg</span>
            </div>
        `;
    }, 1000);
}

// ===== LAZY LOADING DE IMAGENS =====
/**
 * Inicializa lazy loading de imagens
 */
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
/**
 * Mostra notificação
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Remover ao clicar no X
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

/**
 * Remove notificação
 */
function removeNotification(notification) {
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== UTILITÁRIOS =====
/**
 * Debounce function para otimizar eventos
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para otimizar eventos
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Gera ID único
 */
function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Formata data brasileira
 */
function formatDateBR(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

/**
 * Formata valores monetários para o padrão brasileiro
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// ===== MODAL DOS PACOTES =====
/**
 * Dados dos pacotes disponíveis
 */
const pacotesData = {
    'oeste-inferior': {
        title: 'PACOTE OESTE INFERIOR',
        banner: 'img/pacote oeste inferior.png',
        description: 'Desfrute de uma experiência única no setor Oeste Inferior do Maracanã. Tenha acesso privilegiado ao estádio mais icônico do Brasil, com vista incrível do campo e toda a estrutura necessária para viver momentos inesquecíveis.',
        features: [
            'Ingresso setor Oeste Inferior',
            'Transfer oficial do Flamengo',
            'Embarque na Gávea',
            'Guia credenciado',
            'Seguro viagem',
            'Kit torcedor oficial',
            'Lanche no trajeto',
            'Suporte 24h'
        ]
    },
    'espaco-fla': {
        title: 'PACOTE ESPAÇO FLA+',
        banner: 'img/pacote oeste inferior fla+.png',
        description: 'Viva a experiência premium no Espaço FLA+, área exclusiva para sócios-torcedores e convidados especiais. Desfrute de conforto máximo, gastronomia diferenciada e uma vista privilegiada do Maracanã.',
        features: [
            'Acesso ao Espaço FLA+',
            'Buffet premium incluído',
            'Bebidas liberadas',
            'Transfer executivo',
            'Estacionamento exclusivo',
            'Recepção VIP',
            'Brinde oficial do Flamengo',
            'Atendimento personalizado'
        ]
    },
    'camarote': {
        title: 'PACOTE MARACANÃ MAIS',
        banner: 'img/Soccer Stadium crowd.png',
        description: 'O máximo em experiência e exclusividade no Camarote ABSOLUT Sport. Ambiente climatizado, vista panorâmica privilegiada e serviços de primeira classe para você torcer com todo o conforto que merece.',
        features: [
            'Camarote ABSOLUT Sport',
            'Ambiente climatizado',
            'Vista panorâmica privilegiada',
            'Open bar premium',
            'Gastronomia gourmet',
            'Valet parking',
            'Acesso a área VIP',
            'Concierge exclusivo',
            'Brinde de cortesia'
        ]
    }
};

/**
 * Inicializa o modal dos pacotes
 */
function initPacotesModal() {
    const pacoteCards = document.querySelectorAll('.pacote-card');
    const pacoteButtons = document.querySelectorAll('.pacote-cta');
    const modal = document.getElementById('pacoteModal');
    const closeBtn = modal.querySelector('.modal-close');
    const modalCta = modal.querySelector('.modal-cta');
    
    // Event listeners para os cards
    pacoteCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Não abrir modal se clicou no botão
            if (e.target.classList.contains('pacote-cta')) {
                return;
            }
            const pacoteId = this.getAttribute('data-pacote');
            openPacoteModal(pacoteId);
        });
        
        // Adicionar suporte a teclado
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const pacoteId = this.getAttribute('data-pacote');
                openPacoteModal(pacoteId);
            }
        });
    });
    
    // Event listeners para os botões dos pacotes
    pacoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir que o card também seja clicado
            const pacoteId = this.getAttribute('data-pacote');
            openPacoteModal(pacoteId);
        });
    });
    
    // Event listener para fechar modal
    closeBtn.addEventListener('click', closePacoteModal);
    
    // Fechar modal ao clicar no overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePacoteModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePacoteModal();
        }
    });
    
    // Event listener para o botão CTA
    modalCta.addEventListener('click', function() {
        const pacoteId = modal.getAttribute('data-current-pacote');
        const links = {
            'oeste-inferior': 'https://absolut-sport.com.br/collections/flamengo',
            'espaco-fla': 'https://absolut-sport.com.br/collections/flamengo'
        };
        window.open(links[pacoteId] || 'https://absolut-sport.com.br/collections/flamengo', '_blank');
        closePacoteModal();
    });
}

/**
 * Abre o modal com as informações do pacote
 */
function openPacoteModal(pacoteId) {
    const modal = document.getElementById('pacoteModal');
    const pacoteData = pacotesData[pacoteId];
    
    if (!pacoteData) {
        console.error('Pacote não encontrado:', pacoteId);
        return;
    }
    
    // Preencher conteúdo do modal
    document.getElementById('modalTitle').textContent = pacoteData.title;
    document.getElementById('modalDescription').textContent = pacoteData.description;
    
    // Preencher features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    pacoteData.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Abrir modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll da página
    
    // Focar no botão de fechar para acessibilidade
    modal.querySelector('.modal-close').focus();
}

/**
 * Fecha o modal dos pacotes
 */
function closePacoteModal() {
    const modal = document.getElementById('pacoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll da página
}

/**
 * Adiciona efeito de hover aos cards dos pacotes
 */
function addPacoteHoverEffects() {
    const pacoteCards = document.querySelectorAll('.pacote-card');
    
    pacoteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Adiciona efeito de zoom progressivo em 3 etapas aos cards dos pacotes
 */
function initPacoteZoomEffect() {
    const pacoteCards = document.querySelectorAll('.pacote-card');
    
    pacoteCards.forEach(card => {
        let zoomTimeouts = [];
        
        card.addEventListener('mouseenter', function() {
            // Limpar timeouts anteriores se existirem
            zoomTimeouts.forEach(timeout => clearTimeout(timeout));
            zoomTimeouts = [];
            
            // Primeira etapa - 5% de zoom
            this.classList.add('zoom-step-1');
            
            // Segunda etapa - 10% de zoom (após 30ms)
            zoomTimeouts.push(setTimeout(() => {
                this.classList.remove('zoom-step-1');
                this.classList.add('zoom-step-2');
            }, 220));
            
            // Terceira etapa - 15% de zoom (após mais 30ms)
            // zoomTimeouts.push(setTimeout(() => {
            //     this.classList.remove('zoom-step-2');
            //     this.classList.add('zoom-step-3');
            // }, 360));
        });
        
        card.addEventListener('mouseleave', function() {
            // Limpar timeouts pendentes
            zoomTimeouts.forEach(timeout => clearTimeout(timeout));
            zoomTimeouts = [];
            
            // Remover todas as classes de zoom
            this.classList.remove('zoom-step-1', 'zoom-step-2', 'zoom-step-3');
        });
    });
}

// ===== EFEITO MÁQUINA DE ESCREVER =====
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!textElement) return;
    
    // Remover o cursor separado do HTML - vamos incorporá-lo ao texto
    if (cursorElement) {
        cursorElement.remove();
    }
    
    const sentences = [
        "AGÊNCIA OFICIAL DE VIAGENS E EXPERIÊNCIAS DO FLAMENGO",
        "AGÊNCIA OFICIAL DA NAÇÃO",
        "ABSOLUT SPORT  ISSO É VIVER"
    ];
    
    let currentSentenceIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    
    // Agora você pode usar qualquer valor para as pausas
    const typingSpeed = 40;
    const deletingSpeed = 30;
    const pauseBetweenSentences = 1000; // Ex: 2 segundos
    const pauseBeforeDeleting = 2000;    // Ex: 2 segundos
    
    function typewriter() {
        const currentSentence = sentences[currentSentenceIndex];
        
        if (isTyping) {
            // Se ainda não terminou de digitar a frase
            if (currentCharIndex < currentSentence.length) {
                const currentText = currentSentence.substring(0, currentCharIndex + 1);
                textElement.innerHTML = currentText + '<span class="cursor-inline">|</span>';
                currentCharIndex++;
                setTimeout(typewriter, typingSpeed);
            } 
            // Se terminou de digitar, inicia a pausa antes de apagar
            else {
                isTyping = false;
                // Deixa o texto completo com o cursor piscando
                textElement.innerHTML = currentSentence + '<span class="cursor-inline blinking">|</span>';
                setTimeout(typewriter, pauseBeforeDeleting);
            }
        } else { // Apagando
            // Se ainda não terminou de apagar
            if (currentCharIndex > 0) {
                const currentText = currentSentence.substring(0, currentCharIndex - 1);
                textElement.innerHTML = currentText + '<span class="cursor-inline">|</span>';
                currentCharIndex--;
                setTimeout(typewriter, deletingSpeed);
            }
            // Se terminou de apagar, inicia a pausa antes da próxima frase
            else {
                isTyping = true;
                currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
                // Deixa apenas o cursor piscando
                textElement.innerHTML = '<span class="cursor-inline blinking">|</span>';
                setTimeout(typewriter, pauseBetweenSentences);
            }
        }
    }
    
    // Iniciar o efeito
    typewriter();
}

// ===== EVENTOS GLOBAIS =====
/**
 * Listener para tecla ESC
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }
});

/**
 * Listener para scroll (otimizado)
 */
const handleScroll = throttle(() => {
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header) {
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 100);

window.addEventListener('scroll', handleScroll);

/**
 * Listener para resize (otimizado)
 */
const handleResize = debounce(() => {
    // Ajustar elementos responsivos se necessário
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
}, 250);

window.addEventListener('resize', handleResize);

// ===== FOOTER FUNCTIONALITY =====
// Adicionar funcionalidade para os botões "Voltar ao topo"
document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('.ec-anchor-top');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});

// ===== EXPORTAR FUNÇÕES (se necessário) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showNotification,
        formatDateBR,
        formatCurrency
    };
} 