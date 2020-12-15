function clear(){
	g.fillStyle = 'black';
	g.fillRect(info.leftWall,info.floor,(info.rightWall - info.leftWall),(info.ceiling - info.floor));
}

function circle(x,y,r){//x,y of center not corner. set desired fillstyle before calling method
	g.beginPath();
	g.arc(x,y,r,Math.PI*2,0,true);
	g.fill();
}

function setColor(s){
	g.fillStyle = s;
}

function remove(array, element){//removes an element from an array
	const index = array.indexOf(element);
	if(index !== -1){
		array.splice(index, 1);
	}
}

function dist(p1,p2){
	let a = p1.x - p2.x;
	let b = p1.y - p2.y;
	return Math.sqrt(a*a + b*b);
}


function rand(min,max){
  return Math.random() * (max - min) + min;
}

function randomLocation(){
	return new Vector(rand(info.leftWall,info.rightWall),rand(info.floor,info.ceiling));
}

function displayAll(arr){
	//fill = arr[0].color;//should all be the same
	for(let el of arr){
		setColor(el.color);//sets color etc.
		circle(el.location.x,el.location.y,el.radius);
	}
}

let massLoss = 0;
function reportMassLoss(x){
	massLoss += x;
}

function spawnFood(){
	while(massLoss > 0){
		sim.field.foods.push(new Food());
		massLoss--;
	}
}

function setDefaultGenes(){
	info.defaultGenes = [
	info.timeTilHatch,
	info.timeTilEggLayed,
	info.timeTilFoodNeeded,
	info.timeTilDeath,
	info.sightDistance,
	info.topSpeed,
	info.isPredator
	]
}
//printstats
//printtimes
//printhelp
//calcmass