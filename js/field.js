class Field{//brute force for now

	constructor(){
		this.moabs = [];
		this.predators = [];
		this.foods = [];
		this.eggs = [];
	}

	getFoodNear(location){
		return this.food;
	}
	getMoabsNear(location){
		return this.moabs;
	}
	getPredNear(location){
		return this.predators;
	}



	updateGameObjects(){
		//all moabs
		for(let moab of this.moabs){
			moab.update();
		}
		//all predators
		for(let pred of this.predators){
			pred.update();
		}
		for(let egg of this.eggs){
			egg.update();
		}

	}
	moveGameObjects(){
		//all moabs
		for(let moab of this.moabs){
			moab.move();
		}
		//all predators
		for(let pred of this.predators){
			pred.move();
		}
	}
	runChecks(){
		for(let pred of this.predators){
			if(pred.isHungry){
				let nearFood = pred.getFoodNear();
				for(let moab of nearFood){
					let distance = dist(pred.location,moab.location);
					if(distance < pred.radius + moab.radius){
						pred.ateFood(moab.massValue());
						remove(this.moabs, moab);
					}
				}
			}
		}
		for(let moab of this.moabs){//moabs agains food
			if(moab.isHungry()){
				let nearFood = moab.getFoodNear();
				for(let f of nearFood){
					let distance = dist(moab.location,f.location);
					if(moab.location.x < 0){noLoop();console.log('runcheck');currentMoab = moab;throw 'runcheck';}
					if(distance < moab.radius + f.radius){
						moab.ateFood(f.massValue());
						remove(this.foods, f);
					}
				}
			}
		}
	}
}
