
//=============VARIABLES=================
  let canvas;

  let perception_entreprise;
  let abstraction_sensation;
  let logique_affectif;
  let introversion_extraversion;

  let Full_T = false;
  let Full_F = false;

  
  let Full_E = false;
  let Full_I = false;




//============SYSTEM-SETUP=================


function setup(){
   canvas = createCanvas(1920,1080);
   colorMode(HSB, 360,100,100);

   perception_entreprise = createSlider(0, 100, 0);
   perception_entreprise.position(10, 10);

   abstraction_sensation = createSlider(0, 100, 00);
   abstraction_sensation.position(10, 30);

   logique_affectif = createSlider(1, 3, 2);
   logique_affectif.position(10, 50);

   introversion_extraversion = createSlider(-50, 300, 200);
   introversion_extraversion.position(10, 70);
   
  }

//============DRAW-DRAW-DRAW=================

let dataForUser1 = false; 
let dataForUser2 = false; 
let dataForUser3 = false; 

function draw(){
  	checker();
	
    let PE = perception_entreprise.value();
    let AS = abstraction_sensation.value();
    let LA = logique_affectif.value();
    let IE = introversion_extraversion.value();
  //===LERP=== 
	
  traitsNames.forEach(function(trait){
    if(window.traits[trait].transitionStart > 0){
			window.traits[trait].total += (window.traits[trait].oldtotal - window.traits[trait].total)/10 ;
      //var lerpAmount = (frameCount - window.traits[trait].transitionStart) / 120.0;
    }
  });
	  //===VARIABLES=== 


//============SYSTEM-MODULAR=================
  
  background(0,0,0); //canvas
   strokeJoin(BEVEL);
   strokeCap(SQUARE);
	
	//======SHAPE1======
	if (window.currentQuestion > -1) {
		if(dataForUser1 == false){
			User1(AS,IE,PE,);
		}else{
			User1(dataForUser1[0],dataForUser1[1],dataForUser1[2]);
		}
	}
	
	//======SHAPE2=====
	if (window.currentQuestion > 6) {
		if(dataForUser1 == false){
			dataForUser1 = [AS,IE,PE];
		}
		if(dataForUser2 == false){
			User2(AS,IE,PE);
		}else{
			User2(dataForUser2[0],dataForUser2[1],dataForUser2[2]);
		}
	}
	
	//======SHAPE3======*
	if (window.currentQuestion > 8) {
		if(dataForUser2 == false){
			dataForUser2 = [AS,IE,PE];
		}
   if(dataForUser3 == false){
			User3(AS,IE,PE);
		}else{
			User3(dataForUser3[0],dataForUser3[1],dataForUser3[2]);
		}
	}
}

//================MODULES===================

		coulour();
function User1(A1,A2,A3,A4){ 
   	coulour(A4);
		filtre(A3);
    blob(A1, A2, 2);
	 	
    
}
  coulour();
 function User2(B1,B2,B3, B4){
  coulour(B4);
  filtre(B3);
	 blob2(B1, B2, 2);
  
}
	coulour();
function User3(C1,C2,C3,C4){
 	coulour(C4);
  filtre(C3);
	blob3(C1, C2, 2);
  
}


//===SHAPE-SHIFTER===

function checker(){
	
	if(logique_affectif.value() == 1){
		Full_F=false;
		Full_T= true;
		console.log(Full_T);
	}
	if(logique_affectif.value() == 3){
		Full_F= true;
		Full_T = false;
		console.log(Full_F);
	}
	
	
  if(window.traits.extraversion.total > 0){
			
     	introversion_extraversion.value(window.traits.extraversion.total + 200); 
			console.log(Full_E,Full_I);
		if (window.currentQuestion > -1) {
		if(introversion_extraversion.value()< 300){Full_E = true}
		if(introversion_extraversion.value()> 150){Full_I = true}
		}
		if (window.currentQuestion > 6) {
		if(introversion_extraversion.value()< 600){Full_E = true}
		if(introversion_extraversion.value()> 300){Full_I = true}
		}
		
  }
  if(window.traits.introversion.total > 0){
			
     	introversion_extraversion.value(- window.traits.introversion.total + 200); 
			console.log(Full_E,Full_I);
		if (window.currentQuestion > -1) {
		if(introversion_extraversion.value()< 300){Full_E = true}
		if(introversion_extraversion.value()> 150){Full_I = true}
		}
		if (window.currentQuestion > 6) {
		if(introversion_extraversion.value()> 600){Full_E = true}
		if(introversion_extraversion.value()> 300){Full_I = true}
		}
		
  }	
	

  if(window.traits.perception.total > 0){
   perception_entreprise.value(window.traits.perception.total + 20);
  }
  if(window.traits.entreprise.total > 0){
   perception_entreprise.value(-window.traits.entreprise.total - 10);
  }
  if(window.traits.abstraction.total > 0){
   abstraction_sensation.value(window.traits.abstraction.total + 20);
  }
  if(window.traits.sensation.total > 0){
   abstraction_sensation.value(window.traits.sensation.total + 7);
  }
	if(window.traits.logique.total > 0){
   logique_affectif.value(window.traits.logique.total);
		 
		 
  }
  
 


// lerpedTrait(window.traits.perception) +3
   


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


function coulour(C4){
		C4 = Full_F,Full_T;
 
    if (Full_F == true) {
    Full_T = false;
		noFill();
    stroke(25);
    strokeWeight(10);
    radialGradientStroke(
        width/2-40, height/2-10, 0,
        width/2-40, height/2-10, 380,
        color(lerp(0,300,frameCount * 0.0001),lerp(150,300,frameCount * 0.001),100,100),
        color(lerp(0,150,frameCount *0.0001),lerp(150,300,frameCount * 0.001),100,100));
    }
   
	if( Full_T == true){
		Full_T = true;
		noStroke();
    fill(25);
		linearGradientFill(
         width/2, 200,//Start pX, pY, start circle radius
    width/2, height-200,//End pX, pY, End circle radius
    color(lerp(0,300,frameCount * 0.0001), lerp(150,300,frameCount * 0.001), 100, 100), //Start color
    color(lerp(0,300,frameCount * 0.0001), lerp(150,300,frameCount * 0.001), 100)); //End color
			
	}
      

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
     drawingContext.fillStyle = gradient;
   
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
      
   for(let i = 0 ; i < points+1 ; i++){

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


 let x = width/2;
 let y = height/2 - 50;

   points = P;
   courbature = c1 * (c2 - width/2) / width;
   courbatraste = 0;
  
  beginShape();
      
   for(let i = 0 ; i < points+1 ; i++){

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
  let y = height/2 + 150;

   points = P;
   courbature = c1 * (c2 - width/2) / width;
   courbatraste = 0;
  
  beginShape();
      
   for(let i = 0 ; i < points+1 ; i++){

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