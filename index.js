const sunday = new WeekDay(1001, 46, "Sunday");
const monday = new WeekDay(1001, 189, "Monday");
const tuesday = new WeekDay(1001, 332, "Tuesday");
const wednesday = new WeekDay(1001, 475, "Wednesday");
const thursday = new WeekDay(1001, 618, "Thursday");
const friday = new WeekDay(1001, 761, "Friday");
const saturday = new WeekDay(1001, 904, "Saturday");
const week = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];

// Get the DPR and size of the canvas
const dpr = window.devicePixelRatio;
const canvasRect = exportCanvas.element.getBoundingClientRect();

// Set the actual(?) size of the canvas
exportCanvas.element.width = bgWidth * dpr;
exportCanvas.element.height = bgHeight * dpr;

// Resolution/quality
exportCanvas.ctx.scale(dpr, dpr);

// Outline of the canvas
exportCanvas.element.style.width = `${bgWidth}px`; // canvasRect.width
exportCanvas.element.style.height = `${bgHeight}px`;

loadAssets();
document.addEventListener("onAssetsLoaded", () => {
    setPosition(fileBrowser, bgWidth+22, 30);
    setPosition(resetButton, bgWidth+22, 70);
    setPosition(exportButton, bgWidth+22, 110);

    drawCanvasGlobal();
    backgroundCanvas.element.style.visibility = "hidden";
    foregroundCanvas.element.style.visibility = "hidden";
    thumbnail.canvas.element.style.visibility = "visible";
});

function drawCanvasGlobal(){
    exportCanvas.ctx.clearRect(0, 0, bgWidth, bgHeight);
    thumbnail.canvas.ctx.clearRect(0, 0, bgWidth, bgHeight);
    
    thumbnail.update();
    if (thumbnail.isLoaded){
        exportCanvas.ctx.save();
        let width = thumbnail.transform.scaleX * thumbnail.image.width;
        let height = thumbnail.transform.scaleY * thumbnail.image.height;

        exportCanvas.ctx.translate(-10, -10); // background/foreground margin
        exportCanvas.ctx.translate(thumbnail.transform.positionX+40+15, thumbnail.transform.positionY+40+15); // scale/rotate padding
        exportCanvas.ctx.translate((width * 0.5), (height * 0.5)); // anchor point from top-left to center
        exportCanvas.ctx.rotate(thumbnail.transform.angle * (Math.PI / 180));

        exportCanvas.ctx.drawImage(
            thumbnail.image, 
            width * -0.5,
            height * -0.5,
            width,
            height);
        exportCanvas.ctx.restore();
    }
    
    exportCanvas.ctx.drawImage(bgLeftImage, 0, 0, bgWidth, bgHeight);
    exportCanvas.ctx.drawImage(bgRightImage, 0, 0, bgWidth, bgHeight);

    drawText('bold 26px Calibri', '#ffbf8d', 85, 110, 'center', 'middle', today, exportCanvas.ctx);
    drawText('bold 11px Calibri', '#858a90', 85, 135, 'center', 'middle', nowMonth, exportCanvas.ctx);
    drawText('bold 26px Calibri', '#c1dc71', 85, 261, 'center', 'middle', nextDay, exportCanvas.ctx);
    drawText('bold 11px Calibri', '#858a90', 85, 286, 'center', 'middle', nextMonth, exportCanvas.ctx);

    const date = new Date();
    date.setDate(date.getDate()-date.getDay());
    let incrDate = date.getDate();

    incrDate = getDateString(date, 0);
    sunday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 124, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 123, "Sun", exportCanvas.ctx);

    incrDate = getDateString(date, 1);
    monday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 267, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 266, "Mon", exportCanvas.ctx);

    incrDate = getDateString(date, 1);
    tuesday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 410, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 409, "Tue", exportCanvas.ctx);

    incrDate = getDateString(date, 1);
    wednesday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 553, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 554, "Wed", exportCanvas.ctx);

    incrDate = getDateString(date, 1);
    thursday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 696, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 695, "Thu", exportCanvas.ctx);

    incrDate = getDateString(date, 1);
    friday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 840, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 839, "Fri", exportCanvas.ctx);

    incrDate = getDateString(date, 1);
    saturday.draw(exportCanvas.ctx);
    drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, 1004, 982, incrDate, exportCanvas.ctx);
    drawWeekday(1008, 981, "Sat", exportCanvas.ctx);
}

//////////////////////////////////////////////////////////////////////////////////////////
// BACKUP 

// let intervalID = setInterval(() => {
//     console.log("Repeating action...");
// }, 1000);

// let width = thumbnail.image.width;
// let height = thumbnail.image.height;
// let transform = getTransformValues(rotateBox);

// exportCanvas.ctx.save();
// exportCanvas.ctx.scale(thumbnail.transform.scaleX / width, thumbnail.transform.scaleY / height);
// exportCanvas.ctx.translate(transform.translateX+47+(width*0.5), transform.translateY+47+(height*0.5));
// exportCanvas.ctx.rotate(transform.rotation * (Math.PI / 180));
// exportCanvas.ctx.drawImage(thumbnail.image, -width * 0.5, -height * 0.5);
// exportCanvas.ctx.restore();

//////////////////////////////////////////////////////////////////////////////////////////
// TODO
//
// weekday rect becomes green
// weekday text becomes lowercase and maybe change alignment to middle?
// button to generate random stream name
//
// declare css classess to use their values in several canvases fields
