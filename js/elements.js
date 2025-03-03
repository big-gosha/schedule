// Main canvasas
const root = document.body.children[0];
const editorCanvas = new Canvas('canvas-editor', screenWidth, screenHeight)
const exportCanvas = new Canvas('canvas-export', bgWidth, bgHeight);
const backgroundCanvas = new Canvas('canvas-background', bgWidth, bgHeight);
const foregroundCanvas = new Canvas('canvas-foreground', bgWidth, bgHeight);

// Images
const bgLeftImage = new Image();    bgLeftImage.src = 'assets/BG_Left.png';
const bgRightImage = new Image();   bgRightImage.src = 'assets/BG_Right.png';
const weekdayBgImage = new Image(); weekdayBgImage.src = 'assets/Box_online.png';

// File Browser
const fileBrowser = document.getElementById('file-browser');
fileBrowser.addEventListener("change", function(event) {
    let file = fileBrowser.files[0];
    let reader = new FileReader();
    if (!file) return;

    reader.onload = function(e) {
        thumbnail.image.onload = () => {
            thumbnail.isLoaded = true;
            thumbnail.reset(); 
            drawCanvasGlobal();
        }
        thumbnail.image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Export Button
const exportButton = document.getElementById('export-button');
exportButton.addEventListener("click", function() {

    // Say 'cheese' for the picture
    week.forEach((day,i) => {
        day.switchHtml(exportCanvas.ctx)
    });

    setTimeout(() => {
        const link = document.createElement("a");
        link.download = "canvas-image.png";
        link.href = exportCanvas.element.toDataURL("image/jpeg", 0.5);
        link.click();
    }, 300);

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
