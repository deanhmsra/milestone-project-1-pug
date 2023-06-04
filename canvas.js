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
            })
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
            //Vertical movement
            //Horizonal movement

        }
    }

    class Background {

    }

    class Subtractpointsicon {

    }

    class Addpointsicon {

    }

    function addPoints() {

    }

    function subtractPoints(){

    }

    const input = new InputHandler();
    const pug = new Pug(canvas.width, canvas.height);

    function animate(){
        c.clearRect(0,0,canvas.width, canvas.height)
        pug.draw(c);
        pug.update(input);
        requestAnimationFrame(animate);
    }
    animate();
})

