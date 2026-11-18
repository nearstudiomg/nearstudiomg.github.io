(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // apparition au scroll
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  // barre de nav : sombre sur le hero, claire ensuite
  var nav = document.querySelector('.nav'), hero = document.querySelector('.hero');
  function navState(){ if(!hero){ nav.classList.add('light'); return; } nav.classList.toggle('light', scrollY > hero.offsetHeight * .62); }
  navState(); addEventListener('scroll', navState, {passive:true});

  // la Terre se lève au scroll
  var earth = document.querySelector('.earth');
  if(earth && !reduce){
    addEventListener('scroll', function(){ var y = Math.min(scrollY, innerHeight); earth.style.transform = 'translate(-50%,' + (-y * .28) + 'px) scale(' + (1 + y / innerHeight * .08) + ')'; }, {passive:true});
  }

  // lecteur vidéo : l'iframe (Facebook, YouTube) ne se charge qu'au clic
  var v = document.querySelector('.viewer');
  if(v){
    var vids = v.querySelectorAll('.vid'), tabs = v.querySelectorAll('.tabs button');
    function stop(){ vids.forEach(function(d){ var f = d.querySelector('iframe'); if(f) f.remove(); d.querySelector('img').style.display = ''; d.querySelector('.bigplay').style.display = ''; }); }
    tabs.forEach(function(b, j){ b.addEventListener('click', function(){ stop(); tabs.forEach(function(x, k){ x.classList.toggle('on', k === j); }); vids.forEach(function(d, k){ d.classList.toggle('on', k === j); }); }); });
    vids.forEach(function(d){ d.querySelector('.bigplay').addEventListener('click', function(){
      var f = document.createElement('iframe'); f.src = d.dataset.src; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
      d.querySelector('img').style.display = 'none'; this.style.display = 'none'; d.appendChild(f); }); });
  }

  // liste collante : le projet actif suit le scroll
  var its = document.querySelectorAll('.list .it'), wins = document.querySelectorAll('.stick .screen img');
  if(its.length){
    function act(k){ its.forEach(function(e, j){ e.classList.toggle('on', j === k); }); wins.forEach(function(e, j){ e.classList.toggle('on', j === k); }); }
    act(0);
    var io2 = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) act([].indexOf.call(its, e.target)); }); }, {rootMargin:'-45% 0px -45% 0px'});
    its.forEach(function(e, j){ io2.observe(e); e.addEventListener('click', function(){ act(j); }); });
  }
})();
