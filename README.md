# Nícolas Souza — Portfólio

Portfólio estático de design, com projetos de UX/UI, produtos digitais e identidade visual. Desenvolvido em HTML, CSS e JavaScript, sem etapa de build.

## Executar localmente

Na pasta do projeto, inicie um servidor HTTP. Com Python instalado:

```sh
python -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000). Também é possível servir a pasta pelo Apache do XAMPP.

## Estrutura

- `index.html`: home, órbita com seis destaques e seleção de até cinco outros projetos.
- `projetos/index.html`: catálogo completo, com busca e filtros por disciplina.
- `cases/`: páginas dos oito projetos.
- `assets/`: imagens e materiais dos projetos.
- `projects.js`: catálogo compartilhado e configuração dos destaques.
- `portfolio.js`: montagem da órbita, seleção da home, busca e filtros.
- `app.js`: navegação e interações dos cases.
- `style.css` e `portfolio.css`: identidade visual e estilos responsivos.

## Projetos

Adizero Racing, Gran Cursos, Fala Fin, Redburning, Zeca Açaí, Wecodes, Você Tem Valor e Planeta Energia.

Para cadastrar um projeto, adicione sua página em `cases/<identificador>/index.html`, suas imagens em `assets/` e os dados em `projects.js`. A lista `featured` define os destaques da órbita; os demais projetos aparecem abaixo do hero, limitados a cinco e sem repetir os destaques.

## Hospedagem

Publique os arquivos estáticos em uma hospedagem HTTP. Os caminhos relativos permitem servir o site na raiz de um domínio ou em uma subpasta.

As pastas locais `.backup-*` são ignoradas pelo Git e não devem ser publicadas. O contato atual oferece uma mensagem para copiar; não envia mensagens automaticamente. As animações respeitam a preferência por movimento reduzido.
