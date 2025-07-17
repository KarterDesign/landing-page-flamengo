# Sistema de Conteúdo Dinâmico via Google Sheets

## 📋 Visão Geral

Este sistema permite que você edite todos os textos e imagens da landing page do Flamengo através de uma planilha do Google Sheets, sem precisar modificar o código HTML.

## 🚀 Como Configurar

### 1. Criar a Planilha no Google Sheets

1. **Acesse o Google Sheets** e crie uma nova planilha
2. **Importe o arquivo CSV** `modelo-planilha-textos.csv` ou cole os dados manualmente
3. **Configure a planilha** com as seguintes colunas:
   - `secao`: Seção da página (ex: header, hero, pacotes)
   - `elemento`: Tipo de elemento (ex: titulo, descricao, imagem)
   - `id`: Identificador único do elemento
   - `tipo`: Tipo de conteúdo (texto, imagem, video)
   - `conteudo_atual`: Conteúdo que será exibido na página
   - `observacoes`: Notas sobre o elemento

### 2. Publicar a Planilha

1. **Vá em "Arquivo" > "Compartilhar" > "Publicar na Web"**
2. **Selecione a aba** que contém os dados
3. **Escolha o formato "CSV"**
4. **Clique em "Publicar"**
5. **Copie o link gerado**

### 3. Configurar o JavaScript

1. **Abra o arquivo** `conteudoDinamico.js`
2. **Substitua a URL** na linha 8:
   ```javascript
   const GOOGLE_SHEETS_CONTEUDO_URL = 'SUA_URL_AQUI';
   ```
   **Por exemplo:**
   ```javascript
   const GOOGLE_SHEETS_CONTEUDO_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6ZLMHTQvb06ExDk8Q4fG65b3Q-6dvP8gfaxiW8kPzXos4gxCnE4W-ClL-ceHB5kEy2qU8BBUbi2WS/pub?gid=0&single=true&output=csv';
   ```

## 📝 Como Usar

### Editando Conteúdo

1. **Abra sua planilha** no Google Sheets
2. **Localize o elemento** que deseja editar pela coluna `id` ou `observacoes`
3. **Modifique o conteúdo** na coluna `conteudo_atual`
4. **Salve a planilha** (Ctrl+S ou Cmd+S)
5. **Aguarde alguns minutos** para que o Google atualize o CSV publicado
6. **Recarregue a página** para ver as mudanças

### Tipos de Conteúdo

#### 📝 Texto
- **Tipo:** `texto`
- **Exemplo:** Títulos, descrições, botões, links do menu
- **Formato:** Texto simples
- **Quebras de linha:** Use `\n` ou será automaticamente convertido

#### 🖼️ Imagem
- **Tipo:** `imagem`
- **Exemplo:** Logos, banners, fotos
- **Formato:** URL completa da imagem
- **Exemplo:** `img/logo.png` ou `https://exemplo.com/imagem.jpg`

#### 🎥 Vídeo
- **Tipo:** `video`
- **Exemplo:** Vídeo de fundo do hero
- **Formato:** URL do arquivo de vídeo
- **Exemplo:** `vid/video.mp4`

## 🗂️ Estrutura da Planilha

### Principais Seções

| Seção | Descrição | Elementos |
|-------|-----------|-----------|
| `header` | Cabeçalho da página | Logo, menu, texto do logo |
| `hero` | Banner principal | Título, subtítulo, botão CTA, vídeo |
| `pacotes` | Seção de pacotes | Títulos, imagens, tags dos pacotes |
| `newsletter` | Formulário de newsletter | Título, descrição, labels, botão |
| `faq` | Perguntas frequentes | Perguntas e respostas |
| `absolut_sport` | Seção da empresa | Título, descrição, imagem |

### Elementos Importantes

#### Header
- `header_logo_text`: Texto ao lado do logo
- `nav_link_1`, `nav_link_2`, `nav_link_3`: Links do menu

#### Hero
- `hero_title`: Título principal (efeito typewriter)
- `hero_subtitle`: Subtítulo
- `hero_cta`: Texto do botão principal
- `hero_video`: Vídeo de fundo

#### Pacotes
- `pacote_1_title`, `pacote_2_title`, `pacote_3_title`: Títulos dos pacotes
- `pacote_1_img`, `pacote_2_img`, `pacote_3_img`: Imagens dos pacotes
- `pacote_1_tag_1`: Tags dos pacotes

## 🔧 Funções Avançadas

### Recarregar Conteúdo
Para recarregar o conteúdo sem refresh da página:
```javascript
window.conteudoDinamico.recarregar();
```

### Debug
Para visualizar logs no console:
1. Abra o Developer Tools (F12)
2. Vá na aba "Console"
3. Recarregue a página
4. Veja os logs de carregamento

## ⚠️ Dicas Importantes

### ✅ Boas Práticas
- **Sempre teste** as mudanças em ambiente de desenvolvimento
- **Mantenha backup** da planilha original
- **Use URLs válidas** para imagens e vídeos
- **Evite caracteres especiais** em excesso nos textos

### ❌ Evite
- **Não delete** linhas da planilha sem saber o impacto
- **Não modifique** as colunas `id` e `tipo`
- **Não use** URLs muito longas
- **Não adicione** código HTML no conteúdo

### 🐛 Resolução de Problemas

#### Conteúdo não está aparecendo
1. Verifique se a planilha está publicada corretamente
2. Confirme se a URL no JavaScript está correta
3. Aguarde alguns minutos para propagação
4. Verifique o console para erros

#### Imagens não carregam
1. Confirme se a URL da imagem está correta
2. Verifique se o arquivo existe no servidor
3. Teste a URL diretamente no navegador

#### Formatação estranha
1. Verifique se não há caracteres especiais
2. Confirme se o tipo do elemento está correto
3. Use quebras de linha apropriadas

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs no console do navegador
2. Confirme se a planilha está acessível publicamente
3. Teste com dados de exemplo primeiro

---

**Criado para facilitar a gestão de conteúdo da Landing Page do Flamengo** 🔴⚫ 