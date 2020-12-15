class Egg{
	constructor(location,genetics){
		this.location = location;
		this.genes = genetics;
		this.counterTilHatch = this.genes.timeTilHatch;
		this.radius = info.eggRadius;
		this.color = info.eggColor;
		this.mutate();
	}
	mutate(){
		this.genes.timeTilHatch = this.aboveZero(this.genes.timeTilHatch + this.gauss());
		this.genes.timeTilEggLayed = this.aboveZero(this.genes.timeTilEggLayed + this.gauss());
		this.genes.timeTilFoodNeeded = this.atZero(this.genes.timeTilFoodNeeded + this.gauss());
		this.genes.timeTilDeath = this.atZero(this.genes.timeTilDeath + this.gauss()*2);
		this.genes.sightDistance = this.atZero(this.genes.sightDistance + this.gauss()*2);
		this.genes.topSpeed = this.speedRange(this.genes.topSpeed + parseInt(this.gauss()/2));

		if((!this.genes.isPredator) && Math.random < .01){//may need balancing
			this.genes.isPredator = true;
		}
	}
	
	speedRange(x){
		if(x > info.maxCreatureSpeed){
			return info.maxCreatureSpeed;
		}
		return this.atZero(x);
	}
	aboveZero(x){//makes value positive
		if(x < 0){
			x = 1
		}
		return x;
	}
	atZero(x){//makes value non negative
		if(x < 0){
			x = 0;
		}
		return x;
	}
	gauss(){
		let r = 0;
		r = Math.random();
		let x = 0;
	    if(r>=.98){
	      x += 3;
	    }else if(r>=.93){
	      x += 2;
	    }else if(r>=.65){
	      x += 1;
	    }else if(r>.35){
	      x += 0;
	    }else if(r>.07){
	      x -= 1;
	    }else if(r>.02){
	      x -= 2;
	    }else{
	      x -= 3;
	    }
	    return x;

	}
	update(){
		this.tick()
	}
	tick(){
		this.counterTilHatch -= 1;
		if(this.counterTilHatch < 1){
			this.hatch();
		}
	}
	hatch(){
		if(this.genes.isPredator){
			sim.field.predators.push(new Predator(this.location,this.genes));
		}else{
			sim.field.moabs.push(new Moab(this.location,this.genes));
		}
		remove(sim.field.eggs,this);
	}
}