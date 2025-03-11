const date = new Date();
var week, sunday, monday, tuesday, wednesday, thursday, friday, saturday = 0;

const artistName = new ProxyText('bold 10px Calibri', '#fffaec', 150, 10, 200, 1026, 'twitter', 'art-name-text');
root.appendChild(artistName.element);

// Canvas how it should be displayed in a 4k monitor (is half the size of screen)
// resizeCanvas(1920, 1080, bgWidth, bgHeight, 1.0);

// Canvas fitting inside of the browser (slightly smaller than 4k)
resizeCanvas(bgWidth, bgHeight, bgWidth, bgHeight, 1.0);
const transformTool = new TransformTool();
transformTool.hide();

const thumbPicker = new ImageGetter('thumbnail', 260, 160);
var getters = [thumbPicker];

document.addEventListener("onStateSet", function(event) {
    if (event.detail.state === 'none') {
        week.forEach(item => {
            item.setDrawAsCanvas(false);
        });
        drawCanvasGlobal();
    }
    else {
        week.forEach(item => {
            item.setDrawAsCanvas(true);
        });
        drawCanvasGlobal();
    }
});

loadAssets();
document.addEventListener("onAssetsLoaded", () => {
    setPosition(exportButton, bgWidth+22, 110);

    date.setDate(date.getDate()-date.getDay());
    sunday = new WeekDay(1001, 46, date);

    date.setDate(date.getDate() + 1);
    monday = new WeekDay(1001, 189, date);

    date.setDate(date.getDate() + 1);
    tuesday = new WeekDay(1001, 332, date);

    date.setDate(date.getDate() + 1);
    wednesday = new WeekDay(1001, 475, date);

    date.setDate(date.getDate() + 1);
    thursday = new WeekDay(1001, 618, date);

    date.setDate(date.getDate() + 1);
    friday = new WeekDay(1001, 761, date);

    date.setDate(date.getDate() + 1);
    saturday = new WeekDay(1001, 904, date);
    week = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];

    getters = [ 
        sunday.imageGetter, 
        monday.imageGetter, 
        tuesday.imageGetter, 
        wednesday.imageGetter, 
        thursday.imageGetter, 
        friday.imageGetter, 
        saturday.imageGetter];

    drawCanvasGlobal();
});

function drawCanvasGlobal(){
    exportCanvas.ctx.clearRect(0, 0, bgWidth, bgHeight);

    if (transformTool.state !== 'none' && transformTool.target.isBackground){
        drawTransformTool();
    }
    
    drawImageGetter(thumbPicker);
    exportCanvas.ctx.drawImage(bgImage, 0, 0, bgWidth, bgHeight);

    drawText('bold 26px Calibri', '#ffbf8d', 85, 110, 'center', 'middle', today, exportCanvas.ctx);
    drawText('bold 11px Calibri', '#858a90', 85, 135, 'center', 'middle', nowMonth, exportCanvas.ctx);
    drawText('bold 26px Calibri', '#c1dc71', 85, 261, 'center', 'middle', nextDay, exportCanvas.ctx);
    drawText('bold 11px Calibri', '#858a90', 85, 286, 'center', 'middle', nextMonth, exportCanvas.ctx);

    sunday.draw(exportCanvas.ctx);
    monday.draw(exportCanvas.ctx);
    tuesday.draw(exportCanvas.ctx);
    wednesday.draw(exportCanvas.ctx);
    thursday.draw(exportCanvas.ctx);
    friday.draw(exportCanvas.ctx);
    saturday.draw(exportCanvas.ctx);

    getters.forEach(item => {
        drawImageGetter(item);
    });

    if (transformTool.state !== 'none' && !transformTool.target.isBackground){
        drawTransformTool();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
// TODO
//
// button to generate random stream name
//
// declare css classess to use their values in several canvases fields

function drawImageGetter (item){
    if (item.imageIsLoaded === false || item.imageIsSet === false) return;

    exportCanvas.ctx.save();
    let width = item.transform.scaleX * item.image.width;
    let height = item.transform.scaleY * item.image.height;

    exportCanvas.ctx.translate(-10, -10); // (background,foreground) margin
    exportCanvas.ctx.translate(item.transform.positionX+40+15, item.transform.positionY+40+15); // (scale,rotate) padding
    exportCanvas.ctx.translate((width * 0.5), (height * 0.5)); // anchor point from top-left to center
    exportCanvas.ctx.rotate(item.transform.angle * (Math.PI / 180));

    exportCanvas.ctx.drawImage(
        item.image, 
        width * -0.5,
        height * -0.5,
        width,
        height);
    exportCanvas.ctx.restore();
}

function drawTransformTool (){
    if (transformTool.state !== 'none'){
        exportCanvas.ctx.save();
        let width = transformTool.transform.scaleX * transformTool.image.width;
        let height = transformTool.transform.scaleY * transformTool.image.height;
    
        exportCanvas.ctx.translate(-10, -10); // (background,foreground) margin
        exportCanvas.ctx.translate(transformTool.transform.positionX+40+15, transformTool.transform.positionY+40+15); // (scale,rotate) padding
        exportCanvas.ctx.translate((width * 0.5), (height * 0.5)); // anchor point from top-left to center
        exportCanvas.ctx.rotate(transformTool.transform.angle * (Math.PI / 180));
    
        exportCanvas.ctx.drawImage(
            transformTool.image, 
            width * -0.5,
            height * -0.5,
            width,
            height);
        exportCanvas.ctx.restore();
    }
}
