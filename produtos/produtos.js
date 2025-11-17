/**
 * Página de Produtos - Todos os Jogos do Flamengo
 * Sistema de filtros e exibição de cards
 */

// ===== VARIÁVEIS GLOBAIS =====
let todosOsJogos = [];
let jogosFiltrados = [];
let filtrosAtivos = {
    campeonato: '',
    estadio: '',
    apenasDisponiveis: false
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeProdutosPage();
});

/**
 * Inicializa a página de produtos
 */
async function initializeProdutosPage() {
    try {
        // Inicializar componentes
        initMobileMenu();
        initScrollToTop();
        initFiltros();
        
        // Carregar jogos
        await carregarTodosOsJogos();
        
    } catch (error) {
        mostrarEstadoErro();
    }
}

/**
 * Carrega todos os jogos usando o mesmo sistema do cardsJogos.js
 */
async function carregarTodosOsJogos() {
    try {
        mostrarLoading(true);
        
        // Usar a mesma URL do cardsJogos.js
        const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuz0diAWyMYDYYQjK0LMDC0pwzhTlrB9eT3aNtotZJkPgucV2QC646FR9KLD1t6xdhZsYkKXta0bIJ/pub?gid=713380388&single=true&output=csv';
        
        const response = await fetch(GOOGLE_SHEETS_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.status}`);
        }
        
        const csvText = await response.text();
        const jogos = parseCSV(csvText);
        
        // Filtrar jogos válidos
        todosOsJogos = jogos.filter(jogo => jogo.time1 && jogo.time2);
        
        // Inicializar filtros com dados
        popularFiltros();
        
        // Aplicar filtros iniciais
        aplicarFiltros();
        
    } catch (error) {
        mostrarEstadoErro();
    } finally {
        mostrarLoading(false);
    }
}

/**
 * Popula os selects de filtro com dados únicos
 */
function popularFiltros() {
    // Obter valores únicos
    const campeonatos = [...new Set(todosOsJogos.map(jogo => jogo.campeonato))].filter(Boolean).sort();
    const estadios = [...new Set(todosOsJogos.map(jogo => jogo.localsmall))].filter(Boolean).sort();
    
    // Popular select de campeonatos
    const selectCampeonato = document.getElementById('filtro-campeonato');
    selectCampeonato.innerHTML = '<option value="">Todos os campeonatos</option>';
    campeonatos.forEach(campeonato => {
        const option = document.createElement('option');
        option.value = campeonato;
        option.textContent = campeonato;
        selectCampeonato.appendChild(option);
    });
    
    // Popular select de estádios
    const selectEstadio = document.getElementById('filtro-estadio');
    selectEstadio.innerHTML = '<option value="">Todos os estádios</option>';
    estadios.forEach(estadio => {
        const option = document.createElement('option');
        option.value = estadio;
        option.textContent = estadio;
        selectEstadio.appendChild(option);
    });
}

/**
 * Inicializa os event listeners dos filtros
 */
function initFiltros() {
    const filtroCampeonato = document.getElementById('filtro-campeonato');
    const filtroEstadio = document.getElementById('filtro-estadio');
    const filtroDisponiveis = document.getElementById('filtro-disponiveis');
    const btnLimparFiltros = document.getElementById('limpar-filtros');
    
    // Event listeners
    filtroCampeonato.addEventListener('change', function() {
        filtrosAtivos.campeonato = this.value;
        this.classList.toggle('active', this.value !== '');
        aplicarFiltros();
    });
    
    filtroEstadio.addEventListener('change', function() {
        filtrosAtivos.estadio = this.value;
        this.classList.toggle('active', this.value !== '');
        aplicarFiltros();
    });
    
    filtroDisponiveis.addEventListener('change', function() {
        filtrosAtivos.apenasDisponiveis = this.checked;
        aplicarFiltros();
    });
    
    btnLimparFiltros.addEventListener('click', limparTodosFiltros);
}

/**
 * Aplica os filtros aos jogos
 */
function aplicarFiltros() {
    let jogos = [...todosOsJogos];
    
    // Filtro por campeonato
    if (filtrosAtivos.campeonato) {
        jogos = jogos.filter(jogo => jogo.campeonato === filtrosAtivos.campeonato);
    }
    
    // Filtro por estádio
    if (filtrosAtivos.estadio) {
        jogos = jogos.filter(jogo => jogo.localsmall === filtrosAtivos.estadio);
    }
    
    // Filtro por disponibilidade
    if (filtrosAtivos.apenasDisponiveis) {
        jogos = jogos.filter(jogo => jogo.textobtn !== "Em breve");
    }
    
    jogosFiltrados = jogos;
    renderizarJogos();
    atualizarContador();
}

/**
 * Renderiza os cards de jogos no grid
 */
function renderizarJogos() {
    const grid = document.getElementById('jogos-grid');
    const emptyState = document.getElementById('empty-state');
    const errorState = document.getElementById('error-state');
    
    // Esconder estados
    emptyState.style.display = 'none';
    errorState.style.display = 'none';
    
    // Limpar grid
    grid.innerHTML = '';
    
    if (jogosFiltrados.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    // Criar cards
    jogosFiltrados.forEach((jogo, index) => {
        const card = createCardJogo(jogo);
        // Adicionar delay na animação baseado no índice
        card.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(card);
    });
}

/**
 * Atualiza o contador de jogos
 */
function atualizarContador() {
    const totalJogos = document.getElementById('total-jogos');
    totalJogos.textContent = jogosFiltrados.length;
}

/**
 * Limpa todos os filtros
 */
function limparTodosFiltros() {
    // Reset valores
    document.getElementById('filtro-campeonato').value = '';
    document.getElementById('filtro-estadio').value = '';
    document.getElementById('filtro-disponiveis').checked = false;
    
    // Remove classes active
    document.getElementById('filtro-campeonato').classList.remove('active');
    document.getElementById('filtro-estadio').classList.remove('active');
    
    // Reset objeto filtros
    filtrosAtivos = {
        campeonato: '',
        estadio: '',
        apenasDisponiveis: false
    };
    
    // Aplicar filtros (sem filtros = todos os jogos)
    aplicarFiltros();
}

/**
 * Mostra/esconde o spinner de loading
 */
function mostrarLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    const contador = document.querySelector('.jogos-contador');
    
    if (show) {
        spinner.classList.add('active');
        contador.style.opacity = '0.5';
    } else {
        spinner.classList.remove('active');
        contador.style.opacity = '1';
    }
}

/**
 * Mostra estado de erro
 */
function mostrarEstadoErro() {
    const grid = document.getElementById('jogos-grid');
    const emptyState = document.getElementById('empty-state');
    const errorState = document.getElementById('error-state');
    
    grid.innerHTML = '';
    emptyState.style.display = 'none';
    errorState.style.display = 'block';
}

/**
 * Inicializa menu mobile (copiado do script principal)
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    let isMenuOpen = false;
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.add('open');
                menuToggle.classList.add('active');
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = `-${window.scrollY}px`;
            } else {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                
                if (document.body.style.position === 'fixed') {
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.width = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
        });
        
        // Fechar menu ao clicar em link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                isMenuOpen = false;
                
                if (document.body.style.position === 'fixed') {
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.width = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            });
        });
    }
}

/**
 * Inicializa botão voltar ao topo
 */
function initScrollToTop() {
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
}

// ===== FUNÇÕES UTILITÁRIAS REUTILIZADAS =====

/**
 * Função para converter CSV em array de objetos (do cardsJogos.js)
 */
function parseCSV(csvText) {
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
 * Função para obter logo do campeonato (do cardsJogos.js)
 */
function getLogoCampeonato(campeonato) {
    const logos = {
        'Brasileiro': 'https://libertadores.absolut-sport.com.br/images/logos-campeonatos/brasileiro.png',
        'CONMEBOL Libertadores': 'https://libertadores.absolut-sport.com.br/images/logos-campeonatos/libertadores.png',
        'Sulamericana': 'https://webapp404138.ip-50-116-48-60.cloudezapp.io/img/img.png',
        'Copa do Brasil': 'https://libertadores.absolut-sport.com.br/images/logos-campeonatos/CopaDoBrasil.png'
    };
    
    return logos[campeonato] || 'https://webapp404138.ip-50-116-48-60.cloudezapp.io/img/img.png';
}

/**
 * Função para criar um card de jogo (adaptada do cardsJogos.js)
 */
function createCardJogo(jogo) {
    const card = document.createElement('div');
    card.className = 'cardjogo';
    
    // Adicionar classe "embreve" se o texto do CTA for "Em breve"
    if (jogo.textobtn === "Em breve") {
        card.classList.add('embreve');
    }
    
    // Obter logo do campeonato
    const logoCampeonato = getLogoCampeonato(jogo.campeonato);
    
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
            <a class="btncardjogo" href="${jogo.link}" onclick="abrirDetalhesJogo('${jogo.time1}', '${jogo.time2}', '${jogo.datasmall}')">${jogo.textobtn}</a>
        </div>
    `;
    
    return card;
}

/**
 * Função para abrir detalhes do jogo (do cardsJogos.js)
 */
function abrirDetalhesJogo(time1, time2, data) {
    // Aqui você pode adicionar lógica para abrir modal, redirecionar, etc.
}

// ===== FUNÇÃO GLOBAL PARA BOTÃO DE LIMPAR FILTROS =====
window.limparTodosFiltros = limparTodosFiltros;

// ===== DEBUG / DESENVOLVIMENTO =====
if (typeof window !== 'undefined') {
    window.produtosDebug = {
        todosOsJogos: () => todosOsJogos,
        jogosFiltrados: () => jogosFiltrados,
        filtrosAtivos: () => filtrosAtivos,
        recarregar: () => window.location.reload()
    };
}
