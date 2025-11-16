const canvas = document.querySelector('canvas'); //select canvas element
const c = canvas.getContext('2d')//select canvas context

canvas.width = 1024
canvas.height = 576 //10 by 9 ratio
//fillRect() => fills the backbround of the web
c.fillRect(0, 0, canvas.width, canvas.height) //=> it takes 4 arguments

//use use ObjectOrientedProgramming so that different objects can interact with each other

class Sprite { //this is the brue print for the oblect
    constructor(position){  //constructor method which is bassically a funtion within a class
        //here we define the properties of the object => our object here is sprite
        this.position = position //in case they have a position indepedent from one another
    }
    draw(){ //draw method
        c.fillStyle = 'red' 
        c.fillRect(this.position.x, this.position.y, 50, 150) //referencing x and y
    }
}
    // create a new player and enemy
const player = new Sprite({  //new object from sprite class => it takes position argument
        x: 0,
        y: 0
    })
player.draw()
console.log(player)