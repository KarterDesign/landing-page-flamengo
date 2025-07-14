# Landing Page Flamengo

Esta é uma landing page desenvolvida para o Flamengo com design moderno e funcionalidades interativas.

## Funcionalidades Implementadas

### Hero Banner com Vídeo
- **Vídeo de fundo**: O hero banner agora executa vídeos em loop contínuo
- **Overlay transparente**: Camada preta transparente sobreposta ao vídeo para melhor legibilidade
- **Efeito máquina de escrever**: Título animado que alterna entre 3 frases:
  1. "AGÊNCIA OFICIAL DE VIAGENS E EXPERIÊNCIAS DO FLAMENGO"
  2. "AGÊNCIA OFICIAL DA NAÇÃO"
  3. "ABSOLUT SPORT - ISSO É VIVER"
- **Posicionamento**: Texto alinhado à esquerda e na parte inferior do banner
- **Tipografia**: Fonte Soulcraft em todos os textos do hero banner
- **Responsividade**: Layout adaptativo para todos os tamanhos de tela

### Elementos do Hero Banner
- **Título**: Com efeito máquina de escrever
- **Subtítulo**: "siga o flamengo e faça parte da historia"
- **CTA**: Botão "COMPRE AGORA" com efeitos hover

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS)
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- Fonte Soulcraft

## Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. O hero banner carregará automaticamente com o vídeo de fundo
3. O efeito máquina de escrever iniciará automaticamente
4. A página é totalmente responsiva e funcional

## Personalização

### Alterar Vídeos
Para alterar os vídeos do hero banner, edite o arquivo `index.html` na seção:
```html
<video class="hero-video" autoplay muted loop playsinline>
    <source src="SEU_VIDEO.mp4" type="video/mp4">
</video>
```

### Modificar Frases do Efeito Máquina de Escrever
Edite o arquivo `script.js` na função `initTypewriter()` no array `sentences`:
```javascript
const sentences = [
    "SUA PRIMEIRA FRASE",
    "SUA SEGUNDA FRASE",
    "SUA TERCEIRA FRASE"
];
```

### Ajustar Velocidade da Digitação
No arquivo `script.js`, modifique as constantes:
```javascript
const typingSpeed = 50;         // Velocidade da digitação (ms)
const deletingSpeed = 30;       // Velocidade da deleção (ms)
const pauseBetweenSentences = 2000; // Pausa entre frases (ms)
const pauseBeforeDeleting = 1500;   // Pausa antes de deletar (ms)
```

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis (responsivo)
- Suporte a vídeos HTML5

## Estrutura dos Arquivos

```
LP Fla/
├── index.html          # Página principal
├── style.css          # Estilos CSS
├── script.js          # Funcionalidades JavaScript
├── README.md          # Documentação
└── img/              # Imagens utilizadas
```

## Suporte

Para dúvidas ou problemas, verifique:
1. Se todos os arquivos estão no diretório correto
2. Se a conexão com a internet está funcionando (para carregar vídeos externos)
3. Se o navegador suporta vídeos HTML5

## Licença

Este projeto é propriedade do Flamengo e desenvolvido para fins educacionais. 