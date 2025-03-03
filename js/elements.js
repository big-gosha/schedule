// Main canvasas
const root = document.body.children[0];
const editorCanvas = new Canvas('canvas-editor', screenWidth, screenHeight)
const exportCanvas = new Canvas('canvas-export', bgWidth, bgHeight);
const backgroundCanvas = new Canvas('canvas-background', bgWidth, bgHeight);
const foregroundCanvas = new Canvas('canvas-foreground', bgWidth, bgHeight);

// Images
const bgLeftImage = new Image();    bgLeftImage.src = 'BG_Left.png';
const bgRightImage = new Image();   bgRightImage.src = 'BG_Right.png';
const weekdayBgImage = new Image(); weekdayBgImage.src = 'Box_online.png';

// File Browser
const fileBrowser = document.getElementById('file-browser');
fileBrowser.addEventListener("change", function(event) {
    let file = fileBrowser.files[0];
    let reader = new FileReader();
    if (!file) return;

    reader.onload = function(e) {
        thumbnail.isLoaded = true;
        thumbnail.image.onload = () => {
            thumbnail.reset(); 
            //drawThumbnail();
            drawCanvasGlobal();
        }
        thumbnail.image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Export Button
const exportButton = document.getElementById('export-button');
exportButton.addEventListener("click", function() {

    thumbnail.canvas.ctx.drawImage(thumbnail.image, 
        0,
        0,
        512,
        512);

    let imageData = thumbnail.canvas.ctx.getImageData(0, 0, 512, 512);
    let data = imageData.data; // RGBA array

    for (let i = 0; i < data.length; i += 4) {
        let threshold = 240;
        let firstDiff = data[i+0] - threshold;
        let secondDiff = data[i+1] - threshold;
        let thirdDiff = data[i+2] - threshold;

        if (firstDiff >= 0 && secondDiff >= 0 && thirdDiff >= 0) {
            data[i + 3] = 0;
        }
    }

    // for (let i = 0; i < data.length; i += 4) {
    //     if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
    //         data[i + 3] = 0; // Fully transparent
    //     }
    // }

    thumbnail.canvas.ctx.putImageData(imageData, 0, 0);
    
    // week.forEach((day,i) => {
    //     day.switchHtml(exportCanvas.ctx)
    // });

    // const link = document.createElement("a");
    // link.download = "canvas-image.png";
    // link.href = exportCanvas.toDataURL("image/jpeg", 0.5);
    // link.click();

    // let scaleFactor = 2;
    // exported.element.width = 1920 * scaleFactor;
    // exported.element.height = 1080 * scaleFactor;
    // exported.ctx.scale(scaleFactor, scaleFactor);
    // exported.ctx.drawImage(editor.element, 0, 0, 200, 200);
});

// Reset Button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener("click", function() {
    thumbnail.reset();
    drawCanvasGlobal();
});