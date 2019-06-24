function keyNoise(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`button.key[data-key="${e.keyCode}"]`);
    if(!audio) return;  // stops the function from running
    makeNoise(audio,key);
  }
  
  function clickNoise(e){
    e.preventDefault();
    if (isNaN(e.path[1].outerHTML.slice(18,21).charAt(2))){
    e = Number(e.path[1].outerHTML.slice(18,20));
    } else {
    e = Number(e.path[1].outerHTML.slice(18,21));
    }
    const audio = document.querySelector(`audio[data-key="${e}"]`);
    const key = document.querySelector(`button.key[data-key="${e}"]`);
    if(!audio) return;  // stops the function from running
    makeNoise(audio,key)
  }
  
  function makeNoise(a,k){
    a.currentTime = 0; 
    a.play();
    k.classList.add('playing');
  }
  
  function removeTransition(e){
    if (e.propertyName !== 'transform') return; // skips if it is not a transition
    this.classList.remove('playing');
  }
  const keys = document.querySelectorAll('button.key');
  keys.forEach(key => {
    key.addEventListener('click',clickNoise);
    key.addEventListener('contextmenu',function(e){
      e.preventDefault();
    })
    key.addEventListener('transitionend',removeTransition);
  });
  window.addEventListener('keydown',keyNoise);