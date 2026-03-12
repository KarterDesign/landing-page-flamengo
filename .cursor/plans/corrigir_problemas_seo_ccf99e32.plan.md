---
name: Corrigir problemas SEO
overview: "Corrigir todos os problemas de SEO e performance identificados no relatorio de auditoria: criar robots.txt, sitemap.xml, adicionar canonical tags, favicon, structured data, .htaccess para Gzip, e ajustar meta descriptions."
todos:
  - id: robots-sitemap
    content: Criar robots.txt e sitemap.xml na raiz do projeto
    status: completed
  - id: htaccess
    content: Criar .htaccess com compressao Gzip e cache headers
    status: completed
  - id: canonical-favicon
    content: Adicionar canonical tag e favicon em todas as 3 paginas HTML
    status: completed
  - id: meta-desc
    content: Encurtar meta description do index.html para 100-130 chars
    status: completed
  - id: bootstrap-sync
    content: Voltar Bootstrap CSS para carregamento sincrono (fix mobile friendliness)
    status: completed
  - id: structured-data
    content: Adicionar Schema.org JSON-LD e Open Graph tags no index.html e produtos/index.html
    status: completed
isProject: false
---

# Correcao dos Problemas de SEO e Performance

O relatorio mostra 13 problemas. Aqui esta o que cada um significa e o que posso fazer:

## Problemas CRITICOS (bandeira vermelha)

### 1. Sitemap - Criar `sitemap.xml`

Nao existe `sitemap.xml`. Motores de busca usam isso para descobrir todas as paginas do site.

Criar [sitemap.xml](sitemap.xml) na raiz:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://flamengo.absolut-sport.com.br/</loc><priority>1.0</priority></url>
  <url><loc>https://flamengo.absolut-sport.com.br/faq/</loc><priority>0.7</priority></url>
  <url><loc>https://flamengo.absolut-sport.com.br/produtos/</loc><priority>0.8</priority></url>
</urlset>
```

### 2. Robots.txt - Criar `robots.txt`

Nao existe `robots.txt`. Bots nao sabem o que podem indexar.

Criar [robots.txt](robots.txt) na raiz:

```
User-agent: *
Allow: /
Sitemap: https://flamengo.absolut-sport.com.br/sitemap.xml
```

### 3. Canonical Tag - Adicionar em todas as paginas

Nenhuma pagina tem tag canonical. Isso pode causar problemas de conteudo duplicado.

Adicionar no `<head>` de cada pagina:

- [index.html](index.html): `<link rel="canonical" href="https://flamengo.absolut-sport.com.br/">`
- [faq/index.html](faq/index.html): `<link rel="canonical" href="https://flamengo.absolut-sport.com.br/faq/">`
- [produtos/index.html](produtos/index.html): `<link rel="canonical" href="https://flamengo.absolut-sport.com.br/produtos/">`

### 4. Favicon - Adicionar nas paginas que faltam

Somente `faq/index.html` tem favicon (e com path errado `img/` em vez de `../img/`). Falta em `index.html` e `produtos/index.html`.

Adicionar no `<head>` de todas as paginas:

```html
<link rel="icon" type="image/png" href="img/flamengo-absolut-sport-logo-oficial-parceria.png">
```

E corrigir o path no FAQ para `../img/...`.

### 5. Mobile Friendliness

O carregamento assincrono do Bootstrap CSS (`media="print"`) causa um flash sem estilo (FOUC) no mobile, fazendo o layout parecer "quebrado" momentaneamente. Isso pode ser interpretado como "nao mobile friendly".

Solucao: voltar o Bootstrap CSS para carregamento sincrono (ele e essencial para o layout), mantendo apenas Font Awesome como assincrono.

### 6. INP (Interaction to Next Paint)

Ja aplicamos `defer` nos scripts na otimizacao anterior. Para melhorar ainda mais, nao ha muito que fazer no codigo sem refatorar scripts de terceiros (GTM, RD Station).

### 7. Social Media - X (Twitter)

O footer nao tem link para perfil no X/Twitter. Se o Flamengo/ABSOLUT tem perfil no X, posso adicionar. Caso nao, este item pode ser ignorado.

---

## Problemas de AVISO (triangulo amarelo)

### 8. Meta Description - Encurtar para 100-130 caracteres

Atual em `index.html` (139 chars):

> "ABSOLUT Sport Brasil - Agencia credenciada ao Flamengo. Pacotes oficiais para jogos no Maracana com ingressos, transfer e suporte dedicado."

Proposta (128 chars):

> "Pacotes oficiais do Flamengo no Maracana. Ingressos, transfer e suporte dedicado. ABSOLUT Sport - agencia credenciada."

### 9. Structured Data - Adicionar Schema.org JSON-LD

Adicionar markup de Organization e WebSite no `<head>` do `index.html` para aparecer melhor nos resultados do Google:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ABSOLUT Sport Brasil",
  "url": "https://flamengo.absolut-sport.com.br",
  "logo": "https://flamengo.absolut-sport.com.br/img/flamengo-absolut-sport-logo-oficial-parceria.png"
}
```

### 10. Gzip/Brotli - Criar `.htaccess`

Criar [.htaccess](.htaccess) na raiz com compressao e cache headers. Isso resolve o problema de "Compress components with gzip" (nota F) do relatorio anterior tambem. So funciona se o servidor usar Apache; se for Nginx, precisa ser configurado no painel.

### 11. Hreflang

Nao necessario para site em um unico idioma (PT-BR). Pode ser ignorado.

### 12. CLS (Cumulative Layout Shift)

Ja adicionamos `width` e `height` nas imagens na otimizacao anterior. O CLS restante pode vir do carregamento assincrono de fontes/CSS.

---

## Resumo: o que vou fazer


| Acao                                       | Arquivos                                                 |
| ------------------------------------------ | -------------------------------------------------------- |
| Criar `robots.txt`                         | Novo arquivo                                             |
| Criar `sitemap.xml`                        | Novo arquivo                                             |
| Criar `.htaccess` (Gzip + cache)           | Novo arquivo                                             |
| Adicionar canonical tag                    | index.html, faq/index.html, produtos/index.html          |
| Adicionar favicon                          | index.html, produtos/index.html, corrigir faq/index.html |
| Encurtar meta description                  | index.html                                               |
| Voltar Bootstrap CSS sincrono (mobile fix) | index.html, faq/index.html, produtos/index.html          |
| Adicionar structured data JSON-LD          | index.html                                               |
| Adicionar Open Graph tags                  | index.html, produtos/index.html                          |


