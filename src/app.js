/**
 * KOA'S BEACH ADVENTURES — CLIENT RUNTIME
 * ==========================================
 * Much smaller than the pre-Eleventy version. Header/footer, character
 * grids, the map, book shelves, and related-content blocks are all
 * server-rendered now (see the .njk templates and eleventy.config.js) —
 * this file only handles things that are genuinely interactive:
 * scroll reveals, the mobile nav toggle, the boat wayfinding marker,
 * sound-unlock, the "Did You Know?" click-to-rotate widget, passport
 * printing, and the search page's live filtering.
 */

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll('.reveal, .reveal-group');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.15 });
  els.forEach(el=>io.observe(el));
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ---------- Sound-unlock pattern ---------- */
function initSoundUnlock(mediaEl, onUnlock){
  if(!mediaEl) return;
  let unlocked = false;
  function unlock(){
    if(unlocked) return;
    unlocked = true;
    if(onUnlock) onUnlock(mediaEl);
    ['click','touchstart','scroll','keydown'].forEach(evt => window.removeEventListener(evt, unlock));
  }
  ['click','touchstart','scroll','keydown'].forEach(evt => window.addEventListener(evt, unlock, { once:false, passive:true }));
}

/* ---------- "Did You Know?" — facts are prerendered as JSON, not fetched ---------- */
function initDidYouKnow(){
  const el = document.getElementById('dyk-widget');
  if(!el) return;
  const dataEl = document.getElementById('dyk-facts');
  if(!dataEl) return;
  let facts;
  try { facts = JSON.parse(dataEl.textContent); } catch(e) { return; }
  if(!facts.length) return;
  let i = 0;
  const textEl = el.querySelector('.dyk-text');
  el.addEventListener('click', ()=>{
    i = (i + 1) % facts.length;
    textEl.textContent = facts[i];
  });
}

/* ---------- Video: lazy-load, autoplay when visible, pause when not ----------
   Respects prefers-reduced-motion and navigator.connection.saveData — on
   either, videos load their poster only and wait for an explicit click
   rather than autoplaying, per the Phase 3 "every animation earns its
   place" and accessibility-floor principles. */
function shouldAutoplayVideo(){
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  return !reducedMotion && !saveData;
}

function initLazyVideos(){
  const videos = document.querySelectorAll('.js-lazy-video');
  if(!videos.length) return;
  const autoplayOK = shouldAutoplayVideo();

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const video = entry.target;
      if(entry.isIntersecting){
        if(!video.dataset.loaded){
          const src = video.dataset.src;
          if(src){
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            video.load();
            video.dataset.loaded = 'true';
          }
        }
        if(autoplayOK){ video.play().catch(()=>{}); }
      } else {
        if(!video.paused) video.pause();
      }
    });
  }, { threshold: .35 });

  videos.forEach(v => io.observe(v));

  // Per-video sound toggle — deliberately per-card, not a global unlock,
  // since a grid of several videos shouldn't all unmute from one tap.
  document.querySelectorAll('.video-sound-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const card = btn.closest('.video-card');
      const video = card && card.querySelector('video');
      if(!video) return;
      video.muted = !video.muted;
      btn.textContent = video.muted ? '🔇' : '🔊';
    });
  });
}

/* ---------- YouTube facade — real iframe only loads after a click ----------
   Keeps the page fast: a YouTube embed's JS/iframe weight (~500KB+) never
   loads until someone actually wants to watch it. */
function initYouTubeFacades(){
  document.querySelectorAll('.youtube-facade').forEach(facade=>{
    function embed(){
      const id = facade.dataset.youtubeId;
      if(!id) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      facade.innerHTML = '';
      facade.appendChild(iframe);
    }
    facade.addEventListener('click', embed);
    facade.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); embed(); } });
  });
}


function printPassport(slug){
  document.querySelectorAll('.passport-card').forEach(el=>{
    el.style.display = (el.dataset.slug === slug) ? '' : 'none';
  });
  window.print();
  setTimeout(()=>{
    document.querySelectorAll('.passport-card').forEach(el=> el.style.display = '');
  }, 500);
}

/* ---------- Search page: fetches the prerendered index, filters client-side ---------- */
function initSearchPage(){
  const input = document.getElementById('q');
  const results = document.getElementById('results');
  const form = document.getElementById('search-form');
  if(!input || !results || !form) return;

  let index = null;
  async function loadIndex(){
    if(index) return index;
    const res = await fetch('/search-index.json');
    index = await res.json();
    return index;
  }

  function paint(query){
    if(!query){
      results.innerHTML = '<p style="color:#666;text-align:center;">Start typing to search Koa\'s world.</p>';
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = index.filter(item => item.haystack.includes(q));
    if(!matches.length){
      results.innerHTML = `<p style="color:#666;text-align:center;">Nothing found for "${query}" yet — try a character or place name.</p>`;
      return;
    }
    results.innerHTML = matches.map(m => `
      <a href="${m.href}" class="result-row">
        <span class="type-tag">${m.type}</span>
        <div><h3>${m.title}</h3><p>${m.desc || ''}</p></div>
      </a>`).join('');
  }

  loadIndex().then(()=>{
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q') || '';
    input.value = initialQuery;
    paint(initialQuery);
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    history.replaceState(null, '', `/search/?q=${encodeURIComponent(input.value)}`);
    paint(input.value);
  });
  input.addEventListener('input', ()=> paint(input.value));
}

/* ---------- Gully flying across the page — a real surprise on scroll ---------- */
function initGullyFlyby(){
  const gully = document.getElementById('gully-flyby');
  const chapters = document.querySelectorAll('[data-chapter]');
  if(!gully || !chapters.length) return;
  let lastFlight = 0;
  const cooldownMs = 12000;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const now = Date.now();
        if(now - lastFlight > cooldownMs && Math.random() < 0.6){
          lastFlight = now;
          gully.classList.remove('flying');
          void gully.offsetWidth; // restart the CSS animation
          gully.classList.add('flying');
          setTimeout(()=> gully.classList.remove('flying'), 4600);
        }
      }
    });
  }, { threshold:.5 });
  chapters.forEach(c => io.observe(c));
}

/* ---------- A hidden shell in the sand — findable, rewards curiosity ---------- */
function initHiddenShell(){
  const shellBtn = document.getElementById('hidden-shell');
  const reveal = document.getElementById('shell-reveal');
  const textEl = document.getElementById('shell-reveal-text');
  const factsEl = document.getElementById('shell-facts');
  if(!shellBtn || !reveal || !textEl || !factsEl) return;
  let facts = [];
  try { facts = JSON.parse(factsEl.textContent); } catch(e){}
  function show(){
    if(!facts.length) return;
    textEl.textContent = facts[Math.floor(Math.random() * facts.length)];
    reveal.hidden = false;
  }
  function hide(){ reveal.hidden = true; }
  shellBtn.addEventListener('click', show);
  reveal.addEventListener('click', hide);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') hide(); });
}


/* ---------- The Welcome — timed greeting reveal, delayed scroll cue, optional sound toggle ---------- */
function initWelcome(){
  const greeting = document.getElementById('hero-greeting');
  const scrollCue = document.getElementById('scroll-cue');
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(greeting){
    if(reducedMotion){
      greeting.classList.add('in');
    } else {
      setTimeout(()=> greeting.classList.add('in'), 1300);
    }
  }
  if(scrollCue){
    if(reducedMotion){
      scrollCue.classList.add('in');
    } else {
      setTimeout(()=> scrollCue.classList.add('in'), 1900);
    }
  }

  // Sound control only exists in the DOM when a real voice file was detected at build time —
  // nothing to wire up otherwise, and nothing silently broken either.
  const toggle = document.getElementById('hero-sound-toggle');
  const audio = document.getElementById('hero-voice');
  if(toggle && audio){
    let playing = false;
    toggle.addEventListener('click', ()=>{
      playing = !playing;
      if(playing){
        audio.currentTime = 0;
        audio.play().catch(()=>{});
        toggle.textContent = '🔊';
        toggle.setAttribute('aria-pressed', 'true');
        toggle.setAttribute('aria-label', "Mute Koa's voice");
      } else {
        audio.pause();
        toggle.textContent = '🔇';
        toggle.setAttribute('aria-pressed', 'false');
        toggle.setAttribute('aria-label', "Play Koa's voice");
      }
    });
    audio.addEventListener('ended', ()=>{
      playing = false;
      toggle.textContent = '🔇';
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-label', "Play Koa's voice");
    });
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  initReveal();
  initNavToggle();
  initDidYouKnow();
  initSearchPage();
  initLazyVideos();
  initYouTubeFacades();
  initGullyFlyby();
  initHiddenShell();
  initWelcome();
});
