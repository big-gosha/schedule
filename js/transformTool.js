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
