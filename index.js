(function(global){
    const keys = document.querySelectorAll('.key');
    class DrumKit {
        constructor() {
            this.state = {
                memory: []
            }
        }
        makeNoise(audio,key){
        if(!audio) return;
        this.state.memory.push(audio);
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
        }
        removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        this.classList.remove('playing');
        }
    }
    const drumKit = new DrumKit();
    class Sound extends DrumKit{
        constructor(){
            super()
        }
        keyNoise(keypress) {
        if (keypress.keyCode === 13) {new Sound().playBack()};
        const audio = document.querySelector(`audio[data-key="${keypress.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${keypress.keyCode}"`);
        drumKit.makeNoise(audio,key)
        }
        clickNoise(click) {    
        click = click.path[1].dataset.key;
        const audio = document.querySelector(`audio[data-key="${click}"]`);
        const key = document.querySelector(`button.key[data-key="${click}"`);
        drumKit.makeNoise(audio,key);
    }
        playBack(){
        const audio = drumKit.state.memory; 
        let i = 0;
            setInterval(() => {
                if (i < audio.length ){    
                    audio[i].play();
                    i++;
                };
            }, 375) // Replays audio from memory every 375ms 
        }  
    }
    const sound = new Sound()
    
    global.addEventListener('keydown', sound.keyNoise);
    keys.forEach(function(key) {
        key.addEventListener('click',sound.clickNoise);
        key.addEventListener('contextmenu',function(e){
          e.preventDefault();
        });
        key.addEventListener('transitionend',drumKit.removeTransition);
    });
    document.querySelector('#replay').addEventListener('click', sound.playBack)
    })(window)