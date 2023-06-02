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

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

