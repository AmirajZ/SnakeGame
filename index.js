let lastTime = 0
const speed = 5
let snake = [{x:15,y:10}]
let food  = {x:10,y:10}
const gameBoard = document.getElementById('gameBoard')
let direction = {x:0,y:0}
let lastdirection = {x:0,y:0}
const PointSound = new Audio("point.wav")
const GameOver = new Audio("gameover.wav")




function main(currentTime){
    window.requestAnimationFrame(main)
    if((currentTime-lastTime)/1000< (1/speed) ){
        return
    }
    lastTime = currentTime
    //console.log(currentTime)
    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    for(let i = snake.length - 2 ; i>=0 ; i--){
        snake[i+1] = {...snake[i]}
    }
    //console.log("update")
    snake[0].x += direction.x
    snake[0].y += direction.y
    
    //if snake eat food
    if(snake[0].y=== food.y && snake[0].x===food.x){
        PointSound.play()
        // score += 1;
    //     // if(score>hiscoreval){
    //     //     hiscoreval = score;
    //     //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    //     //     hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    //     // }
    //     // scoreBox.innerHTML = "Score: " + score;
        snake.unshift({x:snake[0].x + direction.x, y:snake[0].y+direction.y})
        let a = 2
        let b = 16
        food = {x:Math.round(a + (b-a)* Math.random()),y:Math.round(a + (b-a)* Math.random())}
    }

       // // If snake colide
    if(snakeColide(snake)){
        GameOver.play()
        direction  = {x:0,y:0}
        alert("Game Over PRESS Any key to PLAY AGAIN!!!")
        snake = [{x:15,y:10}]
       
    }





}

function draw(){
    //console.log("draw")
    gameBoard.innerHTML=''
    snake.forEach(segment =>{
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
        //Food
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement)
   

}

window.addEventListener('keydown',e=>{
    direction = {x:0,y:0}
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            direction.x = 0
            direction.y = -1
            break

        case "ArrowDown":
            console.log("ArrowDown")
            direction.x = 0
            direction.y = 1
            break

        case "ArrowRight":
            console.log("ArrowRight")
            direction.x = 1
            direction.y = 0
            break

        case "ArrowLeft":
            console.log("ArrowLeft")
            direction.x = -1
            direction.y = 0
            break

    }
})

function snakeColide(s){
    for (let i = 1; i < snake.length; i++) {
        if(s[i].x == s[0].x && s[i].y == s[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(s[0].x >= 20 || s[0].x <=0 || s[0].y >= 20 || s[0].y <=0){
        return true;
    }
    return false
}