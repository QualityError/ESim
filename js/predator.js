class Predator extends Creature{
	constructor(genetics, location){//not sure if needed or if super will auto call
		super(genetics, location)
		this.color = info.predatorColor;
		this.genes.isPredator = true;
	}

	runAway(){
		//needs to be empty to prevent super from being called
	}
	getFoodNear(){//their food is moabs
		return sim.field.moabs;//grid update //quadtree update quadtree.getMoabsNear(this.location);
	}
}