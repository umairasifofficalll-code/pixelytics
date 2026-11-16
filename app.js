(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // entrances, staggered by --d, once
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.05});
    rv.forEach(function(el){io.observe(el)});
  }else rv.forEach(function(el){el.classList.add('in')});

  // client videos: muted loops that play only while on screen
  var vids=[].slice.call(document.querySelectorAll('video'));
  if(reduce){vids.forEach(function(v){v.removeAttribute('autoplay');v.controls=true})}
  else if('IntersectionObserver' in window){
    var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.25});
    vids.forEach(function(v){vo.observe(v)});
  }

  // enquiry form -> WhatsApp message
  var f=document.getElementById('enq');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var t='Hi Pixelytics, I am '+f.n.value+(f.b.value?(' from '+f.b.value):'')+'. I need: '+f.w.value+'.'+(f.m.value?(' '+f.m.value):'');
    window.open('https://wa.me/923472811951?text='+encodeURIComponent(t),'_blank','noopener');
  });

  // Lahore time
  var c=document.getElementById('clock');
  function tick(){try{c.textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Karachi',hour:'2-digit',minute:'2-digit'})}catch(x){}}
  if(c){tick();setInterval(tick,30000)}

  // pricing: phone layout, one block per plan, built from the table
  var tb=document.querySelector('#pricing table'),host=document.getElementById('plans-m');
  if(tb&&host){
    var heads=[].slice.call(tb.querySelectorAll('thead th')).slice(1),rows=[].slice.call(tb.querySelectorAll('tbody tr'));
    heads.forEach(function(h,i){
      var d=document.createElement('div');d.className='plan-m'+(h.classList.contains('rec')?' rec':'');
      var price='',dl='',btn='';
      rows.forEach(function(r){
        var label=r.querySelector('th').textContent,cell=r.children[i+1];
        if(!label){btn=cell.innerHTML}
        else if(label==='Price'){price=cell.textContent.replace('after a short chat',' after a short chat')}
        else dl+='<dt>'+label+'</dt><dd>'+cell.textContent+'</dd>';
      });
      d.innerHTML='<h3>'+h.textContent+'</h3><p class="pp">'+price+'</p><dl style="margin:0">'+dl+'</dl>'+btn;
      host.appendChild(d);
    });
  }
})();
