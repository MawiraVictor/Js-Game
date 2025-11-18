const canvas = document.querySelector('canvas'); //select canvas element
const c = canvas.getContext('2d')//select canvas context

canvas.width = 1024
canvas.height = 576 //10 by 9 ratio
//fillRect() => fills the backbround of the web
c.fillRect(0, 0, canvas.width, canvas.height) //=> it takes 4 arguments

//use use ObjectOrientedProgramming so that different objects can interact with each other


const gravity = 0.7
class Sprite { //this is the brue print for the object
    constructor({position, velocity, color = 'red', offset}){  //constructor method which is bassically a funtion within a class
        //here we define the properties of the object => our object here is sprite
        this.position = position //in case they have a position indepedent from one another
        this.velocity = velocity //new propery
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = { // added an attack object => has three properties 1. position 2. width 3. Height 
            position: { //ensure player and enemy possitions are indepedent
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width:100,
            height:50
        }
        this.color = color //color property so that object colors are indepedent
        this.isAttacking //= false
        this.health = 100
    }
    draw(){ //draw method
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height) //referencing x and y
           // lets draw an attack-box
         if(this.isAttacking) { //only when attacking show the weapon
        c.fillStyle = 'green'
        c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height 
        )
    }
    }
        
     
    update(){ // update method 
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x // define movement along the y-axis
        this.position.y += this.velocity.y // define how the player moves on the X- axis
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) { //this funtion helps stop the canvas from falling beyond the baseline by sub tracting the canvas height
            this.velocity.y = 0 // if base line is reached we set the velocity to zero (0)
        }else {
            this.velocity.y += gravity // if the player is at a height above the base-line we add gravity => downward movement
        }
    }
    attack(){
        this.isAttacking = true
        setTimeout(() =>{
            this.isAttacking = false
        }, 100)
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
    },
    offset: { //ofset argument
        x:0,
        y:0
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
    },
    color: 'blue',
    offset: {
        x:50,
        y:0
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

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


let timer = 60
let timerId

// Added this function to handle the timer
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        // Handle game over when timer reaches 0
        determineWinner()
    }
}
// Added this function to determine winner
function determineWinner() {
    if (player.health === enemy.health) {
        console.log('Tie!')
    } else if (player.health > enemy.health) {
        console.log('Player Wins!')
    } else if (player.health < enemy.health) {
        console.log('Enemy Wins!')
    }
}
decreaseTimer()


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
        player.velocity.x = -5 // speed of 5 pixels per frame
    }else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    //enemy movenent
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') { //check which key is a certain key is pressed and it was the last key then follow the key funtion
        enemy.velocity.x = -5
    }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
    // detect collission
    if( rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    })&&
        player.isAttacking
    )
          { 
            player.isAttacking = false //single press on attack key causes only a single attack 
            enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%' // handle attack ui by shrinking the helth by 20 % => enemy
    }
    if( rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    })&&
        enemy.isAttacking
    )
          { 
            enemy.isAttacking = false //single press on attack key causes only a single attack 
            player.health +=10
            document.querySelector('#playerHealth').style.width = player.health + '%' // handle attack ui by shrinking the helth by 20 % => player
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
            player.velocity.y = -20 // jump at a velocity of 10
            break
           case 'ArrowRight':
            keys.ArrowRight.pressed = true // moving the enemy along the right
            enemy.lastKey = 'ArrowRight'
        break
        case ' ':
            player.attack()
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true // moving the enemy along the left
            enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -20 // jump at a velocity of 5 pixels pre-frame
            
        break
        case 'ArrowDown': //enemy attacking key
        enemy.isAttacking = true
        break
    }
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
})