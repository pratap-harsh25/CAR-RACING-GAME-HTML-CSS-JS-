/***************************************  QUERY SELECTOR **************************************/
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
//console.log(gameArea);
/***************************************** EVENTS ********************************************/

startScreen.addEventListener('click', start);


let player={speed:7, score:0}; //EMPTY OBJECT 

let keys ={ 
     ArrowUp : false,
     ArrowDown : false,
     ArrowLeft : false, 
     ArrowRight : false
}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

/************************************** ALL FUNCTIONS ****************************************/
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    //console.log(e.key);
   // console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    //console.log(e.key);
   // console.log(keys);
}

function isCollide(a,b){
    aRect =a.getBoundingClientRect();//Own CAR
    bRect =b.getBoundingClientRect();//enemy CAR
    
   
    return !(( aRect .bottom < bRect.top) || (aRect.top > bRect.bottom) || 
              (aRect.right < bRect.left) || (aRect.left > bRect.right)
            );
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >=700){
            item.y-=750;
        }
        item.y += player.speed;
        item.style.top=item.y+"px";
    })
}


function endgame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over " + " <br>Press here to restart Game";
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
         if(isCollide(car,item)){
             endgame();
         }
        if(item.y >=700){
            item.y  =-300;
            item.style.left=Math.floor(Math.random()*350)+"px";
        }

        item.y += player.speed;
        item.style.top=item.y+"px";
    })
}

function gamePlay(){
   // console.log("hey I am Clicked");
    let car= document.querySelector(".car");
    let road =gameArea.getBoundingClientRect();
    console.log(road);
    if(player.start){
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y>(road.top+40))  { player.y -=player.speed; }
        if(keys.ArrowDown && player.y<(road.bottom-70)){ player.y +=player.speed; }
        if(keys.ArrowLeft && player.x>0){ player.x -=player.speed; }
        if(keys.ArrowRight && player.x <(road.width-50)){player.x +=player.speed; }

        car.style.top = player.y+ "px"; //CONCATINATION
        car.style.left = player.x+ "px"; 

        window.requestAnimationFrame(gamePlay)
        console.log(player.score++);

        player.score++;
        score.innerText = "Score :"+player.score;
    }
}

function start(){
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
    for(let x=0;x<5;x++){
      let roadLine=document.createElement('div');
      roadLine.setAttribute("class","lines");
      roadLine.y= (x*150);
      roadLine.style.top=roadLine.y+"px";// position of 1st div is (0*150)=0 /* this will show upto 100px becoz height 100px is already set*/
      //  position of 2st div 150px (it will  start  150px)
      gameArea.appendChild(roadLine);
    }

    let car =document.createElement("div");
    car.setAttribute('class' , 'car');
     // car.innerText="Hey I am your Car";
    gameArea.appendChild(car);

    player.x= car.offsetLeft;
    player.y= car.offsetTop;

    for(let x=0;x<3;x++){
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute("class","enemy");
        enemyCar.y= ((x+1)*350)*-1;
        enemyCar.style.top=enemyCar.y+"px";
        // enemyCar.style.backgroundColor='yellowgreen';
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
      }
}

