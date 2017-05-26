//comment
int superPacTime = 0; //variable

if(pacman touches superpellet) //event
	superPacTime = superPacTime + 15; //action
if(superPacTime == 0) //superPacTime equals 0?
	//ghost chase pacman
if(superPacTime > 0) //superPacTime greater than 0?
	//ghost run away from pacman
	every second
		superPacTime = superPacTime - 1;