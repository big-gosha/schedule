// Class Canvas
class Canvas {
    constructor(id, width, height) {
        this.element = document.getElementById(id);
        this.ctx = this.element.getContext("2d");

        if (width == 0 || height == 0){}
        else{
            this.element.width = width;
            this.element.height = height;
        }
    }
}

// Size
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const bgHeight = screenHeight * 0.95;
const bgWidth = bgHeight * 1.77777777777;
const hDpi = bgHeight / 1080;
const wDpi = bgWidth / 1920;

// Thumbnail Transform
var thumbnail = {
    isLoaded: false,
    transform: {
        positionX: 0,
        positionY: 0,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
    },
    image: new Image(),
    canvas: new Canvas('canvas-thumbnail', 200, 200),
    update: function() {
        let width = this.isLoaded ? this.image.width : 200;
        let height = this.isLoaded ? this.image.height : 200;

        this.canvas.element.width = width * this.transform.scaleX;
        this.canvas.element.height = height * this.transform.scaleY;

        let offsetX = this.transform.positionX+57;
        let offsetY = this.transform.positionY+57;
        
        rotateBox.style.transform = 
            `translate(${this.transform.positionX}px, ${this.transform.positionY}px) rotate(${this.transform.angle}deg)`;
    },
    reset: function() {
        this.transform.positionX = 0;
        this.transform.positionY = 0;
        this.transform.scaleX = 1;
        this.transform.scaleY = 1;
        this.transform.angle = 0;
        this.update();
    },
}

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
    await loadImage(bgLeftImage, 'assets/BG_Left.png');
    await loadImage(bgRightImage, 'assets/BG_Right.png');
    document.dispatchEvent(onAssetsLoaded);
}

