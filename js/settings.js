//settings functionality-----------------------------------------------------------


function toggleElement(id){
	var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function changeVal(id,value){
	if(document.getElementById(id)){
		document.getElementById(id).innerHTML = value;
	}
	if(!(typeof(value) == typeof(true))){
		value = parseInt(value);
	}
	info[id] = value;
}