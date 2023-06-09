
window.addEventListener('load', function(){
    let canvas = document.getElementById('canvasGame');
    let c = canvas.getContext('2d');
    canvas.width = 820;
    canvas.height = 510;
    let mushrooms = [];
    let dogTreats = [];
    let score = 0;
    let gameOver = false;
    const fullScreenButton = document.getElementById('fullScreenButton')

    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp')
                        && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key)
                } else if (e.key === 'd') this.debug = !this.debug;
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
            this.width = 122;
            this.height = 80;
            this.x = 60;
            this.y = 250;
            this.image = document.getElementById('pug');
            this.frameX = 0;
            this.maxFrame = 4;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 500/this.fps;
            this.frameY = 0;
            this.speed = 0;
            this.markedForDeletion = false;
            this.score = 0;
        }
        restart(){
            this.x = 60;
            this.y = this.gameHeight - this.height;
            this.maxFrame = 4;
        }
        draw(context){
            context.strokeStyle = 'transparent';
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/3, 0, Math.PI * 2);
            context.stroke();
            context.fillStyle = 'transparent';
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, mushrooms, dogTreats){
            //collision detection for mushrooms
            mushrooms.forEach(mushroom => {
                const dx = (mushroom.x + mushroom.width/2) - (this.x + this.width/2);
                const dy = (mushroom.y + mushroom.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mushroom.width/2 + this.width/3){
                    //delete mushroom and take life away
                    gameOver = true;
                }
            });
            //collision detection for dogTreats
            dogTreats.forEach(dogTreat => {
                const dx = (dogTreat.x + dogTreat.width/2) - (this.x + this.width/2);
                const dy = (dogTreat.y + dogTreat.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < dogTreat.width/2 + this.width/3){
                    score++;//add points
                    dogTreat.height = 0;//delete dogTreat
                } else;
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
                if (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) {
                    this.speed = -5;
                } else if (input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('swipe down') > -1) {
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
            this.speed = 8; 
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
        restart() {
            this.x = 0;
        }
    }

    class Subtractpointsicon {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('mushroom');
            this.x = this.gameWidth;
            this.y = Math.random() * this.gameHeight;
            this.width = 40;
            this.height = 40;
            this.speed = 8;
            this.markedForDeletion = false;
        }
        draw(context){
            context.strokeStyle = 'transparent';
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
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('dogTreat');
            this.x = this.gameWidth;
            this.y = Math.random() * this.gameHeight;
            this.width = 20;
            this.height = 40;
            this.speed = 8;
            this.markedForDeletion = false;
        }
        draw(context){
            context.strokeStyle = 'transparent';
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

    function displayDogTreat(deltaTime) {
        if (dogTreatTimer > dogTreatInterval + randomDogTreatInterval){
            dogTreats.push(new Addpointsicon(canvas.width, canvas.height));
            randomDogTreatInterval = Math.random() * 500 + 900;
            dogTreatTimer = 0;
        } else {
            dogTreatTimer += deltaTime;
        }
        dogTreats.forEach(dogTreat => {
            dogTreat.draw(c);
            dogTreat.update(deltaTime);
        });
        dogTreats.filter(Addpointsicon => !Addpointsicon.markedForDeletion);
    }

    function displayMushroom(deltaTime){
        if (mushroomTimer > mushroomInterval + randomMushroomInterval){
            mushrooms.push(new Subtractpointsicon(canvas.width, canvas.height));
            randomMushroomInterval = Math.random() * 500 + 900;
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
            context.fillText('GAME OVER! Press NEW GAME to restart!', canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('GAME OVER! Press NEW GAME to restart!', canvas.width/2 + 2, 202);
        }
    }

    /*function restartGame(){
        player.restart();
        background.restart();
        dogTreats = [];
        score = 0;
        gameOver = false;
        animate(0);
    }*/

    function toggleFullScreen() {
        console.log(document.fullScreenElement);
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable Full-screen mode: ${err.message}`)
            });
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen);

    const input = new InputHandler();
    const pug = new Pug(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let mushroomTimer = 0;
    let mushroomInterval = 500;
    let randomMushroomInterval = Math.random() * 1000 + 500;
    let dogTreatTimer = 0;
    let dogTreatInterval = 500;
    let randomDogTreatInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        console.log(deltaTime)
        c.clearRect(0,0,canvas.width, canvas.height)
        background.draw(c);
        background.update();
        pug.draw(c);
        pug.update(input, deltaTime, mushrooms, dogTreats);
        displayMushroom(deltaTime);
        displayDogTreat(deltaTime);
        displayCurrentScore(c);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})

