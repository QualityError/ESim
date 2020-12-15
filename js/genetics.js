class Genetics{
	constructor(g){//support old array method
		//allow genetics to take an old array or a genetics object
		this.timeTilHatch;
		this.timeTilEggLayed;
		this.timeTilFoodNeeded;
		this.timeTilDeath;
		this.sightDistance;
		this.topSpeed;

		this.isPredator = false;//default

		this.timeTilHatch = g[0];
		this.timeTilEggLayed = g[1]; 
		this.timeTilFoodNeeded = g[2];
		this.timeTilDeath = g[3];
		this.sightDistance = g[4];
		this.topSpeed = g[5];
		if(this.topSpeed > info.maxCreatureSpeed){
			this.topSpeed = info.maxCreatureSpeed;
		}
	}
}