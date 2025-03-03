const moveBox = document.getElementById("move-box");
const scaleBox = document.getElementById("scale-box");
const rotateBox = document.getElementById("rotate-box");

// Move
moveBox.onmousedown = (e) => {
    function onMouseMove(e) {
        thumbnail.transform.positionX += e.movementX;
        thumbnail.transform.positionY += e.movementY;
        drawCanvasGlobal();
        //drawThumbnail();
        e.stopPropagation();
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        e.stopPropagation();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.stopPropagation();
};

// Scale
scaleBox.onmousedown = (e) => {
    function onMouseMove(e) {
        let delta = e.movementX * 0.003;
        thumbnail.transform.scaleX += delta;
        thumbnail.transform.scaleY += delta;
        drawCanvasGlobal();
        //drawThumbnail();
        e.stopPropagation();
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        e.stopPropagation();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.stopPropagation();
};

// Rotate
rotateBox.onmousedown = (e) => {
    function onMouseMove(e) {
        let delta = e.movementX * 0.15;
        thumbnail.transform.angle += delta;
        drawCanvasGlobal();
        //drawThumbnail();
        e.stopPropagation();
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        e.stopPropagation();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.stopPropagation();
};

////////////////////////////////////////////////////////
// Turn white pixels into transparent
//
// thumbnail.canvas.ctx.drawImage(thumbnail.image, 
//     0,
//     0,
//     512,
//     512);
//
// let imageData = thumbnail.canvas.ctx.getImageData(0, 0, 512, 512);
// let data = imageData.data;
//
// for (let i = 0; i < data.length; i += 4) {
//     let threshold = 240;
//     let firstDiff = data[i+0] - threshold;
//     let secondDiff = data[i+1] - threshold;
//     let thirdDiff = data[i+2] - threshold;
//
//     if (firstDiff >= 0 && secondDiff >= 0 && thirdDiff >= 0) {
//         data[i + 3] = 0;
//     }
// }
//
// thumbnail.canvas.ctx.putImageData(imageData, 0, 0);
