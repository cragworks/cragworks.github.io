/*
* Calvin Tham, 2013
* calvintham.com
*/


//the rectangle that clears the screen
var cnvWidth = 1000;
var cnvHeight = 600;
var ctx;

var aDown = false;
var sDown = false;
var dDown = false;
var fDown = false;

var teethWidth = 20;
var teethHeight = 40;
var restart = false;
var type = "j";//j or k or jk

var win = false;


var jJumpSnd = new Audio("sounds/jump2.wav"); // buffers automatically when created
var kJumpSnd = new Audio("sounds/jump.wav"); // buffers automatically when created
var pickupSnd = new Audio("sounds/pickup.wav");

//j
var k = {
  color: "green",
  x: 50,
  y: 570,
  width: teethWidth,
  height: teethHeight,
  velocity: 0,
  draw: function() {
    ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
	
	//draw some text
	ctx.fillStyle = "green";
	ctx.fillText("J", this.x+9, this.y-3);
	ctx.fillText("J", this.x+9, this.y+13);
	ctx.fillText("J", this.x+9, this.y+27);
	ctx.fillText("J", this.x+9, this.y+37);
	ctx.fillText("J", this.x, this.y+37);
  }
};

//k
var k2 = {
  color: "purple",
  x: 940,
  y: 153,
  width: teethWidth,
  height: teethHeight,
  velocity: 0,
  draw: function() {
    ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
	
	//draw some text
	ctx.fillText("K", this.x, this.y-3);
	ctx.fillText("K", this.x, this.y+13);
	ctx.fillText("K", this.x, this.y+27);
	ctx.fillText("K", this.x, this.y+37);
	
	
	ctx.fillText("K", this.x+15, this.y+27 - 30);
	ctx.fillText("K", this.x+11, this.y+38 - 30);
	
	ctx.fillText("K", this.x+3, this.y+20);
	ctx.fillText("K", this.x+11, this.y+27);
	ctx.fillText("K", this.x+15, this.y+38);
  }
};

//level1
var level1 = {
  color: "black",
  x: 0,
  y: 590,
  width: cnvWidth,
  height: 5,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var level2 = {
  color: "black",
  x: 0,
  y: 390,
  width: cnvWidth,
  height: 5,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var level3 = {
  color: "black",
  x: 0,
  y: 190,
  width: cnvWidth,
  height: 5,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

//lvl1

var hitBox = {
  color: "green",
  x: -400,
  y: level1.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var box1 = {
  color: "black",
  x: 400,
  y: level1.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

//lvl2


var box2 = {
  color: "black",
  x: 200,
  y: level2.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box3 = {
  color: "black",
  x: 350,
  y: level2.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box4 = {
  color: "black",
  x: 500,
  y: level2.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box5 = {
  color: "black",
  x: 700,
  y: level2.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box6 = {
  color: "black",
  x: 100,
  y: level3.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var box7 = {
  color: "black",
  x: 300,
  y: level3.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box8 = {
  color: "black",
  x: 400,
  y: level3.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box9 = {
  color: "black",
  x: 500,
  y: level3.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box10 = {
  color: "black",
  x: 600,
  y: level3.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box11 = {
  color: "black",
  x: 700,
  y: level3.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};
var box12 = {
  color: "black",
  x: 900,
  y: level1.y - 20,
  width: 20,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

var boxWin = {
  color: "blue",
  x: 900,
  y: 150,
  width: teethWidth,
  height: teethHeight,
  
  draw: function() {
	ctx.fillStyle = "red";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
	
	
    ctx.fillStyle = this.color;
	ctx.fillText("!", this.x, this.y+13);
	ctx.fillText("!", this.x+5, this.y+13);
	ctx.fillText("!", this.x+10, this.y+13);
	ctx.fillText("!", this.x+15, this.y+13);
	
	ctx.fillText("!", this.x, this.y+26);
	ctx.fillText("!", this.x+5, this.y+26);
	ctx.fillText("!", this.x+10, this.y+26);
	ctx.fillText("!", this.x+15, this.y+26);
	
	ctx.fillText("!", this.x, this.y+39);
	ctx.fillText("!", this.x+5, this.y+39);
	ctx.fillText("!", this.x+10, this.y+39);
	ctx.fillText("!", this.x+15, this.y+39);
	
  }
};

var winText = {
  color: "blue",
  x: k.x - 3,
  y: k.y - 10,
  width: 200,
  height: 20,
  draw: function() {
    ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
	
	
	ctx.fillText("Jump King", this.x, this.y);
  }
};


function init() 
{
	//we make the variable ctx refer to our canvas we defined in our html page
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.canvas.width = cnvWidth;
	ctx.canvas.height = cnvHeight;
	
	
	//the function setInterval takes a function to execute and an interval in milliseconds
	//it will call draw every 10ms, which is effectively 100 fps
	return setInterval(function(){draw()}, 10);
	//notice how we have to declare the draw function here and define it below
	//that's because we can't put the draw function above this one, because we need to initialize ctx when our window loads
}

function input()
{
	//All this stuff is what we need the jQuery for

	//keys down
	function onKeyDown(evt) {
		if (evt.keyCode == 74) jDown = true; //j
		else if (evt.keyCode == 75) kDown = true; //k
	}
	//keys released
	function onKeyUp(evt) {
		if (evt.keyCode == 74) jDown = false;
		else if (evt.keyCode == 75) kDown = false;
	}
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
}

function update()
{
	input();
	
	
	//restart
	if(restart==true)
	{
		k.x = 0;
		k.y = level1.y-k.height;
		
		if(type=="jk")
		{
			k2.x = k.x + k.width;
			k2.y = level1.y-k2.height;
		}
		
		restart = false;
	}
	
	//movement
	k.velocity+=0.2;
	
	if(k.velocity > 6)
		k.velocity = 6;
		
	k.y = k.y + k.velocity;
	k.x+=1.6;
	
	if( collides(k, box1) || collides(k, box2) || collides(k, box3) || collides(k, box4) || collides(k, box5) || collides(k, box6) || collides(k, box7) || collides(k, box8) || collides(k, box9) || collides(k, box10) || collides(k, box11) || collides(k, box12) )
	{
		restart = true;
		
			
		hitBox.color = "green";
		
		if( collides(k, box1)  )
		{
 	 		  hitBox.x = box1.x;
			  hitBox.y = box1.y;
		}
		if( collides(k, box2) )
 	  	{
 	 		  hitBox.x = box2.x;
			  hitBox.y = box2.y;
		
		}
		if(  collides(k, box3))
 	  	{
 	 		  hitBox.x = box3.x;
			  hitBox.y = box3.y;
		}
		
		if( collides(k, box4) )
 	  	{
 	 		  hitBox.x = box4.x;
			  hitBox.y = box4.y;
		}
		
		if( collides(k, box5) )
 	  	{
 	 		  hitBox.x = box5.x;
			  hitBox.y = box5.y;
		}
		
		if( collides(k, box6) )
 	   	{
 	 		  hitBox.x = box6.x;
			  hitBox.y = box6.y;
		}
		
		if(  collides(k, box7)  )
 	  	{
 	 		  hitBox.x = box7.x;
			  hitBox.y = box7.y;
		}
		
		if( collides(k, box8) )
 	 	{
 	 		  hitBox.x = box8.x;
			  hitBox.y = box8.y;
		}
		
		if( collides(k, box9) )
 	  	{
 	 		  hitBox.x = box9.x;
			  hitBox.y = box9.y;
		}
		
		if( collides(k, box10)  )
 	  	{
 	 		  hitBox.x = box10.x;
			  hitBox.y = box10.y;
		}
		
		if( collides(k, box11)  )
 	  	{
 	 		  hitBox.x = box11.x;
			  hitBox.y = box11.y;
		}
		
		if( collides(k, box12) )
 	   	{
 	 		  hitBox.x = box12.x;
			  hitBox.y = box12.y;
		}
	}
	
	//collisions
	if( collides(k, level1) )
	{
		k.y = level1.y - k.height;
		
		if (jDown)
		{
			k.velocity =-5;
			jJumpSnd.play();
		}
	}
	
	
	if( collides(k, level2) )
	{
		k.y = level2.y - k.height;
		
		if (jDown)
		{
			k.velocity =-5;
			jJumpSnd.play();
		}
	}
	
	if( collides(k, level3) )
	{
		k.y = level3.y - k.height;
		
		if (jDown)
		{
			k.velocity =-5;
			jJumpSnd.play();
		}
	}
	
	
	
	//moving offscreen
	if(k.x > cnvWidth)
	{
		k.x = 0;
		
		if(k.y >= level3.y)
			k.y -= 200;
		else
		{
			k.y = 550;
			//add new guy
		}
			
	}
	
	//////////////////////////////
	//FOR K
		//restart
	if(type == "jk")
	{
	
		//movement
		k2.velocity+=0.2;
	
		if(k2.velocity > 6)
			k2.velocity = 6;
		
		k2.y = k2.y + k2.velocity;
		k2.x+=1.6;
	
	
	
	//collisions
		if( collides(k2, level1) )
		{
			k2.y = level1.y - k2.height;
		
			if (kDown)
			{
				k2.velocity =-5;
				kJumpSnd.play();
			}
		}
	
		if( collides(k2, box1) || collides(k2, box2) || collides(k2, box3) || collides(k2, box4) || collides(k2, box5) || collides(k2, box6) || collides(k2, box7) || collides(k2, box8) || collides(k2, box9) || collides(k2, box10) || collides(k2, box11) || collides(k2, box12) )
		{
			restart = true;
			
			
 	    hitBox.color = "purple";

		if( collides(k2, box1)  )
		{
 	 		  hitBox.x = box1.x;
			  hitBox.y = box1.y;
		}
		if( collides(k2, box2) )
 	  	{
 	 		  hitBox.x = box2.x;
			  hitBox.y = box2.y;
		}
		
		if(  collides(k2, box3))
 	  	{
 	 		  hitBox.x = box3.x;
			  hitBox.y = box3.y;
		}
		
		if( collides(k2, box4) )
 	  	{
 	 		  hitBox.x = box4.x;
			  hitBox.y = box4.y;
		}
		
		if( collides(k2, box5) )
 	  	{
 	 		  hitBox.x = box5.x;
			  hitBox.y = box5.y;
		}
		
		if( collides(k2, box6) )
 	   	{
 	 		  hitBox.x = box6.x;
			  hitBox.y = box6.y;
		}
		
		if(  collides(k2, box7)  )
 	  	{
 	 		  hitBox.x = box7.x;
			  hitBox.y = box7.y;
		}
		
		if( collides(k2, box8) )
 	 	{
 	 		  hitBox.x = box8.x;
			  hitBox.y = box8.y;
		}
		
		if( collides(k2, box9) )
 	  	{
 	 		  hitBox.x = box9.x;
			  hitBox.y = box9.y;
		}
		
		if( collides(k2, box10)  )
 	  	{
 	 		  hitBox.x = box10.x;
			  hitBox.y = box10.y;
		}
		
		if( collides(k2, box11)  )
 	  	{
 	 		  hitBox.x = box11.x;
			  hitBox.y = box11.y;
		}
		
		if( collides(k2, box12) )
 	   	{
 	 		  hitBox.x = box12.x;
			  hitBox.y = box12.y;
		}
	}
	
		if( collides(k2, level2) )
		{
			k2.y = level2.y - k2.height;
		
			if (kDown)
			{
				k2.velocity =-5;
				kJumpSnd.play();
			}
		}
	
		if( collides(k2, level3) )
		{
			k2.y = level3.y - k2.height;
		
			if (kDown)
			{
				k2.velocity =-5;
				kJumpSnd.play();
			}
		}
	
		//moving offscreen
		if(k2.x > cnvWidth)
		{
			k2.x = 0;
		
			if(k2.y >= level3.y )
				k2.y -= 200;
			else
			{
				k2.y = 550;
				//add new guy
			}
			
		}
	}
	
	//J hits K
	if( collides(k, k2) )
	{
		if(type == "j")
			pickupSnd.play();
			
		type = "jk";
		k2.color = "purple";
		k2.x = k.x + k.width;
		
	}
	
	//winning
	if(type == "jk")
	{
		if( collides( k, boxWin) || collides( k2, boxWin))
		{
			win = true;
			pickupSnd.play();
		}
	}

}


function draw() 
{
	//these functions are part of the canvas object
	//you can use them without jQuery if you wanted!

	//clear the canvas before 
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,cnvWidth,cnvHeight);
	
		
	
	//level1
	level1.draw();
	level2.draw();
	level3.draw();
	//k
	k.draw();
	//k
	k2.draw();
	//enemies level 1
	box1.draw();
	box2.draw();
	box3.draw();
	box4.draw();
	box5.draw();
	box6.draw();
	box7.draw();
	box8.draw();
	box9.draw();
	box10.draw();
	box11.draw();
	box12.draw();
	
	hitBox.draw();
	
	if(type=="jk" && win == false)
		boxWin.draw();
	
	if(win == true)
	{
		
		winText.x = k.x -3;
		
		//picker higher height
		if(k.y < k2.y)
			winText.y = k.y - winText.height - 3;
		else
			winText.y = k2.y - winText.height - 3;
			
		winText.draw();
	}
	update();
}


function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

//javascript is an event based language
//we can tell the window to wait and "listen" for the load event
//when you've loaded, run the init function
window.addEventListener("load", init, false);