//DEFINICION DE VARIABLES
var canvas; 
var ctx;
var fps = 30;

var canvasX =500 ;
var canvasY = 500 ;

var tileX, tileY; 

//tablero variables 
var tablero;
var filas = 100;
var columnas = 100;

var white = '#010400';
var black = '#EAF9D9';

var ratonX = 0;
var ratonY = 0;

function clicRaton(e){
  console.log(ratonX + " - " + ratonY);
}

function sueltaRaton(e){
  console.log('raton soltado');
  cambiaRaton();
}

function posicionRaton(e){
  ratonX = e.pageX;
  ratonY = e.pageY;
}




function array2D(f,c){
    var obj = new Array(f);
    for(let i = 0; i<=f; i++){
        obj[i] = new Array(c);
    }
    return obj;
}

//var agent
var Agente = function(x,y,estado){
    this.x = x;
    this.y = y;
    this.estado = estado;  //vivo= 1, muerto = 2  
    this.proximo = this.estado; //proximo estado en el siguietne ciclo

    //vecinos 
    this.vecinos = [];

    //añade vecinos
    this.addVecinos = function(){
        var xVecino;
        var yVecino;
        

        for(let i = -1 ; i<2;i++){
            for(let j =-1 ; j<2;j++){

                xVecino = (this.x + j +columnas)%columnas;
                yVecino = (this.y + i +filas)%filas;

                // agente actual sale 
                if(i!= 0 || j!=0){
                    this.vecinos.push(tablero[xVecino][yVecino]);
                }
            }
        }  
    }

    this.draw = function(){
        var color;
        if(this.estado == 1){
            color = white;
        }else{
            color = black;
        }
        ctx.fillStyle = color;
        ctx.fillRect(this.x *tileX , this.y *tileY,tileX,tileY);
    }
    //leyes conway 

    this.pintaEstado = function(est){
		this.estado = est;
	}
    this.nuevoCiclo = function(){
        var suma = 0;
        for(let i = 0;i<this.vecinos.length;i++){
            suma += this.vecinos[i].estado;
        }

        this.proximo = this.estado; 

        if(suma<2 || suma>3){
            this.proximo=0;
        }

        if(suma ==3){
            this.proximo = 1;
        }

    }

    this.mutacion =function(){
        this.estado = this.proximo;
    }

}



function cambiaRaton(){
	
    var obj = new Agente(ratonX,ratonY, 2);
    obj.addVecinos();
}

function starterTablero(obj){
    var estado; 

    for(let i = 0 ; i<filas ; i++){
        for(let j = 0 ; j<columnas ; j++){
            estado = Math.floor(Math.random()*2);
            
            obj[i][j]= new Agente(i,j,estado);
        }   
    }

    for(let i = 0 ; i<filas ; i++){
        for(let j = 0 ; j<columnas ; j++){
            obj[i][j].addVecinos();
        }   
    }
}


function starter(){

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvasX;
    canvas.height = canvasY;

    //RATÓN
	canvas.addEventListener('mousedown',clicRaton,false);
	canvas.addEventListener('mouseup',sueltaRaton,false);
	canvas.addEventListener('mousemove',posicionRaton,false);
	
	

    tileX = Math.floor(canvasX/filas);
    tileY = Math.floor(canvasY/columnas);

    //tablero 

    tablero = array2D(filas, columnas);

    starterTablero(tablero);

    //lamar funcion main 
    setInterval(function(){main();},1000/fps);
}

function draw(obj){


    for(let i = 0; i<filas ;i++){
        for(let j=0; j<columnas;j++){
            obj[i][j].draw();
        }
    }

    for(let i = 0;i<filas;i++){
        for(let j = 0;j<columnas;j++){
            obj[i][j].nuevoCiclo();
        }
    }
    
    for(let i = 0;i<filas;i++){
        for(let j = 0;j<columnas;j++){
            obj[i][j].mutacion();
        }
    }
}

function main(){
    deleteCanva();
    draw(tablero);
}
function deleteCanva(){
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}