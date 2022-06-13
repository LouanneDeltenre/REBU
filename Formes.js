
//=============VARIABLES=================
  let canvas;

  let perception_entreprise;
  let abstraction_sensation;
  let logique_affectif;
  let introversion_extraversion;

  let Full_T = false;
  let Full_F = false;
  let MID_TF = false;
  
  let Full_E = false;
  let Full_I = false;

  let AS;
  let PE;
  let LA;
  let IE;


//============SYSTEM-SETUP=================


function setup(){
   canvas = createCanvas(1920,1000);
   colorMode(HSB, 360,100,100);

   perception_entreprise = createSlider(0, 100, 50);
   perception_entreprise.position(10, 10);

   abstraction_sensation = createSlider(0, 100, 50);
   abstraction_sensation.position(10, 30);

   logique_affectif = createSlider(0, 100, 50);
   logique_affectif.position(10, 50);

   introversion_extraversion = createSlider(-50, 300, 50);
   introversion_extraversion.position(10, 70);

   
  }

//============SYSTEM-REALTIME=================

function draw(){
  
  checker();

    PE = perception_entreprise.value();
    AS = abstraction_sensation.value();
    LA = logique_affectif.value();
    IE = introversion_extraversion.value();
  //===LERP=== 

  traitsNames.forEach(function(trait){
    if(window.traits[trait].transitionStart > 0){
      var lerpAmount = (frameCount - window.traits[trait].transitionStart) / 120.0;
    }
    });

  //===VARIABLES=== 


//============SYSTEM-MODULAR=================
  
  background(0,0,0); //canvas
   strokeJoin(BEVEL);
   strokeCap(SQUARE);

//======SHAPE1======
    User1(AS,IE,PE);
//======SHAPE2======
   User2(AS,IE,PE);
//======SHAPE3======
   User3(AS,IE,PE);
}

//================MODULES===================

let A1;
let A2;
let A3;

console.log(AS);

let B1;
let B2;
let B3;

let C1;
let C2;
let C3;


function User1(A1,A2,A3){
  blob(A1, A2, 2);
  filtre(A3);
  T_OR_F();
}

function User2(B1,B2,B3){
  blob(B1, B2, 2);
  filtre(B3);
  T_OR_F();
}

function User3(C1,C2,C3){
  blob(C1, C2, 2);
  filtre(C3);
  T_OR_F();
}


//===SHAPE-SHIFTER===

function checker(){

  if(window.traits.introversion.total > 0){


    let intro = lerpedTrait(window.traits.introversion) * 100

  }

  if(window.traits.perception.total > 0){
    let percept = lerpedTrait(window.traits.perception) +3
  }

   if(window.traits.extraversion.total > 0){
    let intro = lerpedTrait(window.traits.extraversion) * -80
  }
  


}

//===LERPING-FUNCTION===
  
  function lerpedTrait(trait){
    var amount = (frameCount - trait.transitionStart) / 120.0;
    if(amount > 1) amount = 1;

    return amount * (trait.total - trait.oldtotal) + trait.oldtotal;
  }

//================MODIFIERS===================

  function filtre(nmb){
    drawingContext.filter = 'blur('+nmb+'px)' //old school notation
    // drawingContext.filter = `blur(${maVariable}px)`;  //new school notation
  }

// ===========LIBRAIRIE DE DEGRADE=============

function T_OR_F(){

  if (Full_T == true) {
    if (Full_E == true) {
      noStroke();
      fill();
      conicGradientFill();
    }
     if (Full_I == true) {
      noFill();
      stroke();
      strokeWeight();
      conicGradientStroke(); 
    }
    else{
      noStroke();
      fill(25);
    }
  }

//==

  else if (MID_TF == true) {
    if (Full_E == true) {
      noStroke();
      fill();
      linearGradientFill();
    }
     if (Full_I == true) {

      noFill();
      stroke();
      strokeWeight();
      linearGradientStroke();
    }
    else{
      noStroke();
      fill(25);
    }
  }

//==

    else if (Full_F == true) {
      if (Full_E == true) {
      noStroke();
      fill();
      radialGradientFill();
    }
     if (Full_I == true) {

      noFill();
      stroke();
      strokeWeight();
      radialGradientStroke();
    }
    else{
      noStroke();
      fill(25);
    }
//==

    if (Full_T == false) {
      noStroke();
      fill(25);
    }
    if (Full_F == false) {
      noStroke();
      fill(25);
    }
    if (MID_TF == false) {
      noStroke();
      fill(25);
    }

  }
}

function ConicGradient_Stroke(){
  conicGradientStroke(
    0, width/2, height/2,
    [
      color(190,100,100,100),
      color(100,100,100,100),
      color(10,100,100,100),
      color(280,100,100,100)
    ]
    );
}

function ConicGradient_Stroke(){
   conicGradientFill(
    0, width/2, height/2,
    [
      color(190,100,100,100),
      color(100,100,100,100),
      color(10,100,100,100),
      color(280,100,100,100)
    ]
    )
}



function Gradient_Fill(){
  radialGradientFill(
      width/2-40, height/2-120, 0,
      width/2-40, height/2-120, 380,
      color(lerp(180,290,frameCount * 0.00001),100,100,100),
      color(lerp(320,200,frameCount * 0.00001),100,100,100));
}

function Gradient_Stroke(){
  radialGradientStroke(
      width/2-40, height/2-120, 0,
      width/2-40, height/2-120, 380,
      color(lerp(50,100,frameCount * 0.00001),100,100,100),
      color(lerp(200,360,frameCount *0.00001),100,100,100));
}

function linear_Stroke(){
  linearGradientStroke(
      width/2-40, height/2-120, 0,
      width/2-40, height/2-120, 380,
      color(lerp(50,100,frameCount * 0.00001),100,100,100),
      color(lerp(200,360,frameCount *0.00001),100,100,100));
}

function linear_Fill(){
  linearGradientStroke(
      width/2-40, height/2-120, 0,
      width/2-40, height/2-120, 380,
      color(lerp(50,100,frameCount * 0.00001),100,100,100),
      color(lerp(200,360,frameCount *0.00001),100,100,100));
}


//***LINEAR***

function linearGradientStroke(sX, sY, eX, eY, colorS, colorE)
{

   // direction du dégradé 
   let gradient = drawingContext.createLinearGradient(
      sX, sY, eX, eY
      );

   // Setup des couleurs
      gradient.addColorStop(0,colorS); //Rose
      gradient.addColorStop(1,colorE); //Bleu

   //drawingContext.strokeStyle = gradient;
     drawingContext.strokeStyle = gradient;
   
}

function linearGradientFill(sX, sY, eX, eY, colorS, colorE)
{

   // direction du dégradé 
   let gradient = drawingContext.createLinearGradient(
      sX, sY, eX, eY
      );

   // Setup des couleurs
      gradient.addColorStop(0,colorS); //Rose
      gradient.addColorStop(1,colorE); //Bleu

   //drawingContext.strokeStyle = gradient;
     drawingContext.strokeStyle = gradient;
   
}

//***RADIAL***

function radialGradientFill(sX, sY, sR, eX, eY, eR, colorS, colorE)
{

  // direction du dégradé 
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
    );

  // Setup des couleurs
    gradient.addColorStop(0,colorS); //Rose
    gradient.addColorStop(1,colorE); //Bleu

  //drawingContext.strokeStyle = gradient;
  drawingContext.fillStyle = gradient;
 

}

function radialGradientStroke(sX, sY, sR, eX, eY, eR, colorS, colorE)
{

  // direction du dégradé 
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
    );

  // Setup des couleurs
    gradient.addColorStop(0,colorS); //Rose
    gradient.addColorStop(1,colorE); //Bleu

  //drawingContext.strokeStyle = gradient;
  drawingContext.strokeStyle = gradient;
 
  
}

//***CONIC***

function conicGradientStroke(sA, sX, sY, colors){
  let gradient = drawingContext.createConicGradient(
    sA, sX, sY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[0]);

  drawingContext.strokeStyle = gradient;
  
}

function conicGradientFill(sA, sX, sY, colors){
  let gradient = drawingContext.createConicGradient(
    sA, sX, sY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[0]);

  drawingContext.fillStyle = gradient;
  
}

//***FADING***

function fadingGradient(){
   radialGradient(
    1200, 350, 0,//Start pX, pY, start circle radius
    1200, 250, 350,//End pX, pY, End circle radius
    color(300,80,200,100),
   color(0,0,0,0)
  );
   ellipse(width/2, height/2, 400, 400);

}


//=========EFFECT==========

function filler(){
  var img = new Image();
  img.src = '1.png';
  var ptrn = drawingContext.createPattern(img, 'repeat');
  drawingContext.fillStyle
}

//______________________________________________________________
// LIBRAIRIE DE FORMES
//______________________________________________________________


// P: changer le nombre de points
// 

function blob(P,c1,c2){

  let x = width/4 + 300 ;
  let y = height/4 + 60 ;

   points = P;
   courbature = c1 * (c2 - width/2) / width;
   courbatraste = 0;
  
  beginShape();
      
   for(let i = 0 ; i < points+3 ; i++){

    // le point précédent
    let prevAngle = TWO_PI / points * (i-1) ;

    var prevR = lerp(300, 180, noise(cos(prevAngle)+1, sin(prevAngle)+1, frameCount * 0.01));
    let prevAnchor = createVector(R * cos(prevAngle) + x, R * sin(prevAngle) + y);



    // le point actuel
    
    let angle = TWO_PI / points * i ;

    var R = lerp(100, 180, noise(cos(angle)+1, sin(angle)+1, frameCount * 0.01));

    let px = R * cos(angle) + x;
    let py = R * sin(angle) + y;

    let vectAnchor = createVector(px,py);


    if(i==0){
      vertex(vectAnchor.x, vectAnchor.y);
    }
    else{
      //let zeangle = PI * (mouseY/height) ;
      //console.log(zeangle);

      let vectCourbature = p5.Vector.add( vectAnchor , p5.Vector.fromAngle(angle, courbature) );
      let vectPrevcourbature = p5.Vector.add( prevAnchor , p5.Vector.fromAngle(prevAngle, courbature) );

      bezierVertex(
          vectPrevcourbature.x, vectPrevcourbature.y, 
          vectCourbature.x, vectCourbature.y, 
          

          vectAnchor.x, vectAnchor.y
        );


        // push();
        // strokeWeight(5);
        // stroke(255,255,255);
        // line(vectCourbature.x, vectCourbature.y, vectAnchor.x, vectAnchor.y);
        // line(vectPrevcourbature.x, vectPrevcourbature.y, prevAnchor.x, prevAnchor.y);
        // pop();
    }
   }

   endShape();
}

function blob2(P,c1,c2){


 let x = width/2 + 2;
 let y = height/2;

   points = P;
   courbature = c1 * (c2 - width/2) / width;
   courbatraste = 0;
  
  beginShape();
      
   for(let i = 0 ; i < points+3 ; i++){

    // le point précédent
    let prevAngle = TWO_PI / points * (i-1) ;

    var prevR = lerp(300, 180, noise(cos(prevAngle)+1, sin(prevAngle)+1, frameCount * 0.01));
    let prevAnchor = createVector(R * cos(prevAngle) + x, R * sin(prevAngle) + y);



    // le point actuel
    
    let angle = TWO_PI / points * i ;

    var R = lerp(310, 180, noise(cos(angle)+1, sin(angle)+1, frameCount * 0.006));

    let px = R * cos(angle) + x;
    let py = R * sin(angle) + y;

    let vectAnchor = createVector(px,py);


    if(i==0){
      vertex(vectAnchor.x, vectAnchor.y);
    }
    else{
      //let zeangle = PI * (mouseY/height) ;
      //console.log(zeangle);

      let vectCourbature = p5.Vector.add( vectAnchor , p5.Vector.fromAngle(angle, courbature) );
      let vectPrevcourbature = p5.Vector.add( prevAnchor , p5.Vector.fromAngle(prevAngle, courbature) );

      bezierVertex(
          vectPrevcourbature.x, vectPrevcourbature.y, 
          vectCourbature.x, vectCourbature.y, 
          

          vectAnchor.x, vectAnchor.y
        );


        // push();
        // strokeWeight(5);
        // stroke(255,255,255);
        // line(vectCourbature.x, vectCourbature.y, vectAnchor.x, vectAnchor.y);
        // line(vectPrevcourbature.x, vectPrevcourbature.y, prevAnchor.x, prevAnchor.y);
        // pop();
    }
   }

   endShape();
}

function blob3(P,c1,c2){
 let x = width/2 + 100;
  let y = height/2;

   points = P;
   courbature = c1 * (c2 - width/2) / width;
   courbatraste = 0;
  
  beginShape();
      
   for(let i = 0 ; i < points+3 ; i++){

    // le point précédent
    let prevAngle = TWO_PI / points * (i-1) ;

    var prevR = lerp(300, 180, noise(cos(prevAngle)+1, sin(prevAngle)+1, frameCount * 0.01));
    let prevAnchor = createVector(R * cos(prevAngle) + x, R * sin(prevAngle) + y);



    // le point actuel
    
    let angle = TWO_PI / points * i ;

    var R = lerp(100, 180, noise(cos(angle)+1, sin(angle)+1, frameCount * 0.01));

    let px = R * cos(angle) + x;
    let py = R * sin(angle) + y;

    let vectAnchor = createVector(px,py);


    if(i==0){
      vertex(vectAnchor.x, vectAnchor.y);
    }
    else{
      //let zeangle = PI * (mouseY/height) ;
      //console.log(zeangle);

      let vectCourbature = p5.Vector.add( vectAnchor , p5.Vector.fromAngle(angle, courbature) );
      let vectPrevcourbature = p5.Vector.add( prevAnchor , p5.Vector.fromAngle(prevAngle, courbature) );

      bezierVertex(
          vectPrevcourbature.x, vectPrevcourbature.y, 
          vectCourbature.x, vectCourbature.y, 
          

          vectAnchor.x, vectAnchor.y
        );


        // push();
        // strokeWeight(5);
        // stroke(255,255,255);
        // line(vectCourbature.x, vectCourbature.y, vectAnchor.x, vectAnchor.y);
        // line(vectPrevcourbature.x, vectPrevcourbature.y, prevAnchor.x, prevAnchor.y);
        // pop();
    }
   }

   endShape();
}