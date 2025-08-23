
// ====================== CONFIGURACIÓN DE PADS ====================== //
const padsContainer = document.getElementById("padsContainer");
const totalPads = 18;
const baseColors = ["#ff4d4d","#4dff4d","#4d4dff","#ffff4d","#ff4dff","#4dffff"];

let pads = [];
let currentAudio = null; // audio que se está reproduciendo actualmente
let globalVolume = 0.5; // volumen inicial al 50%

for (let i = 1; i <= totalPads; i++) {
  const pad = document.createElement("div");
  pad.className = "pad";
  pad.dataset.index = i;
  pad.innerText = i; // se actualizará al cambiar efecto
  pad.addEventListener("click", () => playPad(i));
  padsContainer.appendChild(pad);
  pads.push(pad);
}

// ====================== AUDIOS POR EFECTO ====================== //
const allPadAudios = [
  [ "ESTORNUDO","audios/efecto1_pad2.mp3","audios/efecto1_pad3.mp3","audios/efecto1_pad4.mp3","audios/efecto1_pad5.mp3","audios/efecto1_pad6.mp3","audios/efecto1_pad7.mp3","audios/efecto1_pad8.mp3","audios/efecto1_pad9.mp3","audios/efecto1_pad10.mp3","audios/efecto1_pad11.mp3","audios/efecto1_pad12.mp3","audios/efecto1_pad13.mp3","audios/efecto1_pad14.mp3","audios/efecto1_pad15.mp3","audios/efecto1_pad16.mp3","audios/efecto1_pad17.mp3","audios/efecto1_pad18.mp3" ],
  [ "audios/efecto2_pad1.mp3","RUGIDO DE LEON","audios/efecto2_pad3.mp3","audios/efecto2_pad4.mp3","audios/efecto2_pad5.mp3","audios/efecto2_pad6.mp3","audios/efecto2_pad7.mp3","audios/efecto2_pad8.mp3","audios/efecto2_pad9.mp3","audios/efecto2_pad10.mp3","audios/efecto2_pad11.mp3","audios/efecto2_pad12.mp3","audios/efecto2_pad13.mp3","audios/efecto2_pad14.mp3","audios/efecto2_pad15.mp3","audios/efecto2_pad16.mp3","audios/efecto2_pad17.mp3","audios/efecto2_pad18.mp3" ],
  [ "audios/efecto3_pad1.mp3","audios/efecto3_pad2.mp3","PERRO RABIOSO","audios/efecto3_pad4.mp3","audios/efecto3_pad5.mp3","audios/efecto3_pad6.mp3","audios/efecto3_pad7.mp3","audios/efecto3_pad8.mp3","audios/efecto3_pad9.mp3","audios/efecto3_pad10.mp3","audios/efecto3_pad11.mp3","audios/efecto3_pad12.mp3","audios/efecto3_pad13.mp3","audios/efecto3_pad14.mp3","audios/efecto3_pad15.mp3","audios/efecto3_pad16.mp3","audios/efecto3_pad17.mp3","audios/efecto3_pad18.mp3" ],
  [ "audios/efecto4_pad1.mp3","audios/efecto4_pad2.mp3","audios/efecto4_pad3.mp3","audios/efecto4_pad4.mp3","audios/efecto4_pad5.mp3","audios/efecto4_pad6.mp3","audios/efecto4_pad7.mp3","audios/efecto4_pad8.mp3","audios/efecto4_pad9.mp3","audios/efecto4_pad10.mp3","audios/efecto4_pad11.mp3","audios/efecto4_pad12.mp3","audios/efecto4_pad13.mp3","audios/efecto4_pad14.mp3","audios/efecto4_pad15.mp3","audios/efecto4_pad16.mp3","audios/efecto4_pad17.mp3","audios/efecto4_pad18.mp3" ],
  [ "audios/efecto5_pad1.mp3","audios/efecto5_pad2.mp3","audios/efecto5_pad3.mp3","audios/efecto5_pad4.mp3","audios/efecto5_pad5.mp3","audios/efecto5_pad6.mp3","audios/efecto5_pad7.mp3","audios/efecto5_pad8.mp3","audios/efecto5_pad9.mp3","audios/efecto5_pad10.mp3","audios/efecto5_pad11.mp3","audios/efecto5_pad12.mp3","audios/efecto5_pad13.mp3","audios/efecto5_pad14.mp3","audios/efecto5_pad15.mp3","audios/efecto5_pad16.mp3","audios/efecto5_pad17.mp3","audios/efecto5_pad18.mp3" ]
];

let currentEffect = 0; // Efecto activo

// ====================== FUNCIONES ====================== //
function shuffle(array){
  let arr = array.slice();
  for(let i = arr.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}

function setEffect(effectNumber){
  currentEffect = effectNumber;
  const shuffled = shuffle(baseColors);
  pads.forEach((pad,i)=>{
    pad.style.background = shuffled[i%shuffled.length];
    // Mostrar nombre del audio
    const audioSrc = allPadAudios[effectNumber-1][i];
    if(audioSrc){
      pad.innerText = audioSrc.includes(".mp3") ? audioSrc.split("/").pop().replace(".mp3","") : audioSrc;
    } else {
      pad.innerText = "";
    }
  });

  // Detener audio anterior al cambiar efecto
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// Reproducir audio del pad según efecto activo
function playPad(index){
  if(currentEffect === 0) return;
  const audioSrc = allPadAudios[currentEffect-1][index-1];
  if(!audioSrc) return;

  // Detener audio anterior si existe
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(audioSrc);
  currentAudio.volume = globalVolume; // aplicar volumen general
  currentAudio.play();
}

// ====================== VOLUMEN GENERAL ====================== //
const volumeControl = document.getElementById("volumeControl");
volumeControl.value = globalVolume;
volumeControl.addEventListener("input",()=>{
  globalVolume = parseFloat(volumeControl.value);
  if(currentAudio) currentAudio.volume = globalVolume;
});

// ====================== BURBUJA INSTALAR ====================== //
let deferredPrompt;
const installBanner = document.getElementById("installBanner");

window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredPrompt = e;
  installBanner.style.display="block";
});

installBanner.addEventListener("click",async ()=>{
  installBanner.style.display="none";
  if(deferredPrompt){
    deferredPrompt.prompt();
    const {outcome} = await deferredPrompt.userChoice;
    if(outcome==="accepted") deferredPrompt = null;
  }
});

window.addEventListener("appinstalled",()=>{
  installBanner.style.display="none";
  deferredPrompt = null;
});

// ====================== iPhone fallback ====================== //
if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
  installBanner.innerText="En iPhone: toca compartir → 'Agregar a pantalla de inicio'";
  installBanner.style.display="block";
}