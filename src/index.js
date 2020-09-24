import * as Tone from 'tone'

const textBox = document.getElementById('textbox');
const text1 = document.getElementById('text1');
const start = document.getElementById('start');
let harmonyState = false;
let octave = 4;
let hue = (Math.random() * 360)

const BaseAudioContext = window.AudioContext || window.webkitAudioContext
const context = new BaseAudioContext()

// Animation tuto

const tuto = document.getElementById('tutoText')

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination();

synth.set({ detune: -1200 });

const Do = ['a', 'q', 'w'];
/*const DoD = []
const Ré = []
const RéD = []
const Mi = []
const Fa = []
const FaD = []
const Sol = []
const SolD = []
const La = []
const LaD = []
const Si = []
const SiD = []*/
// Range input 
const range = document.createElement('input')
range.className = 'rangeOctave'
range.type = 'range'
range.min = 0
range.max = 1000


range.addEventListener('input', ev => {
  //oscillator.frequency.value = ev.target.value

  switch (true) {
    case (ev.target.value > 875):
      octave = 2;
      break
    case (ev.target.value <= 875 && ev.target.value >= 750):
      octave = 3;
      break
    case (ev.target.value <= 875 && ev.target.value >= 750):
      octave = 4;
      break
    case (ev.target.value <= 750 && ev.target.value >= 625):
      octave = 5;
      break
    case (ev.target.value <= 625 && ev.target.value >= 500):
      octave = 6;
      break
    case (ev.target.value <= 500 && ev.target.value >= 375):
      octave = 7;
      break
    case (ev.target.value <= 375 && ev.target.value >= 250):
      octave = 8;
      break
    case (ev.target.value <= 250 && ev.target.value >= 125):
      octave = 8;
      break
    default:
      octave = 4
  }

  console.log(text1.style.fontVariationSettings)
  //text1.style.font.fontVariationSettings = `wght ${ev.target.value}`
  document.documentElement.style
    .setProperty('--currentWeigth', ev.target.value);
})
range.style.width = '50%'
range.style.marginLeft = '25%'


var harmoniseMove = function (ev) {
  console.log(ev)
  let hueShadow = ((hue + 180) % 360)
  const posLar = (ev.clientX / document.body.scrollHeight) * 100 / 2 - 50
  const posLon = (ev.clientY / document.body.scrollWidth) * 100 / 2

  text1.style.textShadow = `${posLar}px ${posLon}px hsl( ${hueShadow}, 11%, 50%)`
}


// Harmony button
const harmony = document.createElement('button')
harmony.type = 'button'
harmony.innerHTML = 'Harmonise it'
harmony.className = 'harmonyButton'
harmony.addEventListener('click', ev => {
  if (harmonyState === false) {
    document.addEventListener('mousemove', harmoniseMove)
    harmonyState = true
    harmony.innerHTML = 'Harmonise less'

    //oscillator.frequency.value = ev.target.value / 2

  } else {
    document.removeEventListener('mousemove', harmoniseMove)
    harmony.innerHTML = 'Harmonise it'
    harmonyState = false

    text1.style.textShadow = '0 0 transparent'
    //oscillator.frequency.value = ''
  }
})




const section = document.getElementById('section')
section.append(range)

const buttons = document.getElementById('buttons')
buttons.append(harmony)

const currentWeigth = getComputedStyle(document.documentElement).getPropertyValue('--currentWeigth');

/* function octave(currentWeigth) {
   switch(currentWeigth){
     case (0 < currentWeigth < 125):
       return 2;
       break
   }
 }*/

document.addEventListener('keypress', (touch) => {
  console.log(touch.key)
  text1.textContent = text1.textContent + touch.key
  if (!harmonyState) {
    console.log(harmonyState)
    switch (touch.key) {
      case 'a': case 'q': case 'w':
        synth.triggerAttackRelease(`C${octave}`, "8n");
        break
      case 'z': case 's': case 'x':
        synth.triggerAttackRelease(`Cb${octave}`, "8n");
        break
      case 'e': case 'd': case 'c':
        synth.triggerAttackRelease(`D${octave}`, "8n");
        break
      case 'r': case 'f': case 'v':
        synth.triggerAttackRelease(`Db${octave}`, "8n");
        break
      case 't': case 'g': case 'b':
        synth.triggerAttackRelease(`E${octave}`, "8n");
        break
      case 'y': case 'h': case 'n':
        synth.triggerAttackRelease(`F${octave}`, "8n");
        break
      case 'u': case 'j': case ',':
        synth.triggerAttackRelease(`Fb${octave}`, "8n");
        break
      case 'i': case 'k': case ';':
        synth.triggerAttackRelease(`G${octave}`, "8n");
        break
      case 'o': case 'l': case ':':
        synth.triggerAttackRelease(`Gb${octave}`, "8n");
        break
      case 'p': case 'm': case '=':
        synth.triggerAttackRelease(`A${octave}`, "8n");
        break
      case 'ù':
        synth.triggerAttackRelease(`Ab${octave}`, "8n");
        break
      case '$': case '`':
        synth.triggerAttackRelease(`B${octave}`, "8n");
        break
    }
  } else {
    switch (touch.key) {
      case 'a': case 'q': case 'w':
        synth.triggerAttackRelease([`C${octave}, E${octave}, G${octave}`], 1);
        break
      case 'z': case 's': case 'x':
        synth.triggerAttackRelease(`Cb${octave}`, 1);
        break
      case 'e': case 'd': case 'c':
        synth.triggerAttackRelease([`D${octave}, F${octave}, A${octave}`], 1);
        break
      case 'r': case 'f': case 'v':
        synth.triggerAttackRelease(`Db${octave}`, 1);
        break
      case 't': case 'g': case 'b':
        synth.triggerAttackRelease([`E${octave}, G${octave}, B${octave}`], 1);
        break
      case 'y': case 'h': case 'n':
        synth.triggerAttackRelease([`F${octave}, A${octave}, C${octave}`], 1);
        break
      case 'u': case 'j': case ',':
        synth.triggerAttackRelease(`Fb${octave}`, 1);
        break
      case 'i': case 'k': case ';':
        synth.triggerAttackRelease([`G${octave}, B${octave}, D${octave}`], 1);
        break
      case 'o': case 'l': case ':':
        synth.triggerAttackRelease(`Gb${octave}`, 1);
        break
      case 'p': case 'm': case '=':
        synth.triggerAttackRelease([`A${octave}, C${octave}, E${octave}`], 1);
        break
      case 'ù':
        synth.triggerAttackRelease(`Ab${octave}`, 1);
        break
      case '$': case '`':
        synth.triggerAttackRelease([`B${octave}, D${octave}, E${octave}`], 1);
        break
    }
  }
})

start.addEventListener('click', () => {
  document.getElementById('tutoBox').classList.add('fadeinDown');
  document.getElementById('textbox').classList.add('fadeinUp');
  range.classList.add('fadeinUp');
  document.getElementById('buttons').classList.add('fadeinUp');
})
const changeColor = document.createElement('button')
changeColor.type = 'button'
changeColor.innerHTML = 'Randomise color'
changeColor.className = 'changeColor'

buttons.append(changeColor)

function randomizeColor() {
  hue = (Math.random() * 360);
  document.documentElement.style
  .setProperty('--background', "hsl(" + hue + ", 100%, 83%)");
  document.documentElement.style
  .setProperty('--pink', "hsl(" + hue + ", 100%, 95%)");
  document.documentElement.style
  .setProperty('--light-pink', "hsl(" + hue + ", 100%, 97%)");
  document.documentElement.style
  .setProperty('--dark-pink', "hsl(" + hue + ", 82%, 87%)");
  document.documentElement.style
  .setProperty('--pink-border', "hsl(" + hue + ", 22%, 61%)");
  document.documentElement.style
  .setProperty('--pink-shadow', "hsl(" + hue + ", 100%, 94%)");
  /*document.documentElement.style
  .setProperty('--text-shadow', "hsl(" + ((hue + 180) % 360) + ", 11%, 50%)");*/
  console.log(hue);
}

randomizeColor()
changeColor.addEventListener('click', randomizeColor);
// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.

function sendToServer() {
  const dest = actx.createMediaStreamDestination();
  const recorder = new MediaRecorder(dest.stream);
  synth.connect(dest);

  var file = soundFile.getBlob
  var title = 'SoundFile'

  const formData = new FormData()
  formData.append('title', title)
  formData.append('experiment', file, 'soundFile.wav')

  fetch('http://localhost:3001/experiment', {
    method: 'POST',
    body: formData,
  }).then(res => console.log(res.text))
}

sendToServer()




