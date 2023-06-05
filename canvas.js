// notes

/*function newImage(url){
    let image = document.createElement('img')
    image.src = url
    document.body.append(image)
    return newImage
}

function addPointsIcon(url){
    let addIcon = document.createElement('img')
    addIcon.src = url
    document.body.append(image)
}*/
window.addEventListener('load', function(){
    let canvas = document.getElementById('canvasGame');
    let c = canvas.getContext('2d');
    canvas.width = 810;
    canvas.height = 510;
    let mushrooms = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp')
                        && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key)
                }
            });
            window.addEventListener('keyup', e => {
                if (    e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp'){
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            });
        }
    }

    class Pug {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 125;
            this.height = 80;
            this.x = 50;
            this.y = 250;
            this.image = document.getElementById('pug');
            this.frameX = 0;
            this.maxFrame = 4;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 500/this.fps;
            this.frameY = 0;
            this.speed = 0;
        }
        draw(context){
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
            context.fillStyle = 'transparent';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, mushrooms){
            //collision detection
            mushrooms.forEach(mushroom => {
                const dx = mushroom.x - this.x;
                const dy = mushroom.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mushroom.width/2 + this.width/2){
                    gameOver = true;
                }
            });
            //sprite animation
            if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
            //controls
            this.y += this.speed;
            if (this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
            if (input.keys.indexOf('ArrowUp') > -1){
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowDown') > -1){
                this.speed = 5;
            } else {
                this.speed = 0;
            }
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720; 
            this.speed = 3; 
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    class Subtractpointsicon {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('mushroom');
            this.x = this.gameWidth;
            this.y = 400;
            this.width = 40;
            this.height = 40;
            this.speed = 3;//3
            this.markedForDeletion = false;
        }
        draw(context){
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            context.stroke();
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
           this.x -= this.speed;
           if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
    }

    class Addpointsicon {

    }

    function addPoints() {

    }

    
    function subtractPoints(deltaTime){
        if (mushroomTimer > mushroomInterval + randomMushroomInterval){
            mushrooms.push(new Subtractpointsicon(canvas.width, canvas.height));
            randomMushroomInterval = Math.random() * 7000 + 1900;
            mushroomTimer = 0;
        } else {
            mushroomTimer += deltaTime;
        }
        mushrooms.forEach(mushroom => {
            mushroom.draw(c);
            mushroom.update(deltaTime);
        });
        mushrooms.filter(Subtractpointsicon => !Subtractpointsicon.markedForDeletion);
    }

    function displayCurrentScore(context) {
        context.fillStyle = 'brown';
        context.font = "40px Caveat";
        context.fillText('Score: ' + score, 660, 50);
        context.fillStyle = 'white';
        context.font = "40px Caveat";
        context.fillText('Score: ' + score, 662, 53);
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'brown';
            context.fillText('GAME OVER', canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('GAME OVER', canvas.width/2 + 2, 20);
        }
    }

    const input = new InputHandler();
    const pug = new Pug(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let mushroomTimer = 0;
    let mushroomInterval = 1000;
    let randomMushroomInterval = Math.random() * 7000 + 1000;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        console.log(deltaTime)
        c.clearRect(0,0,canvas.width, canvas.height)
        background.draw(c);
       // background.update();
        pug.draw(c);
        pug.update(input, deltaTime, mushrooms);
        subtractPoints(deltaTime);
        displayCurrentScore(c);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})

