/**
 * Conteúdo Dinâmico - Google Sheets Integration
 * Carrega dinamicamente textos e imagens da página do Google Sheets
 */

// URL do Google Sheets CSV para textos e imagens
const GOOGLE_SHEETS_CONTEUDO_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuz0diAWyMYDYYQjK0LMDC0pwzhTlrB9eT3aNtotZJkPgucV2QC646FR9KLD1t6xdhZsYkKXta0bIJ/pub?gid=0&single=true&output=csv';

// Valores padrão para fallback
const CONTEUDO_PADRAO = {
    // Header
    'header-logo-text': 'Agência Oficial de Viagens e Experiências',
    'header-logo-img': 'img/flamengo-absolut-sport-logo-oficial-parceria.png',
    'nav-link-1': 'Espaço FLA+',
    'nav-link-2': 'Oeste Inferior',
    'nav-link-3': 'Camarote ABSOLUT Sport',
    'mobile-nav-link-1': 'Espaço FLA+',
    'mobile-nav-link-2': 'Oeste Inferior',
    'mobile-nav-link-3': 'Camarote ABSOLUT Sport',
    
    // Hero
    'hero-video': 'vid/intro-flamengo-nação.mp4',
    'typewriter-text': 'VOCÊ AONDE O FLAMENGO ESTIVER',
    'hero-subtitle': 'siga o flamengo e faça parte da historia',
    'hero-cta': 'COMPRE AGORA',
    
    // Seção Aonde
    'secao-aonde-title': 'VOCÊ AONDE O<br>FLAMENGO ESTIVER',
    
    // Agência
    'agencia-img': 'img/flamengo-agencia-oficial-absolut-sport-mobile.jpg',
    'agencia-title': 'AGÊNCIA OFICIAL <span>DA NAÇÃO</span>',
    'agencia-description': 'Porque somos a agência oficial do Flamengo, oferecendo experiência 100% oficial, logística completa e suporte total para você só se preocupar em torcer dentro e fora de casa.',
    
    // Maracanã 1
    'maraca-title-1': 'O MARACA É NOSSO<br><span>O LUGAR É SEU.</span>',
    'maraca-description-1': 'Do embarque na Gávea ao apito final no Maracanã, seu jogo começa antes com conforto, segurança e Transfer Oficial do Flamengo.',
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
    'pacote-3-title': 'PACOTE<br>CAMAROTE',
    'pacote-3-tag-1': 'CAMAROTE',
    'pacote-3-tag-2': 'VISÃO PRIVILEGIADA',
    'pacote-3-tag-3': 'ULTIMAS UNIDADES',
    
    // Maracanã 2
    'maraca-title-2': 'SIGA O FLAMENGO<br><span>AONDE ELE FOR</span>',
    'maraca-description-2': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta faucibus tellus vitae semper. Morbi vulputate viverra dui, nec bibendum est tincidunt lacinia. Donec iaculis orci eget tortor venenatis posuere.',
    'maraca-cta-2': 'Saiba Mais',
    
    // Benefícios 1
    'beneficios-title-1': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta faucibus.',
    'beneficio-1-text': 'Ingressos no setor da torcida do Flamengo.',
    'beneficio-2-text': 'Hospedagem nos melhores hotéis.',
    'beneficio-3-text': 'Matchday transfer.',
    'beneficio-4-text': 'Experiências locais, brindes e suporte.',
    'beneficio-5-text': 'Aéreo (sob consulta)',
    
    // Modal
    'modal-cta': 'COMPRAR AGORA',
    
    // Newsletter
    'newsletter-title': 'QUER SER AVISADO<br>SOBRE OS PRÓXIMOS<br>PACOTES?',
    'newsletter-description': 'Deixe seu contato e garanta prioridade no acesso às melhores experiências nos jogos do Flamengo. Viva o Flamengo como protagonista!',
    'newsletter-label-nome': 'Nome*',
    'newsletter-label-email': 'Email*',
    'newsletter-label-time': 'Qual time você torce*',
    'newsletter-label-perfil': 'Eu sou um(a):*',
    'newsletter-label-captcha': '80 + 1 = ?',
    'newsletter-submit': 'Quero ser avisado!',
    'newsletter-img': 'img/Jogadores.png',
    
    // Absolut Sport
    'absolut-title': 'POR QUE COMPRAR COM A <span style="color: #155f97;">ABSOLUT SPORT?</span>',
    'absolut-description': 'Na ABSOLUT Sport, cada detalhe é pensado para que você viva o Flamengo do jeito que merece: sem preocupação, com segurança e cercado de experiências oficiais e exclusivas. Somos a agência oficial de viagens e experiências do Clube, o que garante acesso a ingressos certificados, logística completa e atendimento dedicado, seja no Maracanã ou em qualquer estádio do Brasil.',
    'absolut-cta': 'Saiba mais',
    
    // Benefícios 2
    'beneficios-title-2': 'Por que escolher a ABSOLUT Sport?',
    'absolut-beneficio-1-text': 'Equipe Dedicada.',
    'absolut-beneficio-2-text': 'Atendimento e Suporte.',
    'absolut-beneficio-3-text': 'Melhores acomodações.',
    'absolut-beneficio-4-text': 'Transfer oficiais.',
    'absolut-beneficio-5-text': 'Aéreo sob cotação.',
    'absolut-beneficio-6-text': 'Ingressos oficiais.',
    
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
let DEBUG_MODE = true;

/**
 * Função para converter CSV em array de objetos
 * @param {string} csvText - Texto CSV
 * @returns {Array} Array de objetos com os dados
 */
function parseCSVConteudo(csvText) {
    if (DEBUG_MODE) console.log('📝 Parseando CSV...', csvText.substring(0, 200) + '...');
    
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    if (DEBUG_MODE) console.log('📋 Headers encontrados:', headers);
    
    const dados = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, headerIndex) => {
            obj[header] = values[headerIndex] || '';
        });
        
        if (DEBUG_MODE && index < 3) {
            console.log(`📄 Linha ${index + 1}:`, obj);
        }
        
        return obj;
    });
    
    if (DEBUG_MODE) console.log(`✅ ${dados.length} linhas parseadas`);
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
        if (DEBUG_MODE) console.log(`✅ Texto aplicado em #${id}:`, conteudo.substring(0, 50) + (conteudo.length > 50 ? '...' : ''));
    } else {
        if (DEBUG_MODE) console.warn(`⚠️ Elemento não encontrado: #${id}`);
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
        if (DEBUG_MODE) console.log(`✅ Imagem aplicada em #${id}:`, src);
    } else {
        if (DEBUG_MODE) console.warn(`⚠️ Elemento não encontrado: #${id}`);
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
        if (DEBUG_MODE) console.log(`✅ Vídeo aplicado em #${id}:`, src);
    } else {
        if (DEBUG_MODE) console.warn(`⚠️ Elemento de vídeo não encontrado: #${id}`);
    }
}

/**
 * Função para carregar conteúdo padrão
 */
function carregarConteudoPadrao() {
    console.log('🔄 Carregando conteúdo padrão...');
    
    Object.keys(CONTEUDO_PADRAO).forEach(id => {
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
    
    console.log('✅ Conteúdo padrão carregado!');
}

/**
 * Função para aplicar conteúdo baseado no tipo
 * @param {Object} item - Item da planilha
 */
function aplicarConteudo(item) {
    const { id, tipo, conteudo_atual } = item;
    
    if (!id || !conteudo_atual) {
        if (DEBUG_MODE) console.warn('⚠️ Item inválido:', item);
        return;
    }
    
    // Converter ID para formato usado no HTML (substituir underscore por hífen)
    const elementId = id.replace(/_/g, '-');
    
    if (DEBUG_MODE) console.log(`🔄 Aplicando conteúdo: ${id} → ${elementId} (${tipo || 'auto'})`);
    
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
        console.warn('⚠️ Nenhum dado da planilha disponível, usando conteúdo padrão');
        return;
    }
    
    console.log('🔄 Aplicando conteúdo da planilha...');
    if (DEBUG_MODE) console.log('📊 Dados recebidos:', dados);
    
    // Filtrar dados válidos
    const dadosValidos = dados.filter(item => {
        const valido = item.id && item.conteudo_atual;
        if (DEBUG_MODE && !valido) {
            console.log('❌ Item inválido descartado:', item);
        }
        return valido;
    });
    
    if (DEBUG_MODE) console.log(`📋 ${dadosValidos.length} itens válidos de ${dados.length} total`);
    
    dadosValidos.forEach((item, index) => {
        if (DEBUG_MODE) console.log(`📝 Aplicando item ${index + 1}/${dadosValidos.length}:`, item);
        aplicarConteudo(item);
    });
    
    console.log(`✅ ${dadosValidos.length} itens da planilha aplicados!`);
}

/**
 * Função para testar a conexão com a planilha
 */
async function testarPlanilha() {
    try {
        console.log('🧪 Testando conexão com planilha...');
        console.log('🔗 URL:', GOOGLE_SHEETS_CONTEUDO_URL);
        
        const response = await fetch(GOOGLE_SHEETS_CONTEUDO_URL);
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('📄 CSV recebido (primeiros 500 chars):', text.substring(0, 500));
        console.log('📏 Tamanho total do CSV:', text.length);
        
        const dados = parseCSVConteudo(text);
        console.log('✅ Teste concluído com sucesso!');
        
        return dados;
        
    } catch (error) {
        console.error('❌ Erro no teste da planilha:', error);
        return null;
    }
}

/**
 * Função principal para carregar e aplicar o conteúdo
 */
async function carregarConteudoDinamico() {
    try {
        console.log('🔄 Iniciando carregamento de conteúdo dinâmico...');
        
        // Primeiro, carregar conteúdo padrão
        carregarConteudoPadrao();
        
        // Tentar carregar dados da planilha
        console.log('🔄 Tentando carregar dados da planilha...');
        
        const response = await fetch(GOOGLE_SHEETS_CONTEUDO_URL);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const csvText = await response.text();
        if (DEBUG_MODE) console.log('📄 CSV carregado, tamanho:', csvText.length);
        
        const dados = parseCSVConteudo(csvText);
        
        // Aplicar conteúdo da planilha (sobrescrevendo o padrão onde disponível)
        aplicarConteudoDinamico(dados);
        
        console.log('✅ Carregamento de conteúdo dinâmico concluído!');
        
    } catch (error) {
        console.warn('⚠️ Erro ao carregar conteúdo da planilha:', error);
        console.log('✅ Usando conteúdo padrão como fallback');
    }
}

/**
 * Função para recarregar o conteúdo
 */
function recarregarConteudo() {
    console.log('🔄 Recarregando conteúdo...');
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
    console.log('🚀 DOM carregado, iniciando sistema de conteúdo dinâmico...');
    
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
    debug: () => { DEBUG_MODE = !DEBUG_MODE; console.log('Debug mode:', DEBUG_MODE); },
    padrao: CONTEUDO_PADRAO
}; 