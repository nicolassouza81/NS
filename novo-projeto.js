#!/usr/bin/env node

/**
 * ==============================================================================
 * GERADOR AUTOMÁTICO DE NOVOS PROJETOS — PORTFÓLIO NÍCOLAS SOUZA
 * ==============================================================================
 * Como usar:
 *   node novo-projeto.js <slug> "<Nome do Projeto>" [categoria]
 *
 * Exemplos:
 *   node novo-projeto.js novo-app "Novo Aplicativo" ux
 *   node novo-projeto.js marca-x "Marca X" branding
 *   node novo-projeto.js poster-art "Poster Art" art
 *
 * Se você rodar apenas:
 *   node novo-projeto.js
 * O script perguntará os dados interativamente no terminal.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = __dirname;
const CASES_DIR = path.join(ROOT_DIR, 'cases');
const TEMPLATE_FILE = path.join(CASES_DIR, '_template', 'index.html');
const PROJECTS_FILE = path.join(ROOT_DIR, 'projects.js');

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function prompt(question, defaultValue = '') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function main() {
  console.log('\n========================================================');
  console.log('   CRIAR NOVO PROJETO — PORTFÓLIO NÍCOLAS SOUZA');
  console.log('========================================================\n');

  let args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Uso: node novo-projeto.js <slug> "<Nome do Projeto>" [categoria] ["Breve descrição"]\n');
    console.log('Exemplos:');
    console.log('  node novo-projeto.js novo-app "Novo App" ux "Experiência mobile inovadora"');
    console.log('  node novo-projeto.js nova-marca "Nova Marca" branding');
    console.log('  node novo-projeto.js (modo interativo)\n');
    process.exit(0);
  }

  let id = args[0];
  let name = args[1];
  let category = args[2];
  let desc = args[3];

  if (!name) {
    name = await prompt('Nome do Projeto (ex: Studio Minimal): ');
    if (!name) {
      console.error('❌ Erro: O nome do projeto é obrigatório.');
      process.exit(1);
    }
  }

  if (!id) {
    const suggestedId = slugify(name);
    id = await prompt(`Identificador / Slug da pasta [${suggestedId}]: `, suggestedId);
  }
  id = slugify(id);

  if (!category) {
    console.log('\nCategorias disponíveis:');
    console.log('  1. ux       (UX/UI · Produtos Digitais · App Mobile)');
    console.log('  2. branding (Identidade Visual · Marcas)');
    console.log('  3. art      (Direção de Arte · Editorial · Conceito)');
    const catChoice = await prompt('Escolha a categoria [1-3 ou nome, padrão: 1]: ', '1');
    if (catChoice === '1' || catChoice.toLowerCase() === 'ux') category = 'ux';
    else if (catChoice === '2' || catChoice.toLowerCase() === 'branding') category = 'branding';
    else if (catChoice === '3' || catChoice.toLowerCase() === 'art') category = 'art';
    else category = 'ux';
  }

  if (!desc) {
    desc = await prompt('Breve descrição/resumo do projeto: ', 'Uma experiência visual focada em clareza, intenção e forma.');
  }

  const targetDir = path.join(CASES_DIR, id);
  const targetFile = path.join(targetDir, 'index.html');

  if (fs.existsSync(targetDir)) {
    console.error(`\n❌ A pasta cases/${id}/ já existe! Escolha outro slug ou remova a pasta existente.`);
    process.exit(1);
  }

  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`\n❌ Arquivo modelo não encontrado em: ${TEMPLATE_FILE}`);
    process.exit(1);
  }

  // 1. Cria a pasta do novo case
  fs.mkdirSync(targetDir, { recursive: true });

  // 2. Lê e processa o template
  let template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

  // Divide o nome do projeto em duas linhas para títulos visuais
  const nameParts = name.trim().split(' ');
  const title1 = nameParts[0].toUpperCase();
  const title2 = nameParts.slice(1).join(' ').toUpperCase() || 'DESIGN';

  const categoryLabels = {
    ux: 'UX/UI · PRODUTO DIGITAL',
    branding: 'BRANDING · IDENTIDADE VISUAL',
    art: 'DIREÇÃO DE ARTE · CONCEITO'
  };

  const replaced = template
    .replace(/\{\{ID\}\}/g, id)
    .replace(/\{\{NOME_DO_PROJETO\}\}/g, name)
    .replace(/\{\{RESUMO_DO_PROJETO\}\}/g, desc)
    .replace(/\{\{CATEGORIA_OU_DISCIPLINA\}\}/g, categoryLabels[category] || 'DESIGN & EXPERIÊNCIA')
    .replace(/\{\{TITULO_PRINCIPAL_LINHA_1\}\}/g, title1)
    .replace(/\{\{TITULO_PRINCIPAL_DESTAQUE\}\}/g, title2)
    .replace(/\{\{PARAGRAFO_DE_INTRODUCAO_E_OBJETIVO\}\}/g, desc)
    .replace(/\{\{NATUREZA_DO_PROJETO\}\}/g, 'Autoral / Comercial')
    .replace(/\{\{SEU_PAPEL\}\}/g, 'Design & Estratégia')
    .replace(/\{\{FOCO_DO_PROJETO\}\}/g, categoryLabels[category] || 'UX & Visual')
    .replace(/\{\{LINK_FIGMA\}\}/g, 'https://www.figma.com')
    .replace(/\{\{IMAGEM_HERO\}\}/g, `${id}-hero.webp`)
    .replace(/\{\{DESCRICAO_IMAGEM_HERO\}\}/g, `Apresentação do projeto ${name}`)
    .replace(/\{\{LEGENDA_IMAGEM_HERO\}\}/g, 'CONCEITO, FORMA E MOVIMENTO')
    .replace(/\{\{TITULO_DO_CONCEITO_1\}\}/g, 'Uma ideia.')
    .replace(/\{\{TITULO_DO_CONCEITO_2\}\}/g, 'Outra dimensão.')
    .replace(/\{\{TEXTO_DO_CONCEITO_PARAGRAFO_1\}\}/g, 'O projeto parte de um olhar atento sobre o problema para propor uma solução com propósito e forma.')
    .replace(/\{\{TEXTO_DO_CONCEITO_PARAGRAFO_2\}\}/g, 'Cada elemento visual foi desenhado para assegurar equilíbrio, clareza e forte presença institucional.')
    .replace(/\{\{TITULO_DIRECAO_VISUAL\}\}/g, 'Contraste que orienta a leitura.')
    .replace(/\{\{DESCRICAO_DIRECAO_VISUAL\}\}/g, 'A paleta combina profundidade, destaque e precisão tipográfica para sustentar a experiência.')
    .replace(/\{\{IMAGEM_DETALHE\}\}/g, `${id}-detalhe.webp`)
    .replace(/\{\{DESCRICAO_IMAGEM_DETALHE\}\}/g, `Detalhes de design do projeto ${name}`)
    .replace(/\{\{LEGENDA_IMAGEM_DETALHE\}\}/g, 'DETALHES E RITMO VISUAL')
    .replace(/\{\{TITULO_EXPERIENCIA_1\}\}/g, 'Uma visão.')
    .replace(/\{\{TITULO_EXPERIENCIA_2\}\}/g, 'Múltiplos pontos de contato.')
    .replace(/\{\{TEXTO_EXPERIENCIA_PARAGRAFO_1\}\}/g, 'Da arquitetura às microinterações, a interface foi projetada para que cada decisão tenha uma razão clara.')
    .replace(/\{\{TEXTO_EXPERIENCIA_PARAGRAFO_2\}\}/g, 'A navegação conduz o usuário de forma fluida e natural.')
    .replace(/\{\{IMAGEM_PROJETO_COMPLETO\}\}/g, `${id}-completo.webp`);

  fs.writeFileSync(targetFile, replaced, 'utf8');

  // 3. Monta o snippet para projects.js
  const projectSnippet = `    {id:'${id}', name:'${name}', title:['${title1}','${title2}'], category:'${category}', label:'${categoryLabels[category]}', tags:['${category.toUpperCase()}','DESIGN','PRODUTO'], description:'${desc}', image:'${id}-hero.webp', imageAlt:'Apresentação do projeto ${name}', width:1600, height:900, visual:'${id}'}`;

  console.log('\n========================================================');
  console.log('   ✅ PROJETO CRIADO COM SUCESSO!');
  console.log('========================================================\n');
  console.log(`📁 Página do case: cases/${id}/index.html`);
  console.log(`🔗 URL Amigável:  /cases/${id}/\n`);
  console.log('👉 PRÓXIMOS PASSOS:\n');
  console.log(`1. Adicione a imagem principal em assets/${id}-hero.webp (recomendado 1600x900 webp)`);
  console.log('2. Abra projects.js e adicione o snippet abaixo no array `projects`:\n');
  console.log(projectSnippet + ',\n');
  console.log('3. (Opcional) Se quiser destacar na órbita do início, adicione o ID na lista `featured` em projects.js:');
  console.log(`   featured: [..., '${id}']\n`);
  console.log('4. Abra cases/' + id + '/index.html no seu editor para personalizar os textos e seções.');
  console.log('\n========================================================\n');
}

main().catch(err => {
  console.error('Erro na execução:', err);
  process.exit(1);
});
