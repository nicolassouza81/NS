const siteBase=new URL('./',document.currentScript.src);
const oldCases={'#case-adizero':'cases/adizero-racing/','#case-gran':'cases/gran-minha-conta/'};if(location.pathname===siteBase.pathname&&oldCases[location.hash])location.replace(new URL(oldCases[location.hash],siteBase));
document.documentElement.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// One accessible mobile navigation shared by every page.
const siteHeader=document.querySelector('body>header'),siteNav=siteHeader?.querySelector('nav');
if(siteNav){
  siteNav.id='site-navigation';
  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='nav-toggle';toggle.setAttribute('aria-controls',siteNav.id);toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');
  toggle.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
  siteHeader.append(toggle);
  function closeMenu(){siteNav.classList.remove('is-open');siteHeader.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';siteNav.classList.toggle('is-open',open);siteHeader.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
  siteNav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('click',event=>{if(!siteHeader.contains(event.target))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
  matchMedia('(max-width:600px)').addEventListener('change',closeMenu);
}
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
let ticking=false;const progress=document.querySelector('.progress'),orbit=document.querySelector('.orbit');function render(){const total=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform=`scaleX(${total>0?scrollY/total:0})`;if(orbit&&!reduce&&scrollY<1000)orbit.style.transform=`translateY(${scrollY*.08}px) rotate(${-28+scrollY*.018}deg)`;ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(render);ticking=true}},{passive:true});render();
document.querySelectorAll('[data-gran-theme]').forEach(button=>button.addEventListener('click',()=>{const theme=button.dataset.granTheme;const image=document.getElementById('gran-theme-image');if(!image)return;image.src=new URL(`assets/gran-${theme}.webp`,siteBase).href;image.alt=`Tela Minha Conta do Gran Cursos em tema ${theme==='dark'?'escuro':'claro'}`;image.height=theme==='dark'?1013:1121;document.querySelectorAll('[data-gran-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
document.getElementById('expand')?.addEventListener('click',e=>{const expanded=document.getElementById('project-window').classList.toggle('expanded');e.currentTarget.setAttribute('aria-expanded',expanded);e.currentTarget.textContent=expanded?'RECOLHER PROJETO −':'EXPANDIR PROJETO +'});
document.getElementById('contact-open')?.addEventListener('click',()=>{const panel=document.getElementById('contact-panel');panel.hidden=!panel.hidden;if(!panel.hidden)document.getElementById('message').focus()});document.getElementById('copy')?.addEventListener('click',async()=>{const message=document.getElementById('message');try{await navigator.clipboard.writeText(message.value);document.getElementById('copy-status').textContent='Mensagem copiada.'}catch{message.select();document.getElementById('copy-status').textContent='Selecione a mensagem e use copiar no seu dispositivo.'}});
// The home selection is capped by portfolio.js; the collection shows the full catalogue.
const finTabs=Array.from(document.querySelectorAll('[data-fin-view]'));
function showFinView(button){finTabs.forEach(tab=>{const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!selected;});}
finTabs.forEach((button,i)=>{button.addEventListener('click',()=>showFinView(button));button.addEventListener('keydown',e=>{let target;if(e.key==='ArrowRight')target=(i+1)%finTabs.length;if(e.key==='ArrowLeft')target=(i-1+finTabs.length)%finTabs.length;if(e.key==='Home')target=0;if(e.key==='End')target=finTabs.length-1;if(target!==undefined){e.preventDefault();showFinView(finTabs[target]);finTabs[target].focus();}});});
const fanCards=Array.from(document.querySelectorAll('.hero-project'));
const heroSelection=document.getElementById('hero-selected'),heroLink=document.querySelector('.hero-selected-link');let heroSelected=0,heroTurn=0;
function selectHeroProject(index,rotate=false){
  if(!fanCards.length)return;
  if(rotate)heroTurn+=index-heroSelected;
  heroSelected=(index+fanCards.length)%fanCards.length;
  fanCards.forEach((card,i)=>{
    card.classList.toggle('is-selected',i===heroSelected);
    if(i===heroSelected)card.setAttribute('aria-current','true');else card.removeAttribute('aria-current');
    const angle=(-90+(i-heroTurn)*360/fanCards.length)*Math.PI/180;
    card.style.setProperty('--orbit-x',Math.cos(angle).toFixed(5));
    card.style.setProperty('--orbit-y',Math.sin(angle).toFixed(5));
  });
  const selected=fanCards[heroSelected];
  if(heroSelection)heroSelection.textContent=`${String(heroSelected+1).padStart(2,'0')} / ${selected.dataset.project.toUpperCase()}`;
  if(heroLink){heroLink.href=selected.href;heroLink.setAttribute('aria-label',`Abrir case ${selected.dataset.project}`);}
}
document.querySelector('.hero-side-left')?.addEventListener('click',()=>selectHeroProject(heroSelected-1,true));
document.querySelector('.hero-side-right')?.addEventListener('click',()=>selectHeroProject(heroSelected+1,true));
fanCards.forEach((card,i)=>card.addEventListener('focus',()=>selectHeroProject(i)));
document.getElementById('hero-fan')?.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();selectHeroProject(heroSelected+(e.key==='ArrowRight'?1:-1),true);if(e.target!==e.currentTarget)fanCards[heroSelected].focus({preventScroll:true});}
  if(e.target===e.currentTarget&&e.key==='Enter'){e.preventDefault();heroLink?.click();}
});
selectHeroProject(0);
const connectionSection=document.querySelector('.connections');const connectionTiles=Array.from(document.querySelectorAll('.connection-tile'));let connectionTicking=false;
function moveConnections(){if(!connectionSection||reduce)return;const rect=connectionSection.getBoundingClientRect();const progress=Math.max(-1,Math.min(1,(innerHeight/2-(rect.top+rect.height/2))/innerHeight));connectionTiles.forEach((tile,i)=>tile.style.setProperty('--conn-y',`${progress*(i%2===0?24:-24)}px`));connectionTicking=false}
if(connectionSection&&!reduce){addEventListener('scroll',()=>{if(!connectionTicking){connectionTicking=true;requestAnimationFrame(moveConnections)}},{passive:true});moveConnections()}

// ===== Motion & polish layer =====
(()=>{
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;

// Smart header: solid after leaving the top, hides while scrolling down, returns on scroll up.
const header=document.querySelector('body>header');
if(header){let last=scrollY,busy=false;const update=()=>{const y=scrollY;header.classList.toggle('is-scrolled',y>40);header.classList.toggle('is-hidden',!reduce&&y>last+2&&y>500);if(y<last-2)header.classList.remove('is-hidden');last=y;busy=false};addEventListener('scroll',()=>{if(!busy){busy=true;requestAnimationFrame(update)}},{passive:true});update();header.addEventListener('focusin',()=>header.classList.remove('is-hidden'));}

// Split headings into masked words, keeping inline elements (em, span, br) intact.
function splitWords(el){let i=0;const walk=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const frag=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){frag.append(part);return}const w=document.createElement('span');w.className='w';const inner=document.createElement('span');inner.textContent=part;inner.style.setProperty('--i',i++);w.append(inner);frag.append(w)});n.replaceWith(frag)}else if(n.nodeType===1&&n.tagName!=='BR')walk(n)})};walk(el);el.classList.add('split')}

const headings=document.querySelectorAll('.work-index-intro h2,.connections h2,.about-content h2,.contact h2');
const revealSel='.work-index-intro .index-kicker,.index-intro-copy,.index-columns,.index-item,.index-bottom,.connections-head,.connections-icon,.connections-copy>p,.connections-link,.connections-foot,.about-label,.about-kicker,.about-identity,.about-content>p,.about-disciplines,.about-actions,.about-portrait,.about-footer,.contact .section-label,.contact>p,.contact-button';
if(!reduce&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll(revealSel).forEach(el=>{const sibs=[...el.parentElement.children].filter(c=>c.matches(revealSel));el.style.setProperty('--d',`${Math.min(sibs.indexOf(el),6)*90}ms`);el.classList.add('reveal');io.observe(el)});
  headings.forEach(h=>{splitWords(h);io.observe(h)});
}

if(!fine||reduce)return;

// Magnetic call-to-actions.
document.querySelectorAll('.connections-link,.about-primary,.about-contact,.contact-button,.hero-scroll-btn,.hero-dock-btn,.home-page nav a:last-child').forEach(el=>{el.classList.add('magnetic');el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.22}px ${(e.clientY-r.top-r.height/2)*.35}px`});el.addEventListener('pointerleave',()=>{el.style.translate=''})});

// Contextual cursor ring: shrinks over links, expands into "VER" over projects.
const ring=document.createElement('div');ring.className='cursor-ring';ring.setAttribute('aria-hidden','true');ring.innerHTML='<span>VER ↗</span>';document.body.append(ring);
let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty,running=false;
const loop=()=>{cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;ring.style.transform=`translate3d(${cx}px,${cy}px,0)`;if(Math.abs(tx-cx)+Math.abs(ty-cy)>.2)requestAnimationFrame(loop);else running=false};
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;ring.classList.add('on');if(!running){running=true;requestAnimationFrame(loop)}},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>ring.classList.remove('on'));
addEventListener('pointerdown',()=>ring.classList.add('is-down'));addEventListener('pointerup',()=>ring.classList.remove('is-down'));
const viewSel='.index-row,.connection-tile,.hero-project';
document.addEventListener('pointerover',e=>{const t=e.target.closest?.(`${viewSel},a,button,textarea`);ring.classList.toggle('is-view',!!t&&t.matches(viewSel));ring.classList.toggle('is-link',!!t&&!t.matches(viewSel))});

// Portrait tilt.
const portrait=document.querySelector('.about-portrait'),motion=portrait?.querySelector('.portrait-motion');
if(portrait&&motion){portrait.addEventListener('pointermove',e=>{const r=portrait.getBoundingClientRect();const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;motion.style.setProperty('--rx',`${(-py*7).toFixed(2)}deg`);motion.style.setProperty('--ry',`${(px*9).toFixed(2)}deg`)});portrait.addEventListener('pointerleave',()=>{motion.style.setProperty('--rx','0deg');motion.style.setProperty('--ry','0deg')})}

// Continuous scroll transforms for texts and headings
const heroH1=document.querySelector('.hero-name-area h1');
const heroOutline=document.querySelector('.hero-name-outline');
const heroStatement=document.querySelector('.hero-statement-wrap');
const heroNameArea=document.querySelector('.hero-name-area');
if(heroNameArea&&!reduce){
  heroNameArea.addEventListener('pointermove',e=>{
    const r=heroNameArea.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width-.5;
    heroH1?.style.setProperty('--glitch-c-x',`${(-3+px*14).toFixed(1)}px`);
    heroH1?.style.setProperty('--glitch-r-x',`${(3-px*14).toFixed(1)}px`);
  });
  heroNameArea.addEventListener('pointerleave',()=>{
    heroH1?.style.removeProperty('--glitch-c-x');
    heroH1?.style.removeProperty('--glitch-r-x');
  });
}
const textTransformItems=[
  {el:document.querySelector('.work-index-intro h2'),propX:'--heading-x',speedX:26},
  {el:document.querySelector('.connections h2'),propY:'--conn-h2-y',speedY:-22},
  {el:document.querySelector('.about-content h2'),propX:'--about-h2-x',speedX:-22},
  {el:document.querySelector('.contact h2'),propY:'--contact-h2-y',speedY:-18}
];

let textScrollBusy=false;
function updateTextScroll(){
  if(reduce)return;
  const y=window.scrollY;
  if(y<1100){
    if(heroH1){
      heroH1.style.setProperty('--hero-ty',`${(y*.16).toFixed(1)}px`);
      heroH1.style.setProperty('--hero-tx',`${(-y*.04).toFixed(1)}px`);
      const glitchSpread=Math.min(15,3+y*.018);
      const glitchJitter=(Math.sin(y*.09)*1.6).toFixed(1);
      heroH1.style.setProperty('--glitch-c-x',`${(-glitchSpread+parseFloat(glitchJitter)).toFixed(1)}px`);
      heroH1.style.setProperty('--glitch-r-x',`${(glitchSpread-parseFloat(glitchJitter)).toFixed(1)}px`);
      heroH1.style.setProperty('--glitch-c-y',`${(Math.cos(y*.07)*1.2).toFixed(1)}px`);
      heroH1.style.setProperty('--glitch-r-y',`${(-Math.cos(y*.07)*1.2).toFixed(1)}px`);
      heroH1.style.setProperty('--glitch-opacity',`${Math.min(.95,.7+y*.0003).toFixed(2)}`);
    }
    if(heroOutline){
      heroOutline.style.setProperty('--hero-otx',`${(y*.14).toFixed(1)}px`);
      heroOutline.style.setProperty('--hero-oty',`${(y*.07).toFixed(1)}px`);
    }
    if(heroStatement){
      heroStatement.style.setProperty('--statement-y',`${(y*.06).toFixed(1)}px`);
    }
  }
  const vh=window.innerHeight;
  textTransformItems.forEach(item=>{
    if(!item.el)return;
    const rect=item.el.getBoundingClientRect();
    if(rect.top<vh+100&&rect.bottom>-100){
      const progress=Math.max(-1,Math.min(1,((vh/2)-(rect.top+rect.height/2))/(vh/2)));
      if(item.propX)item.el.style.setProperty(item.propX,`${(progress*item.speedX).toFixed(1)}px`);
      if(item.propY)item.el.style.setProperty(item.propY,`${(progress*item.speedY).toFixed(1)}px`);
    }
  });
  textScrollBusy=false;
}

if(!reduce){
  addEventListener('scroll',()=>{
    if(!textScrollBusy){
      textScrollBusy=true;
      requestAnimationFrame(updateTextScroll);
    }
  },{passive:true});
  updateTextScroll();
}
})();
