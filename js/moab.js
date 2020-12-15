class Moab extends Creature{//research javascript and extending
	constructor(location, genetics){//for mouse added moabs
		super();
		this.location = location || randomLocation();
		if(isNaN(this.location.x)){
			throw "NaN eror at Moab constructor";
		}
		this.checkEdges();
		this.genes = genetics || new Genetics(info.defaultGenes);
		this.color = info.moabColor;
	}

	getFoodNear(){//diferent children of creature hava diferent 'foods'
		return sim.field.foods;//grid update //quadtree update
	}
	setThisColor(){
		setColor(info.moabColor);
	}
}