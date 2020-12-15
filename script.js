
console.log('script loaded');
g = ctx;
//g.fillRect(0,0,20,20);
//g.arc(200,300,)//x,y,radius,start angle,end angle, diriection(boolean)


let currentMoab;
let sim;
let loop = false;

function restart(){
	noLoop();//stops draw loop
	massLoss = 0;
	setDefaultGenes();
	startSim();	
}

function startSim(){
	g.fillStyle = 'red';
	sim = new ESim(g);
	loop = true;
	mainLoop();
}


function mainLoop(){

	sim.update();
	if(loop){
		drawLoop = window.requestAnimationFrame(mainLoop);
	}
}

function noLoop(){
	loop = false;
	if(drawLoop){
		window.cancelAnimationFrame(drawLoop);
		drawLop = undefined;
	}
}


var info = {//hold user set global variables
	//make class for multiple senarios running at once
	startingNumberFood: 20,
	startingNumberMoabs: 10,
	startingNumberPredators: 0,

	predatorColor: '#ff0000',
	moabColor: '#0000ff',
	eggColor: '#f0ead6',
	foodColor: '#00ff00',


	maxCreatureFood: 10,//10 ABB
	maxCreatureSpeed: 8,//20 ABB
	neededPredatorParts: 10,//10 ABB

	//make dimentions bigger once moving area is avaliable
	rightWall: 400,
	leftWall: 0,
	ceiling: 400,
	floor: 0,

	foodRadius: 4,
	creatureRadius: 10,//find origional value
	eggRadius: 4,

	predatorsOn: true,//if predators are allowed to form
	immortal: false,//does not prevent eaten death
	immortalMoabs: false,//testing
	immortalPredators: false,//testing

	recordData: false,//if save stats over time

	paused: false,
	//several bools for if different info was shown
	//stats help grid etc.
	dropFoodOnDeath: true,//if food is dropped on death
	foodSpreadOnDrop: true,//scatters food rather than all on one location

	//default genetics
	timeTilHatch: 45,
	timeTilEggLayed: 60,
	timeTilFoodNeeded: 50,
	timeTilDeath: 150,
	sightDistance: 0,
	topSpeed: 4,
	isPredator: false,
	
	defaultGenes: [45,60,50,150,0,4]
	
	// genesForNormal: new Genetics([45,60,50,150,0,4]),
	// genesForLines: new Genetics([1,1,50,150,0,4]),
	// genesForEggTrail: new Genetics([0,200,100,9000,40,4]),
	// genesForDelayedBursts: new Genetics([0,3000,1000,3000,100,8]),
}

//-------------------------------------------------------------
