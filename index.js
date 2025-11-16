const canvas = document.querySelector('canvas'); //select canvas element
const c = canvas.getContext('2d')//select canvas context

canvas.width = 1024
canvas.height = 576 //10 by 9 ratio
//fillRect() => fills the backbround of the web
c.fillRect(0, 0, canvas.width, canvas.height) //=> it takes 4 arguments

//use use ObjectOrientedProgramming so that different objects can interact with each other

const gravity = 0.2
class Sprite { //this is the brue print for the object
    constructor({position, velocity,}){  //constructor method which is bassically a funtion within a class
        //here we define the properties of the object => our object here is sprite
        this.position = position //in case they have a position indepedent from one another
        this.velocity = velocity //new propery
        this.height = 150
    }
    draw(){ //draw method
        c.fillStyle = 'red' 
        c.fillRect(this.position.x, this.position.y, 50, this.height) //referencing x and y
    }
    update(){ // update method 
        this.draw()
        
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) { //this funtion helps stop the canvas from falling beyond the baseline by sub tracting the canvas height
            this.velocity.y = 0 // if base line is reached we set the velocity to zero (0)
        }else {
            this.velocity.y += gravity
        }
    }
}
    // create a new player and enemy

const player = new Sprite({
    position: {  //new object from sprite class => it takes position argument
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {  //new object from sprite class => it takes position argument
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    }
})
console.log(player)
console.log(enemy)
function animate(){
    window.requestAnimationFrame(animate)// what funtion do i want to loop over agaiin
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}
animate()