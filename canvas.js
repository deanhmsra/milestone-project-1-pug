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
    let subtractpointsicons = [];

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
            this.width = 120;
            this.height = 80;
            this.x = 50;
            this.y = 250;
            this.image = document.getElementById('pug');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 2;
        }
        draw(context){
            context.fillStyle = 'transparent';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input){
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
            this.speed = 1;//3
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
        }
        update(){
           this.x -= this.speed;
        }
    }

    class Addpointsicon {

    }

    function addPoints() {

    }

    subtractpointsicons.push(new Subtractpointsicon(canvas.width, canvas.height));
    function subtractPoints(){
        subtractpointsicons.forEach(mushroom => {
            mushroom.draw(c);
            mushroom.update();
        })
    }

    const input = new InputHandler();
    const pug = new Pug(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        console.log(deltaTime)
        c.clearRect(0,0,canvas.width, canvas.height)
        background.draw(c);
        //background.update();
        pug.draw(c);
        pug.update(input);
        subtractPoints(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
})

