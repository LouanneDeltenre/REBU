let polySynth;


let attackTime = 0;
let decayTime = 0.6;
let sustain = 0.2;
let releaseTime = 0;
let adsr;
let volume;
let gain;

let reverb;
let reverbSlider;
let bpmSlider;

const notes = [
  ['G3'],['G4'],['D4'],['G3'],[],['D4'],['G3'],['D4'],[],['G4','A#3'],['D4'],
  [],['A3'],['G4'],['D4'],['A3'],[],['D4'],['A3'],['D4'],[], ['J4','J3'], 
  ['D4'],[],['G3'],['F4'],[],['D4'],['G3'],['G4'],['D4'],['G3'],[],['D4'],
  ['G3'],['D4'],['G4','A#3'],['D4'],[],['A3'],['G4'],[],['A3'],[],
  ['D4'],['A3'],['D4'],[],['G4','G3'],[],[],['G3'],['F4'],[],['D4']
];
var index = 0;
let refTime = 0;
let soundInit = false;
let startBtn;



var audioSUper = function( sketch ) {
  sketch.setup = function() {
    startBtn = sketch.createButton('click me');
    startBtn.position(sketch.windowWidth/2, sketch.windowHeight/2);
    startBtn.mousePressed(initSound);
  }
  sketch.draw = function() {
     if(!soundInit)return;

    attackTime = adsr.value()/100;
    releaseTime = adsr.value()/100;

    if(sketch.millis() - refTime >=  bpmSlider.value()){
      playSynth();
      refTime = millis();
    }
  }

  function initSound(){
    startBtn.elt.parentElement.removeChild(startBtn.elt);
    polySynth = new p5.PolySynth();
    reverb = new p5.Reverb();
    
    gain = new p5.Gain();
    
    polySynth.disconnect();
    reverb.disconnect();
    polySynth.connect(reverb);
    gain.setInput(reverb);
    gain.connect();
    
    adsr = sketch.createSlider(0, 100, 50);
    adsr.position(10, 110);
    
    volume = sketch.createSlider(0, 100, 50);
    volume.position(10, 130);
    
    reverbSlider = sketch.createSlider(0, 10, 5);
    reverbSlider.position(10, 150);
    
    bpmSlider = sketch.createSlider(500, 2000, 1250);
    bpmSlider.position(10, 170);  
    soundInit = true;
  }


  function playSynth() {
    
    
    if(notes[index].length > 0){
      sketch.userStartAudio();
      // note velocity (volume, from 0 to 1)
      let velocity = 1;
      // time from now (in seconds)
      let time = 0;
      // note duration (in seconds)
      let dur = 1/2;

      reverb.set(10- reverbSlider.value(), 2, false);
      gain.amp(volume.value()/100);
      polySynth.setADSR(attackTime, decayTime, sustain, releaseTime);

      
      for(var i=0; i<notes[index].length; i++){
        polySynth.play(notes[index][i], velocity, time, dur);
      }
    }
    
    index = (index + 1) % notes.length;
  }
};

new p5(audioSUper);