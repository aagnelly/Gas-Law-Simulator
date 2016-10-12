//textbox inputs/outputs


function loadSim(){

		var calcVolume = 0;
		var calcPressure=0;
		var calcMoles = 0;
		var calcTemp = 0;
}

//function to inactivate volume entry
	function volume(){
		calcPressure = 0;
		calcVolume=1;
		calcMoles=0;
		calcTemp = 0;
		document.getElementById("volume").readOnly = true;
		document.getElementById("pressure").readOnly = false;
		document.getElementById("moles").readOnly = false;
		document.getElementById("temperature").readOnly = false;
		document.getElementById("volume").style.color="gray";
		document.getElementById("pressure").style.color="black";
		document.getElementById("temperature").style.color="black";
		document.getElementById("moles").style.color="black";
		document.getElementById("volumebutton").style.backgroundColor="#aecbff";
		document.getElementById("pressurebutton").style.backgroundColor="#6666cc";
		document.getElementById("molebutton").style.backgroundColor="#6666cc";
		document.getElementById("tempbutton").style.backgroundColor="#6666cc";
	}
//function to inactivate pressure entry
	function pressure(){
		calcPressure = 1;
		calcVolume=0;
		calcMoles=0;
		calcTemp = 0;
		document.getElementById("volume").readOnly = false;
		document.getElementById("pressure").readOnly = true;
		document.getElementById("moles").readOnly = false;
		document.getElementById("temperature").readOnly = false;
		document.getElementById("volume").style.color="black";
		document.getElementById("pressure").style.color="gray";
		document.getElementById("temperature").style.color="black";
		document.getElementById("moles").style.color="black";
		document.getElementById("volumebutton").style.backgroundColor="#6666cc";
		document.getElementById("pressurebutton").style.backgroundColor="#aecbff";
		document.getElementById("molebutton").style.backgroundColor="#6666cc";
		document.getElementById("tempbutton").style.backgroundColor="#6666cc";
	}
//function to inactivate mole entry
	function moles(){
		calcMoles = 1;
		calcVolume=0;
		calcPressure=0;
		calcTemp = 0;
		document.getElementById("volume").readOnly = false;
		document.getElementById("pressure").readOnly = false;
		document.getElementById("moles").readOnly = true;
		document.getElementById("temperature").readOnly = false;
		document.getElementById("volume").style.color="black";
		document.getElementById("pressure").style.color="black";
		document.getElementById("temperature").style.color="black";
		document.getElementById("moles").style.color="gray";
		document.getElementById("volumebutton").style.backgroundColor="#6666cc";
		document.getElementById("pressurebutton").style.backgroundColor="#6666cc";
		document.getElementById("molebutton").style.backgroundColor="#aecbff";
		document.getElementById("tempbutton").style.backgroundColor="#6666cc";
	}
//function to inactivate temp entry
	function temperature(){
		calcTemp = 1;
		calcVolume =0;
		calcPressure =0;
		calcMoles = 0;
		document.getElementById("volume").readOnly = false;
		document.getElementById("pressure").readOnly = false;
		document.getElementById("moles").readOnly = false;
		document.getElementById("temperature").readOnly = true;
		document.getElementById("volume").style.color="black";
		document.getElementById("pressure").style.color="black";
		document.getElementById("temperature").style.color="gray";
		document.getElementById("moles").style.color="black";
		document.getElementById("volumebutton").style.backgroundColor="#6666cc";
		document.getElementById("pressurebutton").style.backgroundColor="#6666cc";
		document.getElementById("molebutton").style.backgroundColor="#6666cc";
		document.getElementById("tempbutton").style.backgroundColor="#aecbff";
	}
	
function calculateGasVariables(){
	var volume = document.getElementById('volume').value;
	var moles = document.getElementById('moles').value;
	var temperature = document.getElementById('temperature').value;
	var pressure = document.getElementById('pressure').value;

	if(calcPressure == 1){
		pressure = (0.0821 * moles * temperature)/volume;
		document.getElementById('pressure').value= pressure.toFixed(2); 
	}
	else if(calcVolume == 1){
		volume = (0.0821 * moles * temperature)/pressure;
		document.getElementById('volume').value = volume.toFixed(1);
		}
	else if (calcMoles ==1){	
		moles = (pressure * volume)/(0.0821 * temperature);
		document.getElementById('moles').value= moles.toFixed(1);
	}
	else if (calcTemp ==1){
		temperature = (pressure * volume)/(0.0821 * moles);
		document.getElementById('temperature').value = temperature.toFixed(0); 
		}
	}//end calculateGasVariables function

function reset(){

		calcVolume = 0;
		calcPressure=0;
		calcMoles =0;
		calcTemp = 0;
		document.getElementById('volume').value = 22.4;
		document.getElementById('pressure').value = 1.00;
		document.getElementById('moles').value = 1.0;
		document.getElementById('temperature').value = 273;
		document.getElementById("volume").readOnly = false;
		document.getElementById("pressure").readOnly = false;
		document.getElementById("moles").readOnly = false;
		document.getElementById("temperature").readOnly = false;
		document.getElementById("volume").style.color="black";
		document.getElementById("pressure").style.color="black";
		document.getElementById("temperature").style.color="black";
		document.getElementById("moles").style.color="black";
}	
 
function startSim(){ 

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
 
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
 
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
}());



(function() {
  var SCREEN_WIDTH = 250;
  var SCREEN_HEIGHT = 450;

  var RADIUS = 110;

  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 1.5;

  var quantity = (document.getElementById('moles').value * 40);
  
  var temp = (document.getElementById('temperature').value);

  	var vol = document.getElementById('volume').value;
	var containerHeight = (450 * (vol/44.8));
	var containerTop= 450 - containerHeight;
	var pistonHeight = (containerTop - 20);
  	
  var canvas;
  var context;
  var particles =[];

  var mouseX = (window.innerWidth - SCREEN_WIDTH);
  var mouseY = (window.innerHeight - SCREEN_HEIGHT);

  var targetX = 0;
  var targetY = 0;

  var PARTICLE_SIZE = 7;
  

  function init(){
    canvas = document.getElementById('world');

    if(canvas && canvas.getContext) {
      context = canvas.getContext('2d');
      
	  context.globalCompositeOperation = 'destination-over';
	  
	  canvas.height= '450';
	  canvas.width='250';

	  createParticles();
      loop();
    }
  }
  
  function createParticles(){


    var depth = 0;


    for (var i = 0; i < quantity; i++) {
	  var posX = PARTICLE_SIZE/2 + Math.random() * (canvas.width - PARTICLE_SIZE/2);
      var posY = PARTICLE_SIZE/2 + ((Math.random() * 450-PARTICLE_SIZE) + (containerTop - PARTICLE_SIZE/2));
	  
	  
      var speed = temp/90;
      var directionX = -speed + (Math.random() * speed*2);
      var directionY = -speed + (Math.random()* speed*2);

      var particle = {
        position: { x: posX, y: posY },
        size: PARTICLE_SIZE,
        directionX: directionX,
        directionY: directionY,
        speed: speed,
        targetX: posX,
        targetY: posY,
        depth: depth,
        index:i,
        fillColor: '#fcb647',
      };

      particles.push( particle );
    }
  }

  
  function loop(){	

	context.clearRect(0, 0, 250, 450);
    context.fillStyle = 'black';
	context.fillRect(0, containerTop, context.canvas.width, containerHeight);

	context.fillStyle='#6fbbe8';
	context.fillRect(0, pistonHeight, 305, 20);

    var z = 0;
    var xdist = 0;
    var ydist = 0;
    var dist = 0;

    for (var i=0; i < particles.length; i++){

      var particle = particles[i];

      var lp = { x: particle.position.x, y: particle.position.y };

      if(particle.position.x <=particle.size/2 || particle.position.x >= SCREEN_WIDTH - PARTICLE_SIZE/2){
        particle.directionX *= -1;
      }
/*       if(particle.position.y <=particle.size/2 || particle.position.y <= containerTop - PARTICLE_SIZE/2){
        particle.directionY *= -1; */
	    if(particle.position.y <=containerTop + PARTICLE_SIZE/2 || particle.position.y >= canvas.height - PARTICLE_SIZE/2){
        particle.directionY *= -1;
      }	  


      for(var s=0; s < particles.length; s++) {
        var bounceParticle = particles[s];
          if(bounceParticle.index != particle.index) {
            //what are the distances
            z = PARTICLE_SIZE;
            xdist = Math.abs(bounceParticle.position.x - particle.position.x);
            ydist = Math.abs(bounceParticle.position.y - particle.position.y);
            dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
            if(dist < z) {
              randomiseDirection(particle);
              randomiseDirection(bounceParticle);
            }
          }
        }

        particle.position.x -= particle.directionX;
        particle.position.y -= particle.directionY;

        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.lineWidth = particle.size;
        context.moveTo(lp.x, lp.y);
        context.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
    }
    
    requestAnimationFrame(loop);
  }

  function randomiseDirection (particle) {

    //pick a random deg
    var d = 0;
    while((d == 0) || (d == 90) || (d == 180) || (d == 360)) {
      d = Math.floor(Math.random() * 360);
    }

    var r = (d * 180)/Math.PI;
    particle.directionX = Math.sin(r) * particle.speed;
    particle.directionY = Math.cos(r) * particle.speed;

  }
/*
  function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
  }
*/
  init();

}())
}
