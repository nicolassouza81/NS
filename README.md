# Nícolas Souza — Portfólio

Portfólio de design de alta performance com cases de UX/UI, produtos digitais, direção de arte e identidades visuais.
Desenvolvido em HTML5 semântico, Vanilla CSS e JavaScript moderno, sem dependências de build e totalmente otimizado para a **Hostinger** (Apache / LiteSpeed) e servidores locais (XAMPP / Python).

---

## 🚀 Executar Localmente

Você pode rodar o projeto localmente com qualquer servidor HTTP estático:

### Com Python
```bash
python -m http.server 8000
```
Acesse [http://localhost:8000](http://localhost:8000).

### Com Node.js
```bash
npx serve .
```

### Com XAMPP
Mantenha a pasta em `c:\xampp\htdocs\ns` e acesse [http://localhost/ns/](http://localhost/ns/).

---

## 🌐 Publicação na Hostinger

O projeto já inclui o arquivo `.htaccess` configurado especificamente para a infraestrutura da Hostinger (LiteSpeed / Apache).

### Como publicar na Hostinger:
1. Acesse o **hPanel da Hostinger** > **Gerenciador de Arquivos** (ou conecte via **FTP / FileZilla**).
2. Vá até a pasta pública do seu domínio: `public_html/`.
3. Envie todos os arquivos e pastas da raiz do projeto:
   - `.htaccess` *(certifique-se de ativar "Mostrar arquivos ocultos" no FileZilla/cPanel para enviar)*
   - `404.html`
   - `index.html`
   - `style.css` e `portfolio.css`
   - `app.js`, `portfolio.js`, `projects.js`
   - Pasta `assets/`
   - Pasta `cases/`
   - Pasta `projetos/`
4. **Não envie** a pasta `_backups/` nem pastas de backup antigas (elas são apenas cópias locais de segurança).

### Recursos automáticos ativos na Hostinger:
- **URLs Amigáveis**: `/projetos/` e `/cases/adizero-racing/` sem extensão `.html` visível.
- **Forçar HTTPS**: Redirecionamento 301 automático e canônico.
- **Compressão GZIP/Deflate**: Reduz em até 70% o tráfego de dados e acelera o Core Web Vitals (LCP/FID).
- **Cache de Navegador**: 1 ano para imagens (`webp`, `png`, `jpg`, `svg`), fontes e scripts; revalidação imediata para HTML.
- **Cabeçalhos de Segurança**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- **Página 404 Personalizada**: Qualquer rota inválida exibe `404.html` integrada à identidade visual do portfólio.

---

## 📂 Estrutura de Arquivos e Pastas

```text
ns/
├── .htaccess             # Regras Apache/LiteSpeed para Hostinger (URLs amigáveis, cache, compressão, HTTPS)
├── 404.html              # Página de erro 404 personalizada e responsiva
├── index.html            # Home page (órbita de destaques, listagem secundária, sobre e contato)
├── style.css             # Estilos gerais, tipografia, temas e componentes de cases
├── portfolio.css         # Estilos da órbita hero, catálogo completo e filtros
├── app.js                # Comportamentos globais, navegação mobile acessível, motion e glitch
├── portfolio.js          # Lógica do catálogo, órbita hero, filtros, busca e auto-wiring do Próximo Case
├── projects.js           # Catálogo compartilhado central de todos os projetos
├── novo-projeto.js       # Script CLI para criar um novo case em segundos
├── assets/               # Imagens otimizadas (webp/png/svg) dos projetos e identidade
├── cases/                # Páginas individuais dos cases
│   ├── _template/        # Modelo pronto com marcação, comentários e placeholders
│   ├── adizero-racing/   # /cases/adizero-racing/
│   ├── fala-fin/         # /cases/fala-fin/
│   ├── gran-minha-conta/ # /cases/gran-minha-conta/
│   ├── planeta-energia/  # /cases/planeta-energia/
│   ├── redburning/       # /cases/redburning/
│   ├── voce-tem-valor/   # /cases/voce-tem-valor/
│   ├── wecodes/          # /cases/wecodes/
│   └── zeca-acai/        # /cases/zeca-acai/
├── projetos/             # Catálogo completo com busca e filtros
│   └── index.html        # /projetos/
└── _backups/             # Cópias locais de segurança antigas (não publicar)
```

---

## ➕ Como Adicionar Novos Projetos

Adicionar um novo projeto é extremamente simples e automatizado:

### Método 1: Via Script Automático (Recomendado)

No terminal, execute:
```bash
node novo-projeto.js
```
Ou passe os parâmetros diretamente:
```bash
node novo-projeto.js meu-projeto "Meu Projeto" ux "Resumo rápido do projeto"
```

O script irá:
1. Criar a pasta `cases/<slug>/` e o arquivo `index.html` a partir do template modelo.
2. Substituir automaticamente o ID, nomes, slugs e títulos.
3. Exibir no terminal o snippet JSON exato para você colar em `projects.js`.

---

### Método 2: Manualmente

1. **Duplique o template**:
   Copie a pasta `cases/_template/` para `cases/nome-do-novo-projeto/`.
2. **Adicione as imagens**:
   Coloque as imagens em `assets/` (formato WebP recomendado, por exemplo `nome-hero.webp` em 1600x900).
3. **Cadastre em `projects.js`**:
   Abra `projects.js` e adicione o novo objeto no array `projects`:
   ```javascript
   {
     id: 'nome-do-novo-projeto',
     name: 'Nome do Projeto',
     title: ['NOME DO', 'PROJETO'],
     category: 'ux', // 'ux', 'branding' ou 'art'
     label: 'UX/UI · PRODUTO DIGITAL',
     tags: ['UX/UI', 'MOBILE', 'REDESIGN'],
     description: 'Descrição clara e concisa do case.',
     image: 'nome-hero.webp',
     imageAlt: 'Apresentação do projeto Nome do Projeto',
     width: 1600,
     height: 900,
     visual: 'nome-do-novo-projeto'
   }
   ```
4. **Destaque na Órbita (Opcional)**:
   Se desejar que o projeto apareça na órbita do início, adicione o `id` à lista `featured` no início de `projects.js`. Caso contrário, ele aparecerá automaticamente na seção inferior da home (até o limite de 5) e na página `/projetos/`.

### O que acontece automaticamente ao cadastrar um projeto?
- ✅ **Contador global (`sup data-project-total`)**: Atualiza automaticamente em todas as páginas (Home, Catálogo e Cases).
- ✅ **Filtros e contadores por categoria**: Atualizam na página `/projetos/`.
- ✅ **Navegação "Próximo Case"**: O `portfolio.js` detecta a ordem no `projects.js` e conecta automaticamente o case anterior ao novo projeto e o novo projeto ao seguinte, sem necessidade de editar manualmente os links HTML dos cases adjacentes.
