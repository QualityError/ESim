class Food{
	constructor(location){//research multiple js constructors
		let loc = location || randomLocation();
		this.radius = info.foodRadius;
		this.location = new Vector(loc.x,loc.y);//new randomVector()
		this.color = info.foodColor;
	}
	massValue(){//change mass amout to match mass value
		return 1;
	}
}