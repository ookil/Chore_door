const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');

const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg'
const beachDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoor = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';

const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg'

const startButton = document.getElementById('start')

let numClosetDoors = 3;
let openDoor1, openDoor2, openDoor3;

let currentlyPlaying = true;

const isBot = (door) => {
    if ( door.src === botDoorPath) {
        return true
    }
    return false
}

const isClicked = door => {
    if (door.src === closedDoorPath) {
        return false; 
    }
    return true;
}

const playDoor = (door) => {
    numClosetDoors--;
    if (numClosetDoors === 0) {
        gameOver('win');
    }
    else if (isBot(door) === true) {
        gameOver();
    }
}

const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosetDoors)
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = spaceDoor;
        openDoor3 = beachDoor;
    } else if ( choreDoor === 1) {
        openDoor1 = beachDoor;
        openDoor2 = botDoorPath;
        openDoor3 = spaceDoor;
    } else {
        openDoor1 = spaceDoor;
        openDoor2 = beachDoor;
        openDoor3 = botDoorPath;
    }

}

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }    
}

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}

doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)){ 
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
}

startButton.onclick = () => {
   if (!currentlyPlaying) {
       startRound();
   }
}

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath
    doorImage3.src = closedDoorPath
    numClosetDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

const gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?'
    }
    else {
        startButton.innerHTML = 'Game over! Play again?'
    }
    currentlyPlaying = false
}

startRound();