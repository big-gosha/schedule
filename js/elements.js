// Main canvas
const root = document.body.children[0];
// const editorCanvas = new Canvas('canvas-editor', screenWidth, screenHeight)
// editorCanvas.element.width = screenWidth;
// editorCanvas.element.height = screenHeight;

const exportCanvas = new Canvas('canvas-export', bgWidth, bgHeight);
// exportCanvas.element.width = 1920;
// exportCanvas.element.height = 1080;

// Images
const bgImage = new Image();    bgImage.src = 'assets/BG.png';
const weekdayBgImage = new Image(); weekdayBgImage.src = 'assets/Box_online.png';

// Export Button
const exportButton = document.getElementById('export-button');
exportButton.addEventListener("click", async function() {

    artistName.drawAsCanvas(exportCanvas.ctx);
    week.forEach((day,i) => {
        day.setDrawAsCanvas(true)
    });

    drawCanvasGlobal();
    await delay(200);

    let tempCanvas = document.createElement('canvas');
    let ctx = tempCanvas.getContext("2d");
    tempCanvas.width = 1920; tempCanvas.height = 1080;
    ctx.drawImage(exportCanvas.element, 0, 0, 1920, 1080);

    await delay(500);

    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();

    await delay(300);
    drawCanvasGlobal();

    artistName.drawAsHtml();
    week.forEach((day,i) => {
        day.setDrawAsCanvas(false)
    });

    // link.href = exportCanvas.element.toDataURL("image/png");
    // let scaleFactor = 2;
    // exported.element.width = 1920 * scaleFactor;
    // exported.element.height = 1080 * scaleFactor;
    // exported.ctx.scale(scaleFactor, scaleFactor);
    // exported.ctx.drawImage(editor.element, 0, 0, 200, 200);
});
