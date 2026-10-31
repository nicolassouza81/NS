const siteBase=new URL('./',document.currentScript.src);
const oldCases={'#case-adizero':'cases/adizero-racing/','#case-gran':'cases/gran-minha-conta/'};if(location.pathname===siteBase.pathname&&oldCases[location.hash])location.replace(new URL(oldCases[location.hash],siteBase));
document.documentElement.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// One accessible mobile navigation shared by every page.
const siteHeader=document.querySelector('body>header'),siteNav=siteHeader?.querySelector('nav');
if(siteNav){
  siteNav.id='site-navigation';
  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='nav-toggle';toggle.setAttribute('aria-controls','mobile-navigation');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');toggle.dataset.i18nAttr='aria-label:nav.open_menu';
  toggle.innerHTML='<i class="hgi hgi-stroke hgi-menu-01" aria-hidden="true"></i>';
  siteHeader.append(toggle);
  const mobileMenu=document.createElement('dialog');
  mobileMenu.id='mobile-navigation';mobileMenu.className='mobile-menu';mobileMenu.setAttribute('aria-labelledby','mobile-menu-title');
  mobileMenu.innerHTML='<h2 class="sr-only" id="mobile-menu-title" data-i18n="nav.menu_label">Menu principal</h2><div class="mobile-menu-top"></div>';
  const menuTop=mobileMenu.querySelector('.mobile-menu-top');
  const menuBrand=siteHeader.querySelector('.brand')?.cloneNode(true);
  if(menuBrand)menuTop.append(menuBrand);
  const closeButton=document.createElement('button');
  closeButton.type='button';closeButton.className='mobile-menu-close';closeButton.setAttribute('aria-label','Fechar menu');closeButton.dataset.i18nAttr='aria-label:nav.close_menu';
  closeButton.innerHTML='<i class="hgi hgi-stroke hgi-cancel-01" aria-hidden="true"></i>';
  menuTop.append(closeButton);
  document.body.append(mobileMenu);
  let languageControl=null,languageNext=null;
  function closeMenu(){if(mobileMenu.open)mobileMenu.close();}
  function openMenu(){
    if(!matchMedia('(max-width:600px)').matches||mobileMenu.open)return;
    languageControl=siteNav.querySelector('.lang-selector');
    languageNext=languageControl?.nextSibling||null;
    if(languageControl)siteNav.append(languageControl);
    mobileMenu.append(siteNav);
    document.documentElement.classList.add('mobile-menu-open');
    toggle.setAttribute('aria-expanded','true');
    mobileMenu.showModal();
    siteNav.querySelector('a')?.focus({preventScroll:true});
  }
  mobileMenu.addEventListener('close',()=>{
    if(languageControl)siteNav.insertBefore(languageControl,languageNext?.parentNode===siteNav?languageNext:null);
    siteHeader.insertBefore(siteNav,toggle);
    document.documentElement.classList.remove('mobile-menu-open');
    toggle.setAttribute('aria-expanded','false');
    document.dispatchEvent(new CustomEvent('ns:navigation-close'));
  });
  toggle.addEventListener('click',openMenu);
  closeButton.addEventListener('click',closeMenu);
  mobileMenu.addEventListener('cancel',event=>{event.preventDefault();closeMenu();});
  mobileMenu.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const controls=Array.from(mobileMenu.querySelectorAll('a[href],button:not([disabled])')).filter(el=>el.tabIndex>=0&&el.getClientRects().length);
    const first=controls[0],last=controls[controls.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus({preventScroll:true});}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus({preventScroll:true});}
  });
  mobileMenu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  matchMedia('(max-width:600px)').addEventListener('change',closeMenu);
}
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
let ticking=false;const progress=document.querySelector('.progress'),orbit=document.querySelector('.orbit');function render(){const total=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform=`scaleX(${total>0?scrollY/total:0})`;if(orbit&&!reduce&&scrollY<1000)orbit.style.transform=`translateY(${scrollY*.08}px) rotate(${-28+scrollY*.018}deg)`;ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(render);ticking=true}},{passive:true});render();
document.querySelectorAll('[data-gran-theme]').forEach(button=>button.addEventListener('click',()=>{const theme=button.dataset.granTheme;const image=document.getElementById('gran-theme-image');if(!image)return;image.src=new URL(`assets/gran-${theme}.webp`,siteBase).href;image.alt=`Tela Minha Conta do Gran Cursos em tema ${theme==='dark'?'escuro':'claro'}`;image.height=theme==='dark'?1013:1121;document.querySelectorAll('[data-gran-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
document.getElementById('expand')?.addEventListener('click',e=>{const expanded=document.getElementById('project-window').classList.toggle('expanded');e.currentTarget.setAttribute('aria-expanded',expanded);e.currentTarget.innerHTML=expanded?'RECOLHER PROJETO <i class="hgi hgi-stroke hgi-remove-01" aria-hidden="true"></i>':'EXPANDIR PROJETO <i class="hgi hgi-stroke hgi-add-01" aria-hidden="true"></i>'});
document.getElementById('contact-open')?.addEventListener('click',()=>{const panel=document.getElementById('contact-panel');panel.hidden=!panel.hidden;if(!panel.hidden)document.getElementById('message').focus()});document.getElementById('copy')?.addEventListener('click',async()=>{const message=document.getElementById('message');try{await navigator.clipboard.writeText(message.value);document.getElementById('copy-status').textContent='Mensagem copiada.'}catch{message.select();document.getElementById('copy-status').textContent='Selecione a mensagem e use copiar no seu dispositivo.'}});
// The home selection is capped by portfolio.js; the collection shows the full catalogue.
const finTabs=Array.from(document.querySelectorAll('[data-fin-view]'));
function showFinView(button){finTabs.forEach(tab=>{const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!selected;});}
finTabs.forEach((button,i)=>{button.addEventListener('click',()=>showFinView(button));button.addEventListener('keydown',e=>{let target;if(e.key==='ArrowRight')target=(i+1)%finTabs.length;if(e.key==='ArrowLeft')target=(i-1+finTabs.length)%finTabs.length;if(e.key==='Home')target=0;if(e.key==='End')target=finTabs.length-1;if(target!==undefined){e.preventDefault();showFinView(finTabs[target]);finTabs[target].focus();}});});
let fanCards=Array.from(document.querySelectorAll('.hero-project'));
const heroFan=document.getElementById('hero-fan'),heroMobile=matchMedia('(max-width:760px)');
const heroSelection=document.getElementById('hero-selected'),heroLink=document.querySelector('.hero-selected-link');let heroSelected=0,heroTurn=0;
const ovalArcTable=(()=>{const steps=360,rx=1.84,cum=[0];for(let k=1;k<=steps;k++){const a=(-90+(k-.5)*360/steps)*Math.PI/180;cum[k]=cum[k-1]+Math.hypot(rx*Math.sin(a),Math.cos(a));}const total=cum[steps];return u=>{const target=((u%1)+1)%1*total;let lo=0,hi=steps;while(lo<hi){const mid=(lo+hi)>>1;if(cum[mid]<target)lo=mid+1;else hi=mid;}const i=Math.max(1,lo),frac=(target-cum[i-1])/(cum[i]-cum[i-1]||1);return(-90+(i-1+frac)*360/steps)*Math.PI/180;};})();
function selectHeroProject(index,rotate=false){
  if(!fanCards.length)return;
  if(rotate){heroTurn+=index-heroSelected;document.querySelector('.hero-stage')?.classList.add('is-bloomed','bloom-complete');}
  heroSelected=(index+fanCards.length)%fanCards.length;
  const moveFocus=heroMobile.matches&&fanCards.includes(document.activeElement)&&document.activeElement!==fanCards[heroSelected];
  if(moveFocus)heroFan.focus({preventScroll:true});
  fanCards.forEach((card,i)=>{
    const selected=i===heroSelected;
    card.classList.toggle('is-selected',selected);
    if(selected)card.setAttribute('aria-current','true');else card.removeAttribute('aria-current');
    let slot=(i-heroSelected+fanCards.length)%fanCards.length;
    if(slot>fanCards.length/2)slot-=fanCards.length;
    card.style.setProperty('--mobile-slot',Math.max(-2,Math.min(2,slot)));
    card.style.setProperty('--mobile-distance',Math.min(2,Math.abs(slot)));
    card.classList.toggle('is-neighbor',Math.abs(slot)===1);
    card.tabIndex=heroMobile.matches&&!selected?-1:0;
    if(heroMobile.matches&&!selected)card.setAttribute('aria-hidden','true');else card.removeAttribute('aria-hidden');
    card.draggable=false;
    const img=card.querySelector('img');if(img)img.draggable=false;
    const angle=ovalArcTable((i-heroTurn)/fanCards.length),ox=Math.cos(angle),oy=Math.sin(angle),focus=(1-oy)/2,tilt=(ox*5.5+(i%2?3.2:-3.2))*(.35+(1-focus)*.65);
    card.style.setProperty('--orbit-x',Math.cos(angle).toFixed(5));
    card.style.setProperty('--orbit-y',oy.toFixed(5));card.style.setProperty('--card-tilt',`${tilt.toFixed(1)}deg`);card.style.setProperty('--card-scale',(.90+focus*.13).toFixed(3));card.style.setProperty('--step-delay',`${Math.round((1-focus)*85)}ms`);
  });
  const selected=fanCards[heroSelected];
  if(moveFocus)selected.focus({preventScroll:true});
  if(heroSelection){
    heroSelection.replaceChildren();
    const count=document.createElement('span'),name=document.createElement('span');
    count.className='hero-selected-count';count.textContent=`${String(heroSelected+1).padStart(2,'0')} / ${String(fanCards.length).padStart(2,'0')}`;
    name.className='hero-selected-name';name.textContent=selected.dataset.project.toUpperCase();
    heroSelection.append(count,' ',name);
  }
  if(heroLink){heroLink.href=selected.href;heroLink.setAttribute('aria-label',selected.getAttribute('aria-label'));}
}
document.querySelector('.hero-side-left')?.addEventListener('click',()=>selectHeroProject(heroSelected-1,true));
document.querySelector('.hero-side-right')?.addEventListener('click',()=>selectHeroProject(heroSelected+1,true));
(()=>{
  const heroFanEl=document.getElementById('hero-fan');
  if(!heroFanEl||reduce||!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  let hoverDir=0,hoverDelay=null,hoverLoop=null;
  const stopHoverAdvance=()=>{hoverDir=0;clearTimeout(hoverDelay);clearInterval(hoverLoop);hoverDelay=hoverLoop=null;};
  document.querySelector('.hero-side-left')?.addEventListener('click',stopHoverAdvance);
  document.querySelector('.hero-side-right')?.addEventListener('click',stopHoverAdvance);
  const areAllCardsVisible=()=>{
    if(!fanCards.length)return true;
    const vh=window.innerHeight,vw=window.innerWidth;
    const headerEl=document.querySelector('body>header');
    const topLimit=headerEl&&!headerEl.classList.contains('is-hidden')?Math.max(0,headerEl.getBoundingClientRect().bottom):0;
    return fanCards.every(card=>{
      const r=card.getBoundingClientRect(),pad=card.matches(':hover')?16:2;
      return r.top>=topLimit-pad&&r.bottom<=vh+pad&&r.left>=-pad&&r.right<=vw+pad;
    });
  };
  const startHoverAdvance=dir=>{
    if(areAllCardsVisible()){stopHoverAdvance();return;}
    if(dir===hoverDir)return;
    stopHoverAdvance();
    hoverDir=dir;
    if(!dir)return;
    hoverDelay=setTimeout(()=>{
      if(areAllCardsVisible()){stopHoverAdvance();return;}
      selectHeroProject(heroSelected+hoverDir,true);
      hoverLoop=setInterval(()=>{
        if(areAllCardsVisible()){stopHoverAdvance();return;}
        selectHeroProject(heroSelected+hoverDir,true);
      },1150);
    },320);
  };
  heroFanEl.addEventListener('pointermove',e=>{
    if(heroMobile.matches){stopHoverAdvance();return;}
    if(!e.target.closest('.hero-project')||areAllCardsVisible()){stopHoverAdvance();return;}
    const r=heroFanEl.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),zone=r.width*.12;
    startHoverAdvance(dx>zone?1:dx<-zone?-1:0);
  });
  heroFanEl.addEventListener('pointerleave',stopHoverAdvance);
  addEventListener('scroll',()=>{if(hoverDir&&areAllCardsVisible())stopHoverAdvance();},{passive:true});
  addEventListener('resize',()=>{if(heroMobile.matches||(hoverDir&&areAllCardsVisible()))stopHoverAdvance();},{passive:true});
})();
heroFan?.addEventListener('focusin',e=>{
  const i=fanCards.indexOf(e.target.closest('.hero-project'));
  if(i>=0&&i!==heroSelected&&!heroMobile.matches)selectHeroProject(i);
});
heroFan?.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();selectHeroProject(heroSelected+(e.key==='ArrowRight'?1:-1),true);if(e.target!==e.currentTarget)fanCards[heroSelected].focus({preventScroll:true});}
  if(e.target===e.currentTarget&&e.key==='Enter'){e.preventDefault();heroLink?.click();}
});
// Keep native vertical scrolling and pinch zoom; only a deliberate horizontal drag changes projects.
if(heroFan){
  let gesture=null,suppressClickUntil=0;
  const clearDrag=()=>{heroFan.style.removeProperty('--drag-x');heroFan.classList.remove('is-dragging');gesture=null;};
  heroFan.addEventListener('pointerdown',e=>{
    if(!heroMobile.matches||!e.isPrimary||e.button!==0)return;
    gesture={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,dragging:false};
  });
  heroFan.addEventListener('pointermove',e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
    if(!gesture.dragging){
      if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){clearDrag();return;}
      if(Math.abs(dx)<12||Math.abs(dx)<Math.abs(dy)*1.3)return;
      gesture.dragging=true;heroFan.setPointerCapture(e.pointerId);heroFan.classList.add('is-dragging');
    }
    gesture.dx=dx;
    heroFan.style.setProperty('--drag-x',`${Math.max(-90,Math.min(90,dx*.55))}px`);
  });
  heroFan.addEventListener('pointerup',e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    const {dx,dragging}=gesture;
    if(dragging)suppressClickUntil=performance.now()+400;
    clearDrag();
    if(dragging&&Math.abs(dx)>=45)selectHeroProject(heroSelected+(dx<0?1:-1),true);
  });
  heroFan.addEventListener('pointercancel',clearDrag);
  heroFan.addEventListener('lostpointercapture',clearDrag);
  heroFan.addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopPropagation();}},true);
  heroFan.addEventListener('click',e=>{
    if(e.defaultPrevented||!heroMobile.matches)return;
    const i=fanCards.indexOf(e.target.closest('.hero-project'));
    if(i>=0&&i!==heroSelected){e.preventDefault();selectHeroProject(i,true);}
  });
  heroMobile.addEventListener('change',()=>{clearDrag();selectHeroProject(heroSelected);});
  window.addEventListener('ns:hero-rendered',()=>{
    fanCards=Array.from(heroFan.querySelectorAll('.hero-project'));
    selectHeroProject(heroSelected);
  });
}
selectHeroProject(0);
const heroStage = document.querySelector('.hero-stage');
if (heroStage) {
  if (reduce) {
    heroStage.classList.add('is-bloomed', 'bloom-complete');
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          heroStage.classList.add('is-bloomed');
          setTimeout(() => {
            heroStage.classList.add('bloom-complete');
          }, 1750);
        }, 220);
      });
    });
  }
}
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
document.querySelectorAll('.connections-link,.about-primary,.about-contact,.contact-button,.hero-scroll-btn,.home-page nav a:last-child').forEach(el=>{el.classList.add('magnetic');el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.22}px ${(e.clientY-r.top-r.height/2)*.35}px`});el.addEventListener('pointerleave',()=>{el.style.translate=''})});

// Contextual cursor ring & chromatic glitch trail (desktop fine pointer).
const ring=document.createElement('div');ring.className='cursor-ring';ring.setAttribute('aria-hidden','true');ring.innerHTML='<span>VER <i class="hgi hgi-stroke hgi-arrow-up-right-01" aria-hidden="true"></i></span>';document.body.append(ring);

const canvas=document.createElement('canvas');canvas.className='cursor-glitch-canvas';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
const ctx=canvas.getContext('2d');
let dpr=window.devicePixelRatio||1;
const resizeCanvas=()=>{dpr=window.devicePixelRatio||1;canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
resizeCanvas();addEventListener('resize',resizeCanvas,{passive:true});

let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty,lastX=tx,lastY=ty,running=false;
const trailPoints=[];
const glitchSlices=[];
const C_CYAN='rgba(0,199,209,', C_RED='rgba(232,75,60,', C_INK='rgba(28,33,28,', C_LIME='rgba(219,255,115,';

const spawnGlitch=(x,y,vx,vy,spd)=>{
  const intensity=Math.min(spd,45);
  const count=spd>16?2:1;
  for(let i=0;i<count;i++){
    const isCyan=Math.random()<0.52;
    glitchSlices.push({
      x:x+(Math.random()-.5)*(12+intensity*.4),
      y:y+(Math.random()-.5)*(8+intensity*.3),
      w:8+Math.random()*(14+intensity*.7),
      h:1.5+Math.random()*2,
      color:isCyan?C_CYAN:C_RED,
      shiftX:(isCyan?-1:1)*(2+Math.random()*4),
      life:1,
      decay:0.07+Math.random()*0.06
    });
  }
  if(Math.random()<0.3){
    glitchSlices.push({
      x:x+(Math.random()-.5)*18,
      y:y+(Math.random()-.5)*18,
      w:3+Math.random()*3,
      h:3+Math.random()*3,
      color:Math.random()<0.3?C_LIME:(Math.random()<0.5?C_CYAN:C_RED),
      shiftX:(Math.random()-.5)*5,
      life:1,
      decay:0.09+Math.random()*0.05
    });
  }
};

const spawnClickBurst=(x,y)=>{
  for(let i=0;i<10;i++){
    const angle=(Math.PI*2*i)/10+(Math.random()-.5)*.3;
    const dist=6+Math.random()*22;
    const isCyan=i%2===0;
    glitchSlices.push({
      x:x+Math.cos(angle)*dist,
      y:y+Math.sin(angle)*dist,
      w:5+Math.random()*15,
      h:1.8+Math.random()*2,
      color:isCyan?C_CYAN:C_RED,
      shiftX:(isCyan?-3:3),
      life:1,
      decay:0.06+Math.random()*0.04
    });
  }
};

const loop=()=>{
  cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;
  ring.style.transform=`translate3d(${cx}px,${cy}px,0)`;

  const dx=tx-cx,dy=ty-cy,curSpeed=Math.hypot(dx,dy);
  if(curSpeed>2.5){
    const gx=Math.min(7,Math.max(-7,dx*.22)).toFixed(1);
    const gy=Math.min(4,Math.max(-4,dy*.15)).toFixed(1);
    ring.style.setProperty('--ring-glitch-c-x',`${-gx}px`);
    ring.style.setProperty('--ring-glitch-c-y',`${-gy}px`);
    ring.style.setProperty('--ring-glitch-r-x',`${gx}px`);
    ring.style.setProperty('--ring-glitch-r-y',`${gy}px`);
    ring.classList.add('is-glitching');
  }else{
    ring.classList.remove('is-glitching');
  }

  ctx.clearRect(0,0,innerWidth,innerHeight);

  for(let i=trailPoints.length-1;i>=0;i--){
    const p=trailPoints[i];p.age++;
    if(p.age>=p.maxAge)trailPoints.splice(i,1);
  }

  if(trailPoints.length>2){
    // Cyan chromatic trail
    ctx.beginPath();
    for(let i=0;i<trailPoints.length;i++){
      const p=trailPoints[i];
      const ox=p.x-(p.vx*.16)-2,oy=p.y-1;
      if(i===0)ctx.moveTo(ox,oy);else ctx.lineTo(ox,oy);
    }
    ctx.strokeStyle=C_CYAN+'0.45)';ctx.lineWidth=1.8;ctx.stroke();

    // Red chromatic trail
    ctx.beginPath();
    for(let i=0;i<trailPoints.length;i++){
      const p=trailPoints[i];
      const ox=p.x+(p.vx*.16)+2,oy=p.y+1;
      if(i===0)ctx.moveTo(ox,oy);else ctx.lineTo(ox,oy);
    }
    ctx.strokeStyle=C_RED+'0.45)';ctx.lineWidth=1.8;ctx.stroke();

    // Central ink trail
    ctx.beginPath();
    for(let i=0;i<trailPoints.length;i++){
      const p=trailPoints[i];
      if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
    }
    ctx.strokeStyle=C_INK+'0.25)';ctx.lineWidth=1.2;ctx.stroke();

    // Echo micro dots
    for(let i=0;i<trailPoints.length;i+=2){
      const p=trailPoints[i];
      const prog=1-(p.age/p.maxAge);
      ctx.fillStyle=C_INK+(0.35*prog).toFixed(2)+')';
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.5,2.2*prog),0,Math.PI*2);ctx.fill();
    }
  }

  // Draw glitch tearing slices
  for(let i=glitchSlices.length-1;i>=0;i--){
    const s=glitchSlices[i];
    s.life-=s.decay;
    if(s.life<=0){glitchSlices.splice(i,1);continue}
    ctx.fillStyle=s.color+(s.life*.85).toFixed(2)+')';
    ctx.fillRect(s.x+s.shiftX*(1-s.life*.5),s.y,s.w,s.h);
  }

  const ringDist=Math.abs(tx-cx)+Math.abs(ty-cy);
  if(ringDist>.15||trailPoints.length>0||glitchSlices.length>0){
    requestAnimationFrame(loop);
  }else{
    ctx.clearRect(0,0,innerWidth,innerHeight);
    running=false;
  }
};

addEventListener('pointermove',e=>{
  if(document.querySelector('dialog.case-lightbox[open]')){ring.classList.remove('on');return;}
  const dx=e.clientX-lastX,dy=e.clientY-lastY,dist=Math.hypot(dx,dy);
  tx=e.clientX;ty=e.clientY;
  ring.classList.add('on');
  if(dist>1.5){
    trailPoints.push({x:e.clientX,y:e.clientY,vx:dx,vy:dy,age:0,maxAge:Math.min(26,14+Math.round(dist*.35))});
    if(trailPoints.length>22)trailPoints.shift();
    if(dist>5)spawnGlitch(e.clientX,e.clientY,dx,dy,dist);
  }
  lastX=e.clientX;lastY=e.clientY;
  if(!running){running=true;requestAnimationFrame(loop)}
},{passive:true});

document.documentElement.addEventListener('pointerleave',()=>{
  ring.classList.remove('on');
  trailPoints.length=0;glitchSlices.length=0;
});
addEventListener('pointerdown',e=>{
  if(document.querySelector('dialog.case-lightbox[open]'))return;
  ring.classList.add('is-down');
  spawnClickBurst(e.clientX,e.clientY);
  if(!running){running=true;requestAnimationFrame(loop)}
});
addEventListener('pointerup',()=>ring.classList.remove('is-down'));
const viewSel='.index-row,.connection-tile,.hero-project';
const zoomSel='.detail-page main article img,.detail-page main article a[href$=".jpg"],.detail-page main article a[href$=".jpeg"],.detail-page main article a[href$=".png"],.detail-page main article a[href$=".webp"],.detail-page main article a[href$=".avif"],.detail-page main article a[href$=".svg"]';
const ringLabel=ring.querySelector('span');
document.addEventListener('pointerover',e=>{
  const t=e.target.closest?.(`${viewSel},${zoomSel},a,button,textarea`);
  const isZoom=!!t&&t.matches(zoomSel);
  const isView=!!t&&(t.matches(viewSel)||isZoom);
  if(ringLabel)ringLabel.innerHTML=isZoom?'AMPLIAR <i class="hgi hgi-stroke hgi-search-add" aria-hidden="true"></i>':'VER <i class="hgi hgi-stroke hgi-arrow-up-right-01" aria-hidden="true"></i>';
  ring.classList.toggle('is-view',isView);
  ring.classList.toggle('is-link',!!t&&!isView);
});

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

// ===== In-page animated image lightbox for case studies =====
(()=>{
  const caseArticle = document.querySelector('.detail-page main article');
  if (!caseArticle) return;

  const imgHrefPattern = /\.(jpe?g|png|webp|avif|svg)(\?.*)?$/i;

  function extractItemMeta(img) {
    const fig = img.closest('figure');
    const cap = fig?.querySelector('figcaption');
    const browserBar = img.closest('.fin-web-frame,.browser-frame')?.querySelector('.fin-browserbar,.browser-bar');
    let kicker = '';
    let description = '';

    if (cap) {
      const span = cap.querySelector('span:first-child');
      const bold = cap.querySelector('b');
      const p = cap.querySelector('p');
      const secondSpan = cap.querySelectorAll('span')[1];
      if (span) kicker = span.textContent.trim();
      else if (bold) kicker = bold.textContent.trim();
      if (p) description = p.textContent.trim();
      else if (secondSpan && !cap.querySelector('a')) description = secondSpan.textContent.trim();
      else if (!span && !bold) kicker = cap.textContent.trim();
    }
    if (!kicker && browserBar) {
      const spans = browserBar.querySelectorAll('span');
      if (spans[1]) kicker = spans[1].textContent.trim();
    }
    if (!description) description = img.getAttribute('alt') || '';
    if (!kicker) kicker = document.title.replace(/\s*—.*$/, '').toUpperCase();

    const w = Number(img.getAttribute('width')) || img.naturalWidth || 1000;
    const h = Number(img.getAttribute('height')) || img.naturalHeight || 700;
    return {
      src: img.currentSrc || img.src,
      alt: img.getAttribute('alt') || kicker,
      kicker,
      description,
      isTall: h / w > 1.85
    };
  }

  function getGalleryItems() {
    const seen = new Set();
    const items = [];
    caseArticle.querySelectorAll('img').forEach(img => {
      const src = new URL(img.getAttribute('src') || img.src, location.href).href;
      if (!src || seen.has(src)) return;
      seen.add(src);
      items.push({ ...extractItemMeta(img), src });
    });
    return items;
  }

  // Enhance images and image links inside the case so they open in-page instead of a new tab.
  caseArticle.querySelectorAll('img').forEach(img => {
    const fig = img.closest('figure');
    const link = fig?.querySelector('a[href]');
    if (link && imgHrefPattern.test(link.getAttribute('href') || '')) {
      link.removeAttribute('target');
      link.dataset.lightboxTrigger = 'true';
    } else if (!img.closest('a,button')) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
    }
  });
  caseArticle.querySelectorAll('a[href]').forEach(link => {
    if (imgHrefPattern.test(link.getAttribute('href') || '')) {
      link.removeAttribute('target');
      link.dataset.lightboxTrigger = 'true';
    }
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'case-lightbox';
  dialog.setAttribute('aria-label', 'Visualização ampliada da imagem');
  dialog.innerHTML = `
    <div class="lightbox-topbar">
      <div class="lightbox-meta">
        <span class="lightbox-counter" data-lightbox-counter>01 / 01</span>
        <span class="lightbox-kicker" data-lightbox-kicker></span>
      </div>
      <div class="lightbox-actions">
        <button type="button" class="lightbox-btn" data-lightbox-zoom aria-pressed="false">Ampliar 100% <i class="hgi hgi-stroke hgi-search-add" aria-hidden="true"></i></button>
        <button type="button" class="lightbox-btn" data-lightbox-close aria-label="Fechar visualização">Fechar <i class="hgi hgi-stroke hgi-cancel-01" aria-hidden="true"></i></button>
      </div>
    </div>
    <div class="lightbox-stage" data-lightbox-stage>
      <button type="button" class="lightbox-nav lightbox-prev" data-lightbox-prev aria-label="Imagem anterior"><i class="hgi hgi-stroke hgi-arrow-left-01" aria-hidden="true"></i></button>
      <figure class="lightbox-figure" data-lightbox-figure>
        <img class="lightbox-img" data-lightbox-img src="" alt="">
      </figure>
      <button type="button" class="lightbox-nav lightbox-next" data-lightbox-next aria-label="Próxima imagem"><i class="hgi hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></button>
    </div>
    <div class="lightbox-footer">
      <p class="lightbox-caption" data-lightbox-caption></p>
      <span class="lightbox-hint">SETAS <i class="hgi hgi-stroke hgi-arrow-left-01" aria-hidden="true"></i> <i class="hgi hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i> PARA NAVEGAR · CLIQUE NA IMAGEM PARA ZOOM · ESC PARA FECHAR</span>
    </div>
  `;
  document.body.append(dialog);

  const counterEl = dialog.querySelector('[data-lightbox-counter]');
  const kickerEl = dialog.querySelector('[data-lightbox-kicker]');
  const captionEl = dialog.querySelector('[data-lightbox-caption]');
  const stageEl = dialog.querySelector('[data-lightbox-stage]');
  const figureEl = dialog.querySelector('[data-lightbox-figure]');
  const imgEl = dialog.querySelector('[data-lightbox-img]');
  const zoomBtn = dialog.querySelector('[data-lightbox-zoom]');
  const closeBtn = dialog.querySelector('[data-lightbox-close]');
  const prevBtn = dialog.querySelector('[data-lightbox-prev]');
  const nextBtn = dialog.querySelector('[data-lightbox-next]');

  let items = [];
  let currentIndex = 0;
  let zoomed = false;
  let lastFocused = null;
  let closingTimer = null;

  function setZoom(nextZoom) {
    zoomed = Boolean(nextZoom);
    stageEl.classList.toggle('is-zoomed', zoomed);
    zoomBtn.setAttribute('aria-pressed', String(zoomed));
    zoomBtn.innerHTML = zoomed ? 'Ajustar à tela <i class="hgi hgi-stroke hgi-search-minus" aria-hidden="true"></i>' : 'Ampliar 100% <i class="hgi hgi-stroke hgi-search-add" aria-hidden="true"></i>';
    if (!zoomed) stageEl.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  function renderSlide(animate = false) {
    const item = items[currentIndex];
    if (!item) return;

    const applyContent = () => {
      imgEl.src = item.src;
      imgEl.alt = item.alt;
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      kickerEl.textContent = item.kicker;
      captionEl.textContent = item.description;
      prevBtn.hidden = items.length <= 1;
      nextBtn.hidden = items.length <= 1;
      setZoom(item.isTall);
    };

    if (animate && !reduce) {
      figureEl.classList.add('is-switching');
      setTimeout(() => {
        applyContent();
        requestAnimationFrame(() => figureEl.classList.remove('is-switching'));
      }, 160);
    } else {
      applyContent();
    }
  }

  function openLightbox(targetSrc, triggerEl) {
    items = getGalleryItems();
    const resolved = new URL(targetSrc, location.href).href;
    let idx = items.findIndex(item => item.src === resolved);
    if (idx === -1) {
      items.push({
        src: resolved,
        alt: triggerEl?.getAttribute('aria-label') || document.title,
        kicker: document.title.replace(/\s*—.*$/, '').toUpperCase(),
        description: triggerEl?.getAttribute('aria-label') || '',
        isTall: false
      });
      idx = items.length - 1;
    }
    currentIndex = idx;
    lastFocused = triggerEl || document.activeElement;

    clearTimeout(closingTimer);
    dialog.classList.remove('is-closing');
    renderSlide(false);

    if (!dialog.open) dialog.showModal();
    document.querySelector('.cursor-ring')?.classList.remove('on');
    requestAnimationFrame(() => {
      dialog.classList.add('is-open');
      closeBtn.focus({ preventScroll: true });
    });
  }

  function closeLightbox() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (reduce) {
      dialog.classList.remove('is-open', 'is-closing');
      dialog.close();
      lastFocused?.focus?.({ preventScroll: true });
      return;
    }
    dialog.classList.remove('is-open');
    dialog.classList.add('is-closing');
    closingTimer = setTimeout(() => {
      dialog.classList.remove('is-closing');
      if (dialog.open) dialog.close();
      lastFocused?.focus?.({ preventScroll: true });
    }, 340);
  }

  function stepSlide(delta) {
    if (items.length <= 1) return;
    currentIndex = (currentIndex + delta + items.length) % items.length;
    renderSlide(true);
  }

  caseArticle.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (link && imgHrefPattern.test(link.getAttribute('href') || '')) {
      event.preventDefault();
      openLightbox(link.href, link);
      return;
    }
    const img = event.target.closest('img');
    if (img && caseArticle.contains(img)) {
      event.preventDefault();
      openLightbox(img.currentSrc || img.src, img);
    }
  });

  caseArticle.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const img = event.target.closest('img[role="button"]');
    if (img && caseArticle.contains(img)) {
      event.preventDefault();
      openLightbox(img.currentSrc || img.src, img);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  zoomBtn.addEventListener('click', () => setZoom(!zoomed));
  imgEl.addEventListener('click', event => {
    event.stopPropagation();
    setZoom(!zoomed);
  });
  prevBtn.addEventListener('click', event => {
    event.stopPropagation();
    stepSlide(-1);
  });
  nextBtn.addEventListener('click', event => {
    event.stopPropagation();
    stepSlide(1);
  });

  // Close when clicking the stage backdrop outside the image and buttons.
  stageEl.addEventListener('click', event => {
    if (event.target === stageEl || event.target === figureEl) closeLightbox();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeLightbox();
  });

  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeLightbox();
  });

  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepSlide(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepSlide(1);
    } else if (event.key === 'z' || event.key === 'Z') {
      event.preventDefault();
      setZoom(!zoomed);
    }
  });
})();
