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
 * @param {*} text Data to be displayed in the text.
 * @param {CanvasRenderingContext2D} ctx Context of the canvas.
 */
function drawTextStroke(font = "Arial", color = "red", strokeColor = "black", strokeWidth = 2, xPos = 0, yPos = 0, text = "", ctx) {
    ctx.font = font;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeText(`${text}`, xAdj(xPos), yAdj(yPos));
    drawText(font, color, xPos, yPos, 'center', 'middle', text, ctx);
}

// Draw Round Rect
function drawRoundRect (xPos, yPos, xSize, ySize, radius, color, ctx){
    ctx.beginPath();
    ctx.roundRect(xAdj(xPos), yAdj(yPos), xSize, ySize, radius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// Draw Weekday
function drawWeekday(xPos, yPos, day, ctx){
    drawRoundRect(xPos, yPos, 54, 14, 8, "rgb(245 226 131 / 70%)", ctx);
    drawText('bold 15px Calibri', '#51484b', xPos+60, yPos+11, 'center', 'middle', day, ctx);
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

// Get Date String
function getDateString(date, incr){
    date.setDate(date.getDate() + incr);
    return (date.getDate()).toString().padStart(2, "0");
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

function getTransformValues(element) {
    // Get computed style of the element
    const style = window.getComputedStyle(element);
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    // If no transform is applied, return defaults
    if (!transform || transform === "none") {
        return { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, rotation: 0 };
    }

    // Extract matrix values from: "matrix(a, b, c, d, e, f)"
    const values = transform.match(/matrix\(([^)]+)\)/);
    if (!values) return null; // Matrix not found

    const [a, b, c, d, e, f] = values[1].split(",").map(Number);

    // Compute transformation values
    const scaleX = Math.sqrt(a * a + b * b);  // Scaling in X
    const scaleY = Math.sqrt(c * c + d * d);  // Scaling in Y
    const rotation = Math.atan2(b, a) * (180 / Math.PI); // Rotation in degrees
    const translateX = e; // Translation in X
    const translateY = f; // Translation in Y

    return { scaleX, scaleY, translateX, translateY, rotation };
}
