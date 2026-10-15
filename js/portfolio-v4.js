(()=>{'use strict';
const projects=window.PROGMIDO_PROJECTS||[];
const names=[['Website Design','تصميم وتطوير المواقع'],['Logo Design','تصميم الشعارات'],['Motion Graphics & Video Editing','الموشن جرافيك وتحرير الفيديو'],['Infographics','تصميم الإنفوجرافيك'],['Social Media, Posters & Ads Design','السوشيال ميديا والبوسترات والإعلانات']];
const filters=document.getElementById('v4Filters'),grid=document.getElementById('v4Projects'),overlay=document.getElementById('v4Overlay'),media=document.getElementById('v4Media');
let category=-1,sub='all',lastFocus=null;
const ar=()=>document.documentElement.lang==='ar';const t=(en,arabic)=>ar()?arabic:en;
const safe=(s)=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const title=p=>ar()?(p.ar||p.title):(p.title||p.ar);
function drawFilters(){const tabs=[[-1,'All Work','كل الأعمال'],...names.map((x,i)=>[i,...x])];filters.innerHTML=tabs.map(([i,en,arabic])=>`<button type="button" class="v4-filter ${i===category?'active':''}" data-cat="${i}" aria-pressed="${i===category}">${safe(t(en,arabic))}</button>`).join('');if(category===0||category===4){let opts=category===0?[['all','All Websites','جميع المواقع'],['business','Business & Personal','تجارية وشخصية'],['landing','Landing Pages & Events','صفحات هبوط ومناسبات']]:[['all','All Designs','جميع التصاميم'],['social','Social Media & Posters','منشورات وبوسترات'],['ads','Ads Design','الإعلانات']];filters.innerHTML+=`<div class="v4-subfilters">${opts.map(([v,en,arabic])=>`<button type="button" class="v4-filter small ${sub===v?'active':''}" data-sub="${v}">${safe(t(en,arabic))}</button>`).join('')}</div>`;}}
function drawProjects(){
 drawFilters();
 const chosen=projects.filter(p=>(category<0||p.category===category)&&(sub==='all'||category!==p.category||p.group===sub));
 grid.innerHTML=chosen.map(p=>{
  const i=projects.indexOf(p),src=p.images?.[0]?.src||'assets/portfolio/Motion Preview.jpg';
  const label=t(p.category===0?'Open live website ↗':'View gallery →',p.category===0?'فتح الموقع في تبويب جديد ↗':'عرض المعرض ←');
  const inner=`<img src="${safe(src)}" loading="lazy" alt="${safe(title(p))}"><div class="v4-project-text"><span>${safe(t(...names[p.category]))}</span><h3>${safe(title(p))}</h3><p>${safe(ar()?p.ardesc:p.description)}</p><strong>${safe(label)}</strong></div>`;
  if(p.category===0&&p.url)return `<div class="col-md-6 col-lg-4"><a class="v4-project v4-project-link" href="${safe(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${safe(title(p))} — ${safe(label)}">${inner}</a></div>`;
  return `<div class="col-md-6 col-lg-4"><button class="v4-project" type="button" data-index="${i}">${inner}</button></div>`;
 }).join('')||`<p>${t('No projects in this category yet.','لا توجد مشاريع في هذه الفئة حاليًا.')}</p>`;
}
function openProject(p){
 lastFocus=document.activeElement;
 document.getElementById('v4DialogCategory').textContent=t(...names[p.category]);
 document.getElementById('v4DialogTitle').textContent=title(p);
 document.getElementById('v4DialogDesc').textContent=ar()?p.ardesc:p.description;
 media.replaceChildren();
 if(p.category===2){
  const video=document.createElement('video');video.controls=true;video.preload='none';video.playsInline=true;
  video.poster='assets/portfolio/Motion Preview.jpg';video.src='assets/progmido-showreel.mp4';media.append(video);
 }else{
  const images=p.images||[];
  if(images.length>1){
   const gallery=document.createElement('div');gallery.className='v4-gallery-viewer';
   const stage=document.createElement('figure');stage.className='v4-gallery-stage';
   const large=document.createElement('img');large.className='v4-gallery-large';
   const caption=document.createElement('figcaption');caption.className='v4-gallery-caption';
   stage.append(large,caption);
   const nav=document.createElement('div');nav.className='v4-gallery-nav';
   const prev=document.createElement('button');prev.type='button';prev.className='v4-gallery-arrow';
   const next=document.createElement('button');next.type='button';next.className='v4-gallery-arrow';
   const count=document.createElement('span');count.className='v4-gallery-count';
   prev.textContent=t('← Previous','السابق →');next.textContent=t('Next →','← التالي');
   nav.append(prev,count,next);
   const strip=document.createElement('div');strip.className='v4-gallery-strip';strip.setAttribute('aria-label',t('Select an image','اختر صورة'));
   let current=0;
   const thumbs=images.map((item,i)=>{
    const button=document.createElement('button');button.type='button';button.className='v4-gallery-thumb';
    button.setAttribute('aria-label',(item.label||title(p))+' — '+(i+1));
    const img=document.createElement('img');img.src=item.src;img.alt=item.label||title(p);img.loading='lazy';
    button.append(img);button.addEventListener('click',()=>show(i));strip.append(button);return button;
   });
   function show(i){
    current=(i+images.length)%images.length;
    const item=images[current];large.src=item.src;large.alt=title(p)+(item.label?' — '+item.label:'');
    caption.textContent=item.label||title(p);count.textContent=(current+1)+' / '+images.length;
    thumbs.forEach((button,index)=>{button.classList.toggle('active',index===current);button.setAttribute('aria-pressed',String(index===current))});
    thumbs[current].scrollIntoView({block:'nearest',inline:'nearest'});
   }
   prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));
   gallery.append(stage,nav,strip);media.append(gallery);show(0);
  }else{
   const gallery=document.createElement('div');gallery.className='v4-gallery';
   images.forEach(item=>{const fig=document.createElement('figure'),img=document.createElement('img');img.src=item.src;img.alt=title(p);fig.append(img);if(item.label){const caption=document.createElement('figcaption');caption.textContent=item.label;fig.append(caption)}gallery.append(fig)});
   media.append(gallery);
  }
 }
 const link=document.getElementById('v4Live');link.hidden=!p.url;
 if(p.url){link.href=p.url;link.textContent=t('Visit Live Website ↗','زيارة الموقع مباشرة ↗')}
 overlay.hidden=false;document.body.classList.add('v4-modal-open');document.getElementById('v4Close').focus();
}
function close(){overlay.hidden=true;document.body.classList.remove('v4-modal-open');media.querySelector('video')?.pause();media.replaceChildren();lastFocus?.focus();}
document.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{category=Number(btn.dataset.category);sub='all';drawProjects();document.getElementById('work').scrollIntoView({behavior:'smooth'});}));
filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.cat!==undefined){category=Number(b.dataset.cat);sub='all';}else if(b.dataset.sub)sub=b.dataset.sub;drawProjects()});grid.addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)openProject(projects[Number(b.dataset.index)])});document.getElementById('v4Close').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const focusables=[...overlay.querySelectorAll('button:not([disabled]),a:not([hidden]),video[controls]')].filter(el=>el.offsetParent!==null);if(!focusables.length)return;let first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
function sync(){document.querySelectorAll('[data-en][data-ar]').forEach(el=>el.textContent=ar()?el.dataset.ar:el.dataset.en);drawProjects();}
document.getElementById('langToggle')?.addEventListener('click',()=>queueMicrotask(sync));sync();
})();