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
        this.lastKey
    }
    draw(){ //draw method
        c.fillStyle = 'red' 
        c.fillRect(this.position.x, this.position.y, 50, this.height) //referencing x and y
    }
    update(){ // update method 
        this.draw()
        
        this.position.x += this.velocity.x // define movement along the y-axis
        this.position.y += this.velocity.y // define how the player moves on the X- axis
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) { //this funtion helps stop the canvas from falling beyond the baseline by sub tracting the canvas height
            this.velocity.y = 0 // if base line is reached we set the velocity to zero (0)
        }else {
            this.velocity.y += gravity // if the player is at a height above the base-line we add gravity => downward movement
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

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }

    
}
let lastKey // monitor  which key was pressed last then let the key be the one that is functional

function animate(){
    window.requestAnimationFrame(animate)// what funtion do i want to loop over agaiin
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') { //check which key is a certain key is pressed and it was the last key then follow the key funtion
        player.velocity.x = -1
    }else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 1
    }
    //enemy movenent
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') { //check which key is a certain key is pressed and it was the last key then follow the key funtion
        enemy.velocity.x = -1
    }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 1
    }
}
animate()

window.addEventListener('keydown', (event) => { // monitor the key we press
    console.log(event.key);
    switch (event.key) { // used switch case to add case events for certain key presses
        case 'd':
            keys.d.pressed = true // moving the player along the right
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true // moving the player along the left
            player.lastKey = 'a' 
        break
        case 'w':
            player.velocity.y = -10 // jump at a velocity of 10
            break
           case 'ArrowRight':
            keys.ArrowRight.pressed = true // moving the enemy along the right
            enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true // moving the enemy along the left
            enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -10 // jump at a velocity of 10
            
        break
    }
    
    console.log(event.key);
})

window.addEventListener('keyup', (event) => { // monitor the key we release the key then the velocity is set to zero 0
    switch (event.key) { // used switch case to add case events for certain key presses
        case 'd':
            keys.d.pressed = false// moving the player along the x-axis
        break
        case 'a':
            keys.a.pressed = false// setting the velocity to 0 when key is lifted
        break
        case 'w':
            keys.a.pressed = false
        break
    }
    // this is our enemy key
    switch (event.key) { // used switch case to add case events for certain key presses
        case 'ArrowRight':
            keys.ArrowRight.pressed = false// moving the player along the x-axis
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false// setting the velocity to 0 when key is lifted
        break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break
    }
    
    console.log(event.key);
})