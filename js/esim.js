class ESim{
	constructor(canvas){
		this.g = canvas;//display obgect
		this.quadTree = 0;//import quadTreclass //not yet implemmented //issue
		this.field = new Field();
		for(let i = 0; i < info.startingNumberPredators;i++){
			this.field.predators.push(new Predator());
		}
		for(let i = 0; i < info.startingNumberMoabs;i++){
			this.field.moabs.push(new Moab());
		}
		for(let i = 0; i < info.startingNumberFood;i++){
			this.field.foods.push(new Food());
		}
		//used to output to txt document
		//try storing in a data structure and visualizing

		//used to log ratio of mass to area
	}

	update(){
		//set background to black
		clear();
		//display all creatures
		displayAll(this.field.eggs);
		displayAll(this.field.moabs);
		displayAll(this.field.predators);
		displayAll(this.field.foods);

		spawnFood();
		//if not paused
		//update quadtree
		this.field.updateGameObjects();
		this.field.moveGameObjects();

		//do quadtree collision
		this.field.runChecks()
		//predators againts moabs
		//moabs vs food


		//record stats if desired // need to add cycle counter to number stats
		
	}

}