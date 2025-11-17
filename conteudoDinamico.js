/**
 * Conteúdo Dinâmico - Google Sheets Integration
 * Carrega dinamicamente textos e imagens da página do Google Sheets
 */

// URL do Google Sheets CSV para textos e imagens
const GOOGLE_SHEETS_CONTEUDO_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuz0diAWyMYDYYQjK0LMDC0pwzhTlrB9eT3aNtotZJkPgucV2QC646FR9KLD1t6xdhZsYkKXta0bIJ/pub?gid=0&single=true&output=csv';

// Valores padrão para fallback
const CONTEUDO_PADRAO = {
    // Header
    'header-logo-text': '',
    'header-logo-img': 'img/flamengo-absolut-sport-logo-oficial-parceria.png',
    'nav-link-1': 'Pacote Oeste Inferior',
    'nav-link-2': 'Pacote Espaço Fla+',
    'nav-link-3': 'Camarote ABSOLUT Sport',
    'mobile-nav-link-1': 'Pacote Oeste Inferior',
    'mobile-nav-link-2': 'Pacote Espaço Fla+',
    'mobile-nav-link-3': 'PACOTE MARACANÃ MAIS',
    
    // Hero
    'hero-video': 'vid/intro-flamengo-nação.mp4',
    'typewriter-text': 'VOCÊ AONDE O FLAMENGO ESTIVER',
    'hero-subtitle': 'siga o flamengo e faça parte da historia',
    'hero-cta': 'COMPRE AGORA',
    
    // Seção Aonde
    'secao-aonde-title': 'VOCÊ AONDE O<br>FLAMENGO ESTIVER',
    
    // Agência
    'agencia-img': 'img/flamengo-agencia-oficial-absolut-sport-mobile.jpg',
    'agencia-title': 'A ABSOLUT Sport é a <span>Parceira do Clube de Regatas do Flamengo.</span>',
    'agencia-description': 'Com o Visto Rubro-Negro, você vive o Maracanã com a tranquilidade de quem tem tudo planejado: segurança, conforto, comodidade e suporte em cada detalhe. Uma experiência pensada para que você aproveite o jogo sem preocupações e com a excelência que só a ABSOLUT Sport oferece.',
    
    // Maracanã 1
    // 'maraca-title-1': 'O MARACA É NOSSO<br><span>O LUGAR É SEU.</span>', // Removido - agora está no HTML
    'maraca-description-1': 'Com o Visto Rubro-Negro, um dia de jogo do Flamengo vai muito além dos 90 minutos. Você garante ingressos nos setores mais premium do Maracanã e transfers oficiais com pontos de encontro, que levam a torcida direto para dentro do estádio e, ao final da partida, de volta aos mesmos pontos.',
    'maraca-cta-1': 'Saiba Mais',
    
    // Pacotes
    'pacotes-title': 'PACOTES DISPONÍVEIS',
    'pacote-1-img': 'img/pacote oeste inferior.png',
    'pacote-1-title': 'PACOTE<br>OESTE INFERIOR',
    'pacote-1-tag-1': 'NA TORCIDA',
    'pacote-1-tag-2': 'ESGOTANDO RÁDPIDO',
    'pacote-1-tag-3': 'MAIS PROCURADO',
    'pacote-2-img': 'img/pacote oeste inferior fla+.png',
    'pacote-2-title': 'PACOTE<br>ESPAÇO FLA+',
    'pacote-2-tag-1': 'ESPAÇO PREMIUM',
    'pacote-2-tag-2': 'VISÃO PRIVILEGIADA',
    'pacote-2-tag-3': 'BUFFET LIBERADO',
    'pacote-3-img': 'img/Soccer Stadium crowd.png',
    'pacote-3-title': 'PACOTE<br>MARACANÃ MAIS',
    'pacote-3-tag-1': 'CAMAROTE',
    'pacote-3-tag-2': 'VISÃO PRIVILEGIADA',
    'pacote-3-tag-3': 'ULTIMAS UNIDADES',
    
    // Maracanã 2
    'maraca-title-2': 'Visto <br><span>RURO-NEGRO</span>',
    'maraca-description-2': 'A ABSOLUT Sport te leva pra ver o Mengão no Maraca. Nossa equipe cuida de toda a logística para você viver uma experiência completa com segurança e comodidade. ',
    'maraca-cta-2': 'Saiba Mais',
    
    // Benefícios 1
    'beneficios-title-1': '',
    'beneficio-1-text': '',
    'beneficio-2-text': '',
    'beneficio-3-text': '',
    'beneficio-4-text': '',
    // 'beneficio-5-text': 'Aéreo (sob consulta)',
    
    // Modal
    'modal-cta': 'COMPRAR AGORA',
    
    // Newsletter
    'newsletter-title': '',
    'newsletter-description': '',
    'newsletter-label-nome': '',
    'newsletter-label-email': '',
    'newsletter-label-time': '',
    'newsletter-label-perfil': '',
    'newsletter-label-captcha': '',
    'newsletter-submit': '',
    'newsletter-img': '',
    
    // Absolut Sport
    'absolut-title': 'POR QUE COMPRAR COM A <span style="color: #155f97;">ABSOLUT SPORT?</span>',
    'absolut-description': 'Na ABSOLUT Sport, cada detalhe é pensado para que você viva o Flamengo do jeito que merece: sem preocupação, com segurança e cercado de experiências oficiais e exclusivas. Somos a agência oficial de viagens e experiências do Clube, o que garante acesso a ingressos certificados, logística completa e atendimento dedicado, seja no Maracanã ou em qualquer estádio do Brasil.',
    'absolut-cta': 'Saiba mais',
    
    // Benefícios 2
    'beneficios-title-2': '',
    'absolut-beneficio-1-text': '',
    'absolut-beneficio-2-text': '',
    'absolut-beneficio-3-text': '',
    'absolut-beneficio-4-text': '',
    'absolut-beneficio-5-text': '',
    'absolut-beneficio-6-text': '',
    
    // FAQ
    'faq-title': 'Perguntas Frequentes',
    'faq-question-1': 'Como posso comprar ingressos?',
    'faq-answer-1': 'Você pode comprar ingressos através do site oficial, nas bilheterias do Maracanã ou nos pontos de venda autorizados.',
    'faq-question-2': 'Qual é o programa de sócio-torcedor?',
    'faq-answer-2': 'O programa oferece benefícios exclusivos como desconto em ingressos, prioridade na compra e produtos oficiais.',
    'faq-question-3': 'Como funciona o programa de turismo?',
    'faq-answer-3': 'Organizamos viagens para acompanhar o Flamengo em jogos fora de casa, com pacotes completos incluindo transporte e hospedagem.'
};

// Variável global para debug
let DEBUG_MODE = false;

/**
 * Função para converter CSV em array de objetos
 * @param {string} csvText - Texto CSV
 * @returns {Array} Array de objetos com os dados
 */
function parseCSVConteudo(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const dados = lines.slice(1).map((line) => {
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, headerIndex) => {
            obj[header] = values[headerIndex] || '';
        });
        
        return obj;
    });
    
    return dados;
}

/**
 * Função para aplicar texto em um elemento
 * @param {string} id - ID do elemento
 * @param {string} conteudo - Conteúdo a ser aplicado
 */
function aplicarTexto(id, conteudo) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.innerHTML = conteudo;
    }
}

/**
 * Função para aplicar imagem em um elemento
 * @param {string} id - ID do elemento
 * @param {string} src - URL da imagem
 */
function aplicarImagem(id, src) {
    const elemento = document.getElementById(id);
    if (elemento) {
        if (elemento.tagName === 'IMG') {
            elemento.src = src;
            elemento.alt = elemento.alt || 'Imagem carregada dinamicamente';
        } else {
            elemento.style.backgroundImage = `url('${src}')`;
        }
    }
}

/**
 * Função para aplicar vídeo em um elemento
 * @param {string} id - ID do elemento
 * @param {string} src - URL do vídeo
 */
function aplicarVideo(id, src) {
    const elemento = document.getElementById(id);
    if (elemento) {
        if (elemento.tagName === 'VIDEO') {
            const source = elemento.querySelector('source');
            if (source) {
                source.src = src;
                elemento.load(); // Recarrega o vídeo
            }
        }
    }
}

/**
 * Função para carregar conteúdo padrão
 */
function carregarConteudoPadrao() {
    Object.keys(CONTEUDO_PADRAO).forEach(id => {
        // Pular maraca-title-1 pois agora está no HTML estático
        if (id === 'maraca-title-1') {
            return;
        }
        
        const conteudo = CONTEUDO_PADRAO[id];
        
        // Determinar o tipo baseado no conteúdo
        if (id.includes('img') || id.includes('image')) {
            aplicarImagem(id, conteudo);
        } else if (id.includes('video')) {
            aplicarVideo(id, conteudo);
        } else {
            aplicarTexto(id, conteudo);
        }
    });
}

/**
 * Função para aplicar conteúdo baseado no tipo
 * @param {Object} item - Item da planilha
 */
function aplicarConteudo(item) {
    const { id, tipo, conteudo_atual } = item;
    
    if (!id || !conteudo_atual) {
        return;
    }
    
    // Converter ID para formato usado no HTML (substituir underscore por hífen)
    const elementId = id.replace(/_/g, '-');
    
    // Pular maraca-title-1 pois agora está no HTML estático
    if (elementId === 'maraca-title-1') {
        return;
    }
    
    switch (tipo) {
        case 'texto':
            aplicarTexto(elementId, conteudo_atual);
            break;
        case 'imagem':
            aplicarImagem(elementId, conteudo_atual);
            break;
        case 'video':
            aplicarVideo(elementId, conteudo_atual);
            break;
        default:
            // Se não tiver tipo especificado, tentar detectar automaticamente
            if (elementId.includes('img') || elementId.includes('image')) {
                aplicarImagem(elementId, conteudo_atual);
            } else if (elementId.includes('video')) {
                aplicarVideo(elementId, conteudo_atual);
            } else {
                aplicarTexto(elementId, conteudo_atual);
            }
    }
}

/**
 * Função para aplicar conteúdo dinâmico da planilha
 * @param {Array} dados - Array com todos os dados da planilha
 */
function aplicarConteudoDinamico(dados) {
    if (!dados || dados.length === 0) {
        return;
    }
    
    // Filtrar dados válidos
    const dadosValidos = dados.filter(item => {
        return item.id && item.conteudo_atual;
    });
    
    dadosValidos.forEach((item) => {
        aplicarConteudo(item);
    });
}

/**
 * Função para testar a conexão com a planilha
 */
async function testarPlanilha() {
    try {
        const response = await fetch(GOOGLE_SHEETS_CONTEUDO_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const text = await response.text();
        const dados = parseCSVConteudo(text);
        
        return dados;
        
    } catch (error) {
        return null;
    }
}

/**
 * Função principal para carregar e aplicar o conteúdo
 */
async function carregarConteudoDinamico() {
    try {
        // Primeiro, carregar conteúdo padrão
        carregarConteudoPadrao();
        
        // Tentar carregar dados da planilha
        const response = await fetch(GOOGLE_SHEETS_CONTEUDO_URL);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const csvText = await response.text();
        const dados = parseCSVConteudo(csvText);
        
        // Aplicar conteúdo da planilha (sobrescrevendo o padrão onde disponível)
        aplicarConteudoDinamico(dados);
        
    } catch (error) {
        // Usar conteúdo padrão como fallback
    }
}

/**
 * Função para recarregar o conteúdo
 */
function recarregarConteudo() {
    carregarConteudoDinamico();
}

/**
 * Função para aplicar efeito typewriter ao título hero
 */
function iniciarTypewriter() {
    const elemento = document.getElementById('typewriter-text');
    if (!elemento) return;
    
    const texto = elemento.textContent || elemento.innerHTML;
    if (!texto) return;
    
    elemento.textContent = '';
    let i = 0;
    
    const typewriter = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(typewriter);
        }
    }, 100);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Carregar conteúdo imediatamente
    carregarConteudoDinamico().then(() => {
        // Iniciar typewriter após carregar o conteúdo
        setTimeout(iniciarTypewriter, 1000);
    });
});

// Exportar funções para uso global
window.conteudoDinamico = {
    carregar: carregarConteudoDinamico,
    recarregar: recarregarConteudo,
    testar: testarPlanilha,
    debug: () => { DEBUG_MODE = !DEBUG_MODE; },
    padrao: CONTEUDO_PADRAO
}; 