class Creature{

	constructor(){//research overloading ro make several versions
		this.location = randomLocation();
		this.checkEdges();
		this.radius = info.creatureRadius;//should be set in sub classes
		this.genes = new Genetics(info.defaultGenes);
		this.velocity = new Vector(0,0);
		this.acceleration  = new Vector(0,0);
		this.desired = new Vector(0,0);
		this.numFood = parseInt(0);

		//gen loc
		//none
		this.counterTilDeath = this.genes.timeTilDeath;
		this.counterTilFoodNeeded = this.genes.timeTilFoodNeeded;
		this.counterTilEggLayed = this.genes.timeTilEggLayed;
		this.newDirection()
	}
	update(){
		currentMoab = this;//debugging
		this.tick();
		this.calcDesired();
		this.move();

	}
	calcDesired(){
		if(this.genes.sightDistance > 0){
			this.runAway();//rename
			if(this.isHungry()){
				this.lookForFood();
			}
		}
	}
	move(){
		this.velocity.add(this.acceleration);
		if(isNaN(this.velocity.x)){
			throw "NaN in creature move. this.velocity.add acceleration";
		}
		this.velocity.limitMag(this.genes.topSpeed);
		if(isNaN(this.velocity.x)){
			throw "NaN in creature move. this.velocity.limitMag";
		}
		this.location.add(this.velocity);
		this.acceleration.mult(0);//set(0,0); ??change?
		this.checkEdges();//add other collision dedection
	}
	applyForce(force){//Vector
		this.acceleration.add(force);
	}
	runAway(){
		let returnedPredators = sim.field.getPredNear(this.location);//change to actually work
		for(let pred of returnedPredators){
			let distance = dist(this.location,pred.location);//look at or change dist method
			if(distance <= this.sightDistance){
				this.flee(pred.location);
			}
		}
	}
	steer(target){
		let desired = new Vector(this.location.x,this.location.y);
		desired.sub(target);
		desired.normalize();//write normalize method in Vector. set mag 1
		desired.mult(this.genes.topSpeed);
		desired.sub(this.velocity);
		desired.mult(-1);//moabs were avoiding food. this should point them in the right direction
		desired.limitMag(this.maxForce);//make variable for max force able to be applied

		return desired;
	}
	flee(target){
		this.applyForce(this.steer(target).mult(-1));
	}
	seek(target){
		this.applyForce(this.steer(target));
	}
	lookForFood(){
		let closest = this.closestFood();
		if(closest != null && this.distanceFrom(closest) <= this.genes.sightDistance){
			this.seek(closest);
		}
	}
	closestFood(){
		let minDistance = this.genes.sightDistance;
		let nearFoods = this.getFoodNear();
		if(nearFoods.length <= 0){//is it size or length?
			return null;//return ir nearfoods == null?
		}

		let closest = nearFoods[0].location;//should it be nearfoods[0]
		for(let food of nearFoods){
			let distance = dist(this.location,food.location);
			if(distance < minDistance){//benifits to <= //
				minDistance = distance;
				closest = food.location;
			}
		}
		return closest;
	}
	getFoodNear(){//should be implemented and called be children of creature class
	 	throw 'getFoodNear called in creature class';
	}

	distanceFrom(point){//used to be fooddistance //not sure is actally used probably should be
		return Math.abs(dist(this.location,point))
	}

	ateFood(massAmount){
		this.numFood += massAmount;
		this.counterTilFoodNeeded = this.genes.timeTilFoodNeeded;//not actuall countername
	}

	isHungry(){
		return ((this.numFood - info.maxCreatureFood) < 0);
	}

	tick(){
		//reduce counters for
		this.counterTilDeath -= 1;
		this.counterTilEggLayed -=1;
		this.counterTilFoodNeeded -=1;
		//possible put checks into their own methods checkEggLay, checkFoodAmount, checkLifeTime
		if(this.counterTilEggLayed <= 0 && this.numFood >= 1){//not actual counter name //maybe 1 => 2 so dosent stare because of child
			this.layEgg();
			this.counterTilEggLayed = this.genes.timeTilEggLayed;
		}
		if(this.counterTilFoodNeeded <= 0){
			if(this.numFood<1){
				this.counterTilDeath = 0;
			}
			this.numFood--;
			reportMassLoss(1);
		}
		if(this.counterTilDeath <= 0){
			//sim.field.moabs.remove(this);
			if(!info.immortal){
				sim.field.foods.push(new Food(new Vector(this.location.x,this.location.y)));
				reportMassLoss(this.massValue() - 1);
				if(this.genes.isPredator){
					remove(sim.field.predators, this);
				}else{
					remove(sim.field.moabs, this);
				}
			}
			//kill //see comment above
		}
	}

	layEgg(){
		this.numFood--;
		let location = new Vector(this.location.x,this.location.y);
		sim.field.eggs.push(new Egg(location, this.genes));//add bool for carnivor into genetics?
		//instead of making temp egg add the new egg to where all eggs are stored // holding array that is added to quad tree at reconstruction
	}

	massValue(){//was called foodValue // changed to possible account for reporting lossed mass at death
		return (this.numFood + 1);
	}

	checkEdges(){//stop and turn at edge of "map"
		//not using width becase not sure how map will be layed out
		if(this.location.x > info.rightWall - this.radius){
			this.location.x = info.rightWall - this.radius;
			this.velocity.x *= -1;
		} else if(this.location.x < info.leftWall){
			this.location.x = info.leftWall;
			this.velocity.x *= -1;
		}
		if (this.location.y > info.ceiling - this.radius){
			this.location.y = info.ceiling - this.radius;
			this.velocity.y *= -1;
		} else if(this.location.y < info.floor){
			this.location.y = info.floor;
			this.velocity.y *= -1;
		}
	}

	newDirection(){//should be irrelivant once i implemnet a better wandering logic
		this.velocity = randomVector();
		this.velocity.normalize();
		this.velocity.mult(this.genes.topSpeed);//maybe dont use top speed
	}
}
