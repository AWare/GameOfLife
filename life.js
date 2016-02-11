// Buggy work in progress

var canvas = document.getElementById('c');
var context = canvas.getContext('2d');
var width = 0;
var height = 0;
var gridWidth = 0;
var gridHeight = 0;
var grid = [[]];
var newgrid = [[]];
var temp = null;
var pause = false;
var size = 10;

var i = 0;
var counter = 110;
function checkresize(){
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;
//USE NORMAL ARRAYS
//RESIZE: INCREASE NEWGRID SIZE
//COPY WITH FOREACH
//INCREASE OLDGRID AND LET PERMUTATION...
if (width != canvas.width || height != canvas.height){
	if (height<canvas.height||width<canvas.width){
		for (var i = gridWidth; i <= ~~(canvas.width/size+1); i++) {
			if(grid[i]==null){
				grid[i]=[];
				newgrid[i]=[];
			}
					//console.log("HELLO");
					for (var j = gridHeight; j <= ~~(canvas.height/size+1); j++) {
						if(grid[i][j]==null){
							grid[i][j]=0;
							newgrid[i][j]=0;
						}
					//console.log("HELLO");
				}
			}
		}
	}

	width = canvas.width;
	height = canvas.height;
	gridHeight = ~~(canvas.height/size);
	gridWidth =  ~~(canvas.width/size);

}
function neighbours(x,y){
	var n = 0;
	//console.log((x-1+gridWidth)%gridWidth + " " + x);
	if (grid[(x-1+gridWidth)%gridWidth][y]==1)                            n++
	if (grid[(x+1+gridWidth)%gridWidth][y]==1)                            n++
	if (grid[x][(y-1+gridHeight)%gridHeight]==1)                          n++
	if (grid[x][(y+1+gridHeight)%gridHeight]==1)                          n++
	if (grid[(x-1+gridWidth)%gridWidth][(y-1+gridHeight)%gridHeight]==1)  n++
	if (grid[(x+1+gridWidth)%gridWidth][(y+1+gridHeight)%gridHeight]==1)  n++
	if (grid[(x+1+gridWidth)%gridWidth][(y-1+gridHeight)%gridHeight]==1)  n++
	if (grid[(x-1+gridWidth)%gridWidth][(y+1+gridHeight)%gridHeight]==1)  n++
	return n;
}
function survives(x,y){
	var n = neighbours(x, y);
	if (n==3||(n==2&&grid[x][y]==1)){
		return true;
	}
	else{
		return false;
	}
}
function what(a,b){
	console.log(a);
}
function drawCell(x,y){
    context.fillStyle = "rgba(0, 0, 0, .5)"
    context.beginPath();
    context.rect(x*size+1, y*size+1, size-1, size-1);
    context.closePath();
    context.fill();
}
function nextState(x,y){
	//Reflect on biggest edges
	//console.log(x);


	//console.log(neighbours);
	var n = neighbours(x, y);
	if(survives(x, y)){
		newgrid[x][y]=1;

	}
	else{
		newgrid[x][y]=0;
	}
}
function redraw(){
	grid.forEach(function(row,x,array){
		row.forEach(function(cell,y,row){
			if(cell==1){
				drawCell(x,y);
			}

		})
	} );
}

function permute(){
	grid.forEach(function(row,x,array){
		row.forEach(function(cell,y,row){
			nextState(x, y);
		})
	} );
	temp=grid;
	grid=newgrid;
	newgrid=temp;
}
function draw() {
    requestAnimationFrame(draw);

    //Smooth animation coming soon
    if(counter<25||pause){
        counter++;
    }
    else{
    counter = 0;
        permute();

    }
    checkresize();

	//context.save();
	//context.setTransform(1, 0, 0, 1, 0, 0);
	//context.clearRect(0, 0, width, height);
	context.restore();



	redraw();



}
function spawn(event){
	counter = 0;
    var x = ~~(event.pageX/size);
    var y = ~~(event.pageY/size);
    grid[x][y]=grid[x][y]==1?0:1;
}
function addSpawnHandler(event){
    document.addEventListener("mousemove",spawn,false);
    spawn(event);
    pause=true;
}
function removeSpawnHandler(event){

    document.removeEventListener("mousemove",spawn,false);
    pause=false;
}
document.addEventListener("mousedown",addSpawnHandler,false);
document.addEventListener("mouseup",removeSpawnHandler,false);
document.addEventListener("keydown",function(){pause=true;},false);
document.addEventListener("keyup",function(){pause=false;},false);
checkresize();
grid[60][4]=1;
grid[60][5]=1;
grid[60][6]=1;
draw();
