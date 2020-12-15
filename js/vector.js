class Vector{
	constructor(x,y){//overload to accept other vector
		this.x = x || 0;//rand(info.leftWall,info.rightWall);
		this.y = y || 0;//rand(info.floor,info.ceiling);
		//add used vector methods
		if(isNaN(x)){
			throw "NaN given to vector constructor";
		}
	}
		add(v){
			this.x += v.x;
			this.y += v.y;
		}
		sub(v){
			this.x -= v.x;
			this.y -= v.y;
		}
		mult(n){
			this.x *= n;
			this.y *= n;
		}
		dist(v){
			let dx = this.x - v.x;
			let dy = this.y - v.y;
			return Math.sqrt(dx*dx + dy*dy);

		}
		setMag(n){
			let mag = this.calcMag();
			if(mag !== 0){
				this.x *= n/mag;
				this.y *= n/mag;
			}
		}
		limitMag(n){
			if(this.calcMag() > n){
				this.setMag(n);
			}
			// if(this.calcMag() < -n){
			// 	this.setMag(-2);
			// }
		}
		normalize(){
			this.setMag(1);
		}
		calcMag(){
			return Math.sqrt(this.x*this.x + this.y*this.y);
		}
}

function randomVector(){
	let v = new Vector(rand(-1,1),rand(-1,1));
	if(v.calcMag() !== 0){
		return v;
	}else{
		return randomVector();
	}
}