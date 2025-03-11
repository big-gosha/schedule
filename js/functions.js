// X Position
function xAdj (position){
    return position*wDpi;
}

// Y Position
function yAdj (position){
    return position*hDpi;
}

/**
 * Syntactic sugar to draw text, on the canvas.
 * @param {string} font Family name, size and style.
 * @param {string} color CSS color description.
 * @param {number} xPos Position x.
 * @param {number} yPos Position y.
 * @param {string} hrz Horizontality of the text.
 * @param {string} vrt Verticality of the text.
 * @param {*} text Data to be displayed in the text.
 * @param {CanvasRenderingContext2D} ctx Context of the canvas.
 */
function drawText(font = "Arial", color = "red", xPos = 0, yPos = 0, hrz = "center", vrt = "middle", text = "", ctx) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = hrz;
    ctx.textBaseline = vrt;
    ctx.fillText(`${text}`, xAdj(xPos), yAdj(yPos));
}

// Draw Image
function drawImage(image, xPos, yPos, width, height, ctx){
    ctx.drawImage(image, xAdj(xPos), yAdj(yPos), width*wDpi, height*hDpi);
}

/**
 * Syntactic sugar to draw text with an outline, on the canvas.
 * @param {string} font Family name, size and style.
 * @param {string} color CSS color description of the text fill.
 * @param {string} strokeColor CSS color description of the text outline.
 * @param {number} strokeWidth Size of the outline.
 * @param {number} xPos Position x.
 * @param {number} yPos Position y.
 * @param {string} hrz Horizontality of the text.
 * @param {string} vrt Verticality of the text.
 * @param {*} text Data to be displayed in the text.
 * @param {CanvasRenderingContext2D} ctx Context of the canvas.
 */
function drawTextStroke(font = "Arial", fontColor = "red", strokeColor = "black", strokeWidth = 2, xPos = 0, yPos = 0, hrz = "center", vrt = "middle", text = "", ctx) {
    ctx.font = font;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.textAlign = hrz;
    ctx.textBaseline = vrt;
    ctx.strokeText(`${text}`, xAdj(xPos), yAdj(yPos));
    drawText(font, fontColor, xPos, yPos, hrz, vrt, text, ctx);
}

// Draw Round Rect
function drawRoundRect (xPos, yPos, xSize, ySize, radius, color, ctx){
    ctx.beginPath();
    ctx.roundRect(xAdj(xPos), yAdj(yPos), xSize, ySize, radius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// Draw Input Field
function createInputField(element, font, color, width, height, placeholder){
    element.classList.add('inputText');
    element.placeholder = placeholder;
    element.style.color = color;
    element.style.font = font;
    element.style.height = height;
    element.style.width = width;
}

// Add To Root
function addToRoot(element, xPos, yPos, id, newRoot){
    element.id = id;
    element.classList.add('root-child');
    element.style.top = `${yAdj(yPos)}px`;
    element.style.left = `${xAdj(xPos)}px`;
    newRoot.appendChild(element);
}

function setPosition(element, xPos, yPos){
    element.style.top = `${yPos}px`;
    element.style.left = `${xPos}px`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resizeCanvas(width01, height01, width02, height02, dprFactor) {
    const dpr = window.devicePixelRatio;
    const canvasRect = exportCanvas.element.getBoundingClientRect();

    // Size(?) of the canvas (currently the size of the image on the background)
    exportCanvas.element.width = width01 * dpr * dprFactor;
    exportCanvas.element.height = height01 * dpr * dprFactor;

    // Resolution/quality
    exportCanvas.ctx.scale(dpr*dprFactor, dpr*dprFactor);

    // Outline of the canvas
    exportCanvas.element.style.width = `${width02*dprFactor}px`; // canvasRect.width
    exportCanvas.element.style.height = `${height02*dprFactor}px`;
}

function dayIntToStr(index){
    switch (index) {
        default:
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}
