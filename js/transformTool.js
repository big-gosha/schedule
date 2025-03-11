class TransformTool{
    // Constructor
    constructor(){
        this.tool = document.getElementById("transform-tool");
        this.moveBox = document.getElementById("move-box");
        this.scaleBox = document.getElementById("scale-box");
        this.rotateBox = document.getElementById("rotate-box");
        this.canvas = document.getElementById("canvas-thumbnail");
        this.confirmButton = document.getElementById("confirm-transform");
        this.cancelButton = document.getElementById("cancel-transform");
        this.transform = new Transform();
        this.state = 'none';
        this.image = new Image();
        this.update();
        this.target = undefined;
        let tool = this;

        this.cancelButton.addEventListener("click", function() {
            tool.target.cancelEdit();
            tool.hide();
            drawCanvasGlobal();
        });

        this.confirmButton.addEventListener("click", function() {
            tool.target.confirmEdit(tool.transform);
            tool.hide();
            drawCanvasGlobal();
        });
        
        document.addEventListener("mousemove", (e) => {
            if (e.buttons !== 1) return;
            if (tool.state === 'idle' || tool.state === 'none') return;

            if (tool.state === 'move'){
                tool.transform.positionX += e.movementX;
                tool.transform.positionY += e.movementY;
            }
            else if (this.state === 'scale'){
                let delta = e.movementX * 0.003 * (540 / this.transform.width);
                tool.transform.scaleX += delta;
                tool.transform.scaleY += delta;    
            }
            else if (tool.state === 'rotate'){
                let delta = e.movementX * 0.18;
                tool.transform.angle += delta;
            }

            tool.update();
            drawCanvasGlobal();
            e.stopPropagation();
        });

        this.moveBox.onmousedown = (e) => {this.state = 'move'; e.stopPropagation();};
        this.moveBox.onmouseup = (e) => {this.state = 'idle'; e.stopPropagation();};

        this.scaleBox.onmousedown = (e) => {this.state = 'scale'; e.stopPropagation();};
        this.scaleBox.onmouseup = (e) => {this.state = 'idle'; e.stopPropagation();};

        this.rotateBox.onmousedown = (e) => {this.state = 'rotate'; e.stopPropagation();};
        this.rotateBox.onmouseup = (e) => {this.state = 'idle'; e.stopPropagation();};

        this.onStateSet = new CustomEvent("onStateSet", { detail: {state: this.state}});
    }

    // Update
    update (){
        this.tool.style.transform = `translate(${this.transform.positionX}px, ${this.transform.positionY}px)`;
        this.rotateBox.style.transform = `rotate(${this.transform.angle}deg)`;

        this.canvas.width = this.transform.width * this.transform.scaleX;
        this.canvas.height = this.transform.height * this.transform.scaleY;
    }

    // Hide
    hide (){
        this.tool.style.visibility = 'hidden';
        this.image = undefined;
        this.target = undefined;

        this.state = 'none';
        this.onStateSet = new CustomEvent("onStateSet", { detail: {state: this.state}});
        document.dispatchEvent(this.onStateSet);
    }

    // Show
    show (getter){
        this.target = getter;
        this.target.imageIsSet = false;
        this.image = getter.image;
        this.tool.style.visibility = 'visible';

        this.state = 'idle';
        this.onStateSet = new CustomEvent("onStateSet", { detail: {state: this.state}});
        document.dispatchEvent(this.onStateSet);

        if (getter.transform.scaleX !== 1 || getter.transform.scaleY !== 1 ){
            this.transform.scaleX = getter.transform.scaleX;
            this.transform.scaleY = getter.transform.scaleY;
        }
        else if (this.image.height > 540){
            let ratio = this.image.height / yAdj(540);
            this.transform.scaleX = 1 / ratio;
            this.transform.scaleY = 1 / ratio;
        }
        else if (this.image.width > 960) {
            let ratio = this.image.width / xAdj(960);
            this.transform.scaleX = 1 / ratio;
            this.transform.scaleY = 1 / ratio;
        }
        else{
            this.transform.scaleX = 1;
            this.transform.scaleY = 1;
        }

        this.transform.width = this.image.width;
        this.transform.height = this.image.height;
        this.transform.positionX = getter.transform.positionX;
        this.transform.positionY = getter.transform.positionY;
        this.transform.angle = getter.transform.angle;
        
        this.update();
    }
}

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
