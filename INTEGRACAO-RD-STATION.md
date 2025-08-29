# Integração RD Station - Landing Page Flamengo

## Visão Geral
Este documento descreve a integração completa do formulário RD Station na landing page do Flamengo, garantindo que o formulário mantenha a identidade visual do projeto.

## Arquivos Modificados

### 1. `index.html`
**Mudanças principais:**
- Substituição do formulário HTML nativo por um container para o RD Station
- Adição da biblioteca JavaScript do RD Station
- Implementação de script robusto para aplicação de estilos personalizados

**Código do container:**
```html
<div role="main" id="lp_flamengo_2025-4f56e3c9837e4f3a08cf" class="rd-form-wrapper"></div>
```

**Script de integração:**
```javascript
// Criar o formulário do RD Station
new RDStationForms('lp_flamengo_2025-4f56e3c9837e4f3a08cf', 'UA-205113243-1').createForm();

// Função para aplicar estilos personalizados
function applyCustomStyles() {
    const rdForm = document.querySelector('#lp_flamengo_2025-4f56e3c9837e4f3a08cf');
    if (rdForm) {
        rdForm.classList.add('rd-form-loaded');
        
        // Forçar aplicação de estilos em todos os elementos
        const allElements = rdForm.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.fontFamily = 'Barlow, sans-serif !important';
            
            // Aplicar estilos específicos baseados no tipo de elemento
            if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
                element.style.border = '2px solid #e0e0e0 !important';
                element.style.borderRadius = '8px !important';
                element.style.padding = '12px 15px !important';
                element.style.fontSize = '1rem !important';
                element.style.backgroundColor = '#FFFFFF !important';
                element.style.color = '#333333 !important';
                element.style.transition = 'all 0.3s ease !important';
            }
            
            if (element.tagName === 'LABEL') {
                element.style.color = '#FFFFFF !important';
                element.style.fontWeight = '600 !important';
                element.style.fontSize = '0.9rem !important';
            }
            
            if (element.tagName === 'BUTTON' && element.type === 'submit') {
                element.style.background = 'linear-gradient(45deg, #B51210, #A00A28) !important';
                element.style.color = '#FFFFFF !important';
                element.style.border = 'none !important';
                element.style.borderRadius = '50px !important';
                element.style.fontWeight = '700 !important';
                element.style.textTransform = 'uppercase !important';
            }
        });
    }
}

// Aplicar estilos em múltiplos intervalos
setTimeout(applyCustomStyles, 500);
setTimeout(applyCustomStyles, 1000);
setTimeout(applyCustomStyles, 2000);
setTimeout(applyCustomStyles, 3000);

// Observar mudanças no DOM
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            setTimeout(applyCustomStyles, 100);
        }
    });
});
```

### 2. `rd-form-styles.css` (NOVO ARQUIVO)
Arquivo dedicado com estilos CSS agressivos para garantir a identidade visual.

**Características principais:**
- Uso de variáveis CSS do projeto (`--cor-vermelho-principal`, `--cor-branco`, etc.)
- Seletores altamente específicos com `!important`
- Cobertura completa de todos os tipos de elementos do RD Station
- Responsividade para mobile e tablet

**Seletores principais:**
```css
/* Reset completo e forçado */
#lp_flamengo_2025-4f56e3c9837e4f3a08cf,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf *,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf *::before,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf *::after {
  font-family: 'Barlow', sans-serif !important;
  box-sizing: border-box !important;
}

/* Campos de input com múltiplos seletores */
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input[type="text"],
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input[type="email"],
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input[type="tel"],
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input[type="number"],
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input[type="password"],
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input[type="url"],
#lp_flamengo_2025-4f56e3c9837e4f3a08cf select,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf textarea,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf input,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf .rd-form-input,
#lp_flamengo_2025-4f56e3c9837e4f3a08cf .form-input {
  /* Estilos idênticos ao formulário original */
}
```

## Estilos Aplicados

### Cores e Identidade Visual
- **Fonte:** Barlow, sans-serif (forçada em todos os elementos)
- **Cores principais:** Usando variáveis CSS do projeto
  - `--cor-vermelho-principal: #B51210`
  - `--cor-vermelho-escuro: #A00A28`
  - `--cor-branco: #FFFFFF`
  - `--cor-cinza-escuro: #333333`

### Campos de Input
- **Borda:** 2px solid #e0e0e0
- **Border-radius:** 8px
- **Padding:** 12px 15px
- **Background:** Branco
- **Cor do texto:** Cinza escuro
- **Focus:** Borda vermelha com sombra

### Labels
- **Cor:** Branco
- **Font-weight:** 600
- **Font-size:** 0.9rem
- **Display:** block

### Botão de Envio
- **Background:** Gradiente vermelho (45deg)
- **Cor:** Branco
- **Border-radius:** 50px
- **Font-weight:** 700
- **Text-transform:** uppercase
- **Efeito hover:** Gradiente invertido + transform + sombra
- **Efeito de brilho:** Animação CSS

### Responsividade
- **Tablet (≤768px):** Padding e font-size reduzidos
- **Mobile (≤576px):** Padding e font-size ainda menores

## Funcionalidades Implementadas

### 1. Aplicação Robusta de Estilos
- Múltiplos timeouts para garantir aplicação
- MutationObserver para detectar mudanças no DOM
- Aplicação de estilos inline via JavaScript como backup

### 2. Sobrescrita de Estilos Inline
```css
/* Sobrescrever qualquer estilo inline */
#lp_flamengo_2025-4f56e3c9837e4f3a08cf [style*="font-family"] {
  font-family: 'Barlow', sans-serif !important;
}

#lp_flamengo_2025-4f56e3c9837e4f3a08cf [style*="background"] {
  background: transparent !important;
}
```

### 3. Compatibilidade com Diferentes Classes do RD Station
- `.rd-form-input`
- `.form-input`
- `.rd-form-button`
- `.btn-submit`
- `.submit-button`
- `.rd-form-label`
- `.form-label`
- `.field-label`

## Configuração do RD Station

### ID do Formulário
- **ID:** `lp_flamengo_2025-4f56e3c9837e4f3a08cf`
- **UA Code:** `UA-205113243-1`

### Bibliotecas Incluídas
```html
<script type="text/javascript" src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js"></script>
```

## Troubleshooting

### Problemas Comuns
1. **Estilos não aplicados:** Verificar se o arquivo `rd-form-styles.css` está sendo carregado
2. **Fonte incorreta:** Verificar se a fonte Barlow está disponível
3. **Cores não aplicadas:** Verificar se as variáveis CSS estão definidas

### Debug
- Abrir console do navegador para ver mensagens de debug
- Verificar se a função `applyCustomStyles()` está sendo executada
- Inspecionar elementos para confirmar aplicação dos estilos

## Manutenção

### Atualizações
- Manter compatibilidade com novas versões do RD Station
- Testar em diferentes navegadores
- Verificar responsividade em novos dispositivos

### Monitoramento
- Verificar se os estilos continuam sendo aplicados após atualizações
- Monitorar performance do JavaScript
- Validar funcionamento do formulário

## Conclusão

A integração foi implementada com uma abordagem robusta e agressiva para garantir que o formulário do RD Station mantenha exatamente a mesma identidade visual do projeto original. A combinação de CSS específico, JavaScript de aplicação de estilos e múltiplos mecanismos de fallback garante que a experiência do usuário seja consistente em todos os cenários.
