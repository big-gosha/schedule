// Class Canvas
class Canvas {
    constructor(id, width, height) {
        this.element = document.getElementById(id);
        this.ctx = this.element.getContext("2d");

        // if (width == 0 || height == 0){}
        // else{
        //     this.element.width = width;
        //     this.element.height = height;
        // }
    }
}

// Class Transform
class Transform{
    constructor(){
        this.positionX = 0;
        this.positionY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.width = 200;
        this.height = 200;
        this.angle = 0;
    }

    copyFrom (from){
        this.positionX = from.positionX;
        this.positionY = from.positionY;
        this.scaleX = from.scaleX;
        this.scaleY = from.scaleY;
        this.width = from.width;
        this.height = from.height;
        this.angle = from.angle;
    }

    reset(){
        this.positionX = 0;
        this.positionY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.width = 200;
        this.height = 200;
        this.angle = 0;
    }
}

// Size
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
// const bgHeight = 1080 * 0.95;
// const bgWidth = bgHeight * 1.77777777777;
const bgHeight = screenHeight * 0.95;
const bgWidth = bgHeight * 1.77777777777;
const hDpi = bgHeight / 1080;
const wDpi = bgWidth / 1920;

// Current Week String
const nowDate = new Date();
nowDate.setDate(nowDate.getDate()-nowDate.getDay());
const today = nowDate.getDate();
const nowMonth = nowDate.toDateString().substring(4, 7).toUpperCase();

// Next Week String
const nextDate = new Date();
nextDate.setDate(nowDate.getDate() + 6);
const nextDay = nextDate.getDate();
const nextMonth = nextDate.toDateString().substring(4, 7).toUpperCase();

// Asset Loading
const onAssetsLoaded = new Event("onAssetsLoaded");
async function loadAssets() {
    let loadImage = function(image, source){
        return new Promise((resolve, reject) => {
            image = new Image();
            image.src = source;
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error(`Failed to load: ${source}`));
        });
    }

    await loadImage(weekdayBgImage, 'assets/Box_online.png');
    await loadImage(bgImage, 'assets/BG.png');
    document.dispatchEvent(onAssetsLoaded);
}

// Proxy Text
class ProxyText{
    constructor(font = 'Arial', fontColor = 'red', boxWidth = '200', boxHeight = '15', xPos, yPos, placeholderText, id) {
        this.element = document.createElement("textarea");
        this.element.classList.add('inputText', 'root-child');
        this.element.style.font = font;
        this.element.style.color = fontColor;
        this.element.placeholder = placeholderText;
        this.element.id = id;

        //newRoot.appendChild(element);
        this.element.style.top = `${yAdj(yPos)}px`;
        this.element.style.left = `${xAdj(xPos)}px`;
        this.element.style.width = boxWidth;
        this.element.style.height = boxHeight;
    }

    drawAsHtml (){
        this.element.visibility = 'visible';
    }

    drawAsCanvas (ctx){
        this.element.visibility = 'hidden';
        drawText(this.element.font, 
            this.element.color, 
            this.element.style.left, 
            this.element.style.top, 
            this.element.style.textAlign, 
            this.element.style.verticalAlign, 
            this.element.value,
            ctx);
    }
}
