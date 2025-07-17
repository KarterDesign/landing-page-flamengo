/**
 * Conteúdo Dinâmico - Google Sheets Integration
 * Carrega dinamicamente textos e imagens da página do Google Sheets
 */

// URL do Google Sheets CSV para textos e imagens
const GOOGLE_SHEETS_CONTEUDO_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuz0diAWyMYDYYQjK0LMDC0pwzhTlrB9eT3aNtotZJkPgucV2QC646FR9KLD1t6xdhZsYkKXta0bIJ/pub?gid=0&single=true&output=csv';

/**
 * Função para converter CSV em array de objetos
 * @param {string} csvText - Texto CSV
 * @returns {Array} Array de objetos com os dados
 */
function parseCSVConteudo(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    });
}

/**
 * Função para aplicar texto em um elemento
 * @param {string} id - ID do elemento
 * @param {string} conteudo - Conteúdo a ser aplicado
 */
function aplicarTexto(id, conteudo) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = conteudo;
        console.log(`✅ Texto aplicado em #${id}: ${conteudo}`);
    } else {
        // Tentar encontrar por classe se não encontrar por ID
        const elementoClasse = document.querySelector(`.${id}`);
        if (elementoClasse) {
            elementoClasse.textContent = conteudo;
            console.log(`✅ Texto aplicado em .${id}: ${conteudo}`);
        } else {
            console.warn(`⚠️ Elemento não encontrado: #${id} ou .${id}`);
        }
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
        } else {
            elemento.style.backgroundImage = `url('${src}')`;
        }
        console.log(`✅ Imagem aplicada em #${id}: ${src}`);
    } else {
        // Tentar encontrar por classe se não encontrar por ID
        const elementoClasse = document.querySelector(`.${id}`);
        if (elementoClasse) {
            if (elementoClasse.tagName === 'IMG') {
                elementoClasse.src = src;
            } else {
                elementoClasse.style.backgroundImage = `url('${src}')`;
            }
            console.log(`✅ Imagem aplicada em .${id}: ${src}`);
        } else {
            console.warn(`⚠️ Elemento não encontrado: #${id} ou .${id}`);
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
        console.log(`✅ Vídeo aplicado em #${id}: ${src}`);
    } else {
        console.warn(`⚠️ Elemento de vídeo não encontrado: #${id}`);
    }
}

/**
 * Função para aplicar conteúdo baseado no tipo
 * @param {Object} item - Item da planilha
 */
function aplicarConteudo(item) {
    const { id, tipo, conteudo_atual } = item;
    
    if (!id || !conteudo_atual) {
        console.warn('⚠️ Item inválido:', item);
        return;
    }
    
    switch (tipo) {
        case 'texto':
            aplicarTexto(id, conteudo_atual);
            break;
        case 'imagem':
            aplicarImagem(id, conteudo_atual);
            break;
        case 'video':
            aplicarVideo(id, conteudo_atual);
            break;
        default:
            console.warn(`⚠️ Tipo não reconhecido: ${tipo}`);
    }
}

/**
 * Função para aplicar conteúdo específico por seção
 * @param {Array} dados - Array com todos os dados da planilha
 */
function aplicarConteudoPorSecao(dados) {
    // Aplicar logo e texto do header
    const logoTexto = dados.find(item => item.id === 'header_logo_text');
    if (logoTexto) {
        const logoElement = document.querySelector('.logo-text');
        if (logoElement) {
            logoElement.textContent = logoTexto.conteudo_atual;
        }
    }
    
    // Aplicar links do menu
    const menuLinks = dados.filter(item => item.id.startsWith('nav_link_'));
    menuLinks.forEach((link, index) => {
        const navLink = document.querySelector(`.nav-links li:nth-child(${index + 1}) a`);
        if (navLink) {
            navLink.textContent = link.conteudo_atual;
        }
    });
    
    // Aplicar título do hero (typewriter)
    const heroTitle = dados.find(item => item.id === 'hero_title');
    if (heroTitle) {
        // Aplicar ao typewriter se existir
        const typewriterElement = document.getElementById('typewriter-text');
        if (typewriterElement) {
            typewriterElement.textContent = heroTitle.conteudo_atual;
        }
    }
    
    // Aplicar subtítulo do hero
    const heroSubtitle = dados.find(item => item.id === 'hero_subtitle');
    if (heroSubtitle) {
        const subtitleElement = document.querySelector('.hero-subtitle');
        if (subtitleElement) {
            subtitleElement.textContent = heroSubtitle.conteudo_atual;
        }
    }
    
    // Aplicar botão CTA do hero
    const heroCTA = dados.find(item => item.id === 'hero_cta');
    if (heroCTA) {
        const ctaElement = document.querySelector('.hero-cta');
        if (ctaElement) {
            ctaElement.textContent = heroCTA.conteudo_atual;
        }
    }
    
    // Aplicar título da seção "Você aonde o Flamengo estiver"
    const secaoAondeTitle = dados.find(item => item.id === 'secao_aonde_title');
    if (secaoAondeTitle) {
        const titleElement = document.querySelector('.banner-content h1');
        if (titleElement) {
            titleElement.innerHTML = secaoAondeTitle.conteudo_atual.replace(/\n/g, '<br>');
        }
    }
    
    // Aplicar conteúdo da seção agência oficial
    const agenciaTitle = dados.find(item => item.id === 'agencia_title');
    if (agenciaTitle) {
        const titleElement = document.querySelector('.agencia-title');
        if (titleElement) {
            titleElement.innerHTML = agenciaTitle.conteudo_atual.replace('DA NAÇÃO', '<span>DA NAÇÃO</span>');
        }
    }
    
    const agenciaDescription = dados.find(item => item.id === 'agencia_description');
    if (agenciaDescription) {
        const descElement = document.querySelector('.agencia-description');
        if (descElement) {
            descElement.textContent = agenciaDescription.conteudo_atual;
        }
    }
    
    // Aplicar imagem da agência oficial
    const agenciaImg = dados.find(item => item.id === 'agencia_img');
    if (agenciaImg) {
        const imgElement = document.querySelector('.agencia-oficial-img img');
        if (imgElement) {
            imgElement.src = agenciaImg.conteudo_atual;
        }
    }
    
    // Aplicar conteúdo dos pacotes
    aplicarConteudoPacotes(dados);
    
    // Aplicar conteúdo da newsletter
    aplicarConteudoNewsletter(dados);
    
    // Aplicar conteúdo do FAQ
    aplicarConteudoFAQ(dados);
    
    // Aplicar outros conteúdos dinamicamente
    dados.forEach(item => {
        if (item.id && item.tipo && item.conteudo_atual) {
            aplicarConteudo(item);
        }
    });
}

/**
 * Função para aplicar conteúdo dos pacotes
 * @param {Array} dados - Array com todos os dados da planilha
 */
function aplicarConteudoPacotes(dados) {
    // Título da seção de pacotes
    const pacotesTitle = dados.find(item => item.id === 'pacotes_title');
    if (pacotesTitle) {
        const titleElement = document.querySelector('.pacotes-secao .section-title h2');
        if (titleElement) {
            titleElement.textContent = pacotesTitle.conteudo_atual;
        }
    }
    
    // Aplicar dados dos pacotes individuais
    for (let i = 1; i <= 3; i++) {
        const pacoteTitle = dados.find(item => item.id === `pacote_${i}_title`);
        const pacoteImg = dados.find(item => item.id === `pacote_${i}_img`);
        
        if (pacoteTitle) {
            const titleElement = document.querySelector(`.pacote-card:nth-child(${i}) .pacote-title`);
            if (titleElement) {
                titleElement.innerHTML = pacoteTitle.conteudo_atual.replace(/\n/g, '<br>');
            }
        }
        
        if (pacoteImg) {
            const imgElement = document.querySelector(`.pacote-card:nth-child(${i}) .pacote-image img`);
            if (imgElement) {
                imgElement.src = pacoteImg.conteudo_atual;
            }
        }
        
        // Aplicar tags dos pacotes
        for (let j = 1; j <= 3; j++) {
            const tag = dados.find(item => item.id === `pacote_${i}_tag_${j}`);
            if (tag) {
                const tagElement = document.querySelector(`.pacote-card:nth-child(${i}) .tag:nth-child(${j})`);
                if (tagElement) {
                    tagElement.textContent = tag.conteudo_atual;
                }
            }
        }
    }
}

/**
 * Função para aplicar conteúdo da newsletter
 * @param {Array} dados - Array com todos os dados da planilha
 */
function aplicarConteudoNewsletter(dados) {
    const newsletterTitle = dados.find(item => item.id === 'newsletter_title');
    if (newsletterTitle) {
        const titleElement = document.querySelector('.newsletter-title');
        if (titleElement) {
            titleElement.innerHTML = newsletterTitle.conteudo_atual.replace(/\n/g, '<br>');
        }
    }
    
    const newsletterDescription = dados.find(item => item.id === 'newsletter_description');
    if (newsletterDescription) {
        const descElement = document.querySelector('.newsletter-description');
        if (descElement) {
            descElement.textContent = newsletterDescription.conteudo_atual;
        }
    }
    
    // Aplicar labels dos campos do formulário
    const labels = ['nome', 'email', 'time', 'perfil', 'captcha'];
    labels.forEach(label => {
        const labelData = dados.find(item => item.id === `newsletter_label_${label}`);
        if (labelData) {
            const labelElement = document.querySelector(`label[for="${label}"]`);
            if (labelElement) {
                labelElement.textContent = labelData.conteudo_atual;
            }
        }
    });
    
    // Aplicar texto do botão de submit
    const submitButton = dados.find(item => item.id === 'newsletter_submit');
    if (submitButton) {
        const buttonElement = document.querySelector('.btn-newsletter');
        if (buttonElement) {
            buttonElement.textContent = submitButton.conteudo_atual;
        }
    }
}

/**
 * Função para aplicar conteúdo do FAQ
 * @param {Array} dados - Array com todos os dados da planilha
 */
function aplicarConteudoFAQ(dados) {
    const faqTitle = dados.find(item => item.id === 'faq_title');
    if (faqTitle) {
        const titleElement = document.querySelector('.faq-section .section-title h2');
        if (titleElement) {
            titleElement.textContent = faqTitle.conteudo_atual;
        }
    }
    
    // Aplicar perguntas e respostas
    for (let i = 1; i <= 3; i++) {
        const pergunta = dados.find(item => item.id === `faq_question_${i}`);
        const resposta = dados.find(item => item.id === `faq_answer_${i}`);
        
        if (pergunta) {
            const perguntaElement = document.querySelector(`.faq-item:nth-child(${i}) .faq-question span`);
            if (perguntaElement) {
                perguntaElement.textContent = pergunta.conteudo_atual;
            }
        }
        
        if (resposta) {
            const respostaElement = document.querySelector(`.faq-item:nth-child(${i}) .faq-answer p`);
            if (respostaElement) {
                respostaElement.textContent = resposta.conteudo_atual;
            }
        }
    }
}

/**
 * Função principal para carregar e aplicar o conteúdo
 */
async function carregarConteudoDinamico() {
    try {
        console.log('🔄 Carregando conteúdo dinâmico...');
        
        // Fazer fetch dos dados
        const response = await fetch(GOOGLE_SHEETS_CONTEUDO_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const csvText = await response.text();
        const dados = parseCSVConteudo(csvText);
        
        // Aplicar conteúdo na página
        if (dados.length === 0) {
            console.warn('⚠️ Nenhum dado encontrado na planilha');
            return;
        }
        
        // Filtrar dados válidos
        const dadosValidos = dados.filter(item => item.id && item.conteudo_atual);
        
        if (dadosValidos.length === 0) {
            console.warn('⚠️ Nenhum dado válido encontrado');
            return;
        }
        
        // Aplicar conteúdo por seção
        aplicarConteudoPorSecao(dadosValidos);
        
        console.log(`✅ ${dadosValidos.length} itens de conteúdo carregados com sucesso!`);
        console.log('Dados carregados:', dadosValidos);
        
    } catch (error) {
        console.error('❌ Erro ao carregar conteúdo dinâmico:', error);
    }
}

/**
 * Função para recarregar o conteúdo
 */
function recarregarConteudo() {
    carregarConteudoDinamico();
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que outros scripts carregaram
    setTimeout(carregarConteudoDinamico, 500);
});

// Exportar funções para uso global
window.conteudoDinamico = {
    carregar: carregarConteudoDinamico,
    recarregar: recarregarConteudo
}; 