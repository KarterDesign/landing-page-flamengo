/**
 * Cards de Jogos Fora de Casa - Google Sheets Integration
 * Carrega dinamicamente as informações dos jogos fora de casa do Google Sheets
 */

// URL do Google Sheets CSV para jogos fora de casa
const GOOGLE_SHEETS_FORA_CASA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuz0diAWyMYDYYQjK0LMDC0pwzhTlrB9eT3aNtotZJkPgucV2QC646FR9KLD1t6xdhZsYkKXta0bIJ/pub?gid=1603119048&single=true&output=csv';

/**
 * Função para converter CSV em array de objetos (jogos fora de casa)
 * @param {string} csvText - Texto CSV
 * @returns {Array} Array de objetos com os dados
 */
function parseCSVForaCasa(csvText) {
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
 * Função para obter logo do campeonato baseado no nome (jogos fora de casa)
 * @param {string} campeonato - Nome do campeonato
 * @returns {string} URL da logo
 */
function getLogoCampeonatoForaCasa(campeonato) {
    const logos = {
        'Brasileiro': 'https://libertadores.absolut-sport.com.br/images/logos-campeonatos/brasileiro.png',
        'CONMEBOL Libertadores': 'https://libertadores.absolut-sport.com.br/images/logos-campeonatos/libertadores.png',
        'Sulamericana': 'https://webapp404138.ip-50-116-48-60.cloudezapp.io/img/img.png',
        'Copa do Brasil': 'https://libertadores.absolut-sport.com.br/images/logos-campeonatos/CopaDoBrasil.png'
    };
    
    return logos[campeonato] || 'https://webapp404138.ip-50-116-48-60.cloudezapp.io/img/img.png';
}

/**
 * Função para criar um card de jogo fora de casa
 * @param {Object} jogo - Dados do jogo
 * @returns {HTMLElement} Elemento HTML do card
 */
function createCardJogoForaCasa(jogo) {
    const card = document.createElement('div');
    card.className = 'cardjogo';
    
    // Obter logo do campeonato
    const logoCampeonato = getLogoCampeonatoForaCasa(jogo.campeonato);
    
    // Criar estrutura HTML usando as colunas exatas do CSV
    card.innerHTML = `
        <div class="grupo1">
            <div class="logocampeonato">
                <img src="${logoCampeonato}" alt="Logo ${jogo.campeonato}">
            </div>
            <div class="infos1cardjogo">
                <p>
                    <span id="datasmall">${jogo.datasmall}</span>
                    <br>
                    <span id="horariosmall">${jogo.horasmall}</span>
                    <br>
                    <span id="localsmall">${jogo.localsmall}</span>
                </p>
            </div>
        </div>
        <div class="grupo2">
            <div class="infos2cardjogo">
                <p>
                    <span id="databig">${jogo.databig}</span>
                    <br>
                    <span id="time1">${jogo.time1}</span>
                    <br>
                    <span id="time2">${jogo.time2}</span>
                </p>
            </div>
            <a class="btncardjogo" href="${jogo.link}" onclick="abrirDetalhesJogoForaCasa('${jogo.time1}', '${jogo.time2}', '${jogo.datasmall}')">${jogo.textobtn}</a>
        </div>
    `;
    
    return card;
}

/**
 * Função para abrir detalhes do jogo fora de casa
 * @param {string} time1 - Primeiro time
 * @param {string} time2 - Segundo time  
 * @param {string} data - Data do jogo
 */
function abrirDetalhesJogoForaCasa(time1, time2, data) {
    // Implementar ação do botão "Saiba Mais"
    console.log(`Detalhes do jogo fora de casa: ${time1} vs ${time2} em ${data}`);
    // Aqui você pode adicionar lógica para abrir modal, redirecionar, etc.
}

/**
 * Função principal para carregar e renderizar os cards de jogos fora de casa
 */
async function carregarCardsJogosForaCasa() {
    try {
        // Mostrar indicador de carregamento
        const slider = document.querySelector('#matches-slider-fora-casa');
        if (!slider) {
            console.error('Container #matches-slider-fora-casa não encontrado');
            return;
        }
        
        slider.innerHTML = '<div class="loading-cards">Carregando jogos fora de casa...</div>';
        
        // Fazer fetch dos dados
        const response = await fetch(GOOGLE_SHEETS_FORA_CASA_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const csvText = await response.text();
        const jogos = parseCSVForaCasa(csvText);
        
        // Limpar container
        slider.innerHTML = '';
        
        // Criar cards
        if (jogos.length === 0) {
            slider.innerHTML = '<div class="no-games">Nenhum jogo fora de casa encontrado</div>';
            return;
        }
        
        // Filtrar jogos válidos (que tenham pelo menos time1 e time2)
        const jogosValidos = jogos.filter(jogo => jogo.time1 && jogo.time2);
        
        if (jogosValidos.length === 0) {
            slider.innerHTML = '<div class="no-games">Nenhum jogo válido encontrado</div>';
            return;
        }
        
        jogosValidos.forEach(jogo => {
            const card = createCardJogoForaCasa(jogo);
            slider.appendChild(card);
        });
        
        console.log(`✅ ${jogosValidos.length} cards de jogos fora de casa carregados com sucesso!`);
        console.log('Dados carregados (fora de casa):', jogosValidos);
        
    } catch (error) {
        console.error('Erro ao carregar cards de jogos fora de casa:', error);
        const slider = document.querySelector('#matches-slider-fora-casa');
        if (slider) {
            slider.innerHTML = '<div class="error-cards">Erro ao carregar jogos fora de casa. Tente novamente mais tarde.</div>';
        }
    }
}

/**
 * Função para recarregar os cards de jogos fora de casa
 */
function recarregarCardsForaCasa() {
    carregarCardsJogosForaCasa();
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    carregarCardsJogosForaCasa();
});

// Exportar funções para uso global
window.cardsJogosForaCasa = {
    carregar: carregarCardsJogosForaCasa,
    recarregar: recarregarCardsForaCasa
}; 