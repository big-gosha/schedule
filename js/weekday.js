class WeekDay {
    constructor(xPosition, yPosition, name) {       
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = 780;
        this.height = 132;
        this.xBox = this.xPosition+this.width;
        this.yBox = this.yPosition+this.height;

        this.name = name;
        this.hours = 22;
        this.enabled = false;
        //this.initialized = false;

        this.root = document.createElement("div");
        this.root.id = name;
        root.appendChild(this.root);

        // this.canvas = document.createElement("canvas");
        // this.canvas.id = `canvas-${name}`;
        // this.ctx = this.canvas.getContext("2d");
        // this.canvas.style.top = '0px';
        // this.canvas.style.left = '0px';
        // this.canvas.style.margin = '10px';
        // this.canvas.width = bgWidth;
        // this.canvas.height = bgHeight;
        // this.canvas.classList.add('canvas', 'ground');
        // this.root.appendChild(this.canvas);
        
        this.timeInput = document.createElement("input");
        this.checkbox = document.createElement("input");
        this.titleInput = document.createElement("textarea");
        this.descInput = document.createElement("textarea");

        this.estTime = "10:00 PM";
        this.cetTime = "08:00 PM";
        this.jstTime = "04:00 PM";
        
        // this.createElements();
        // HTML elements
        this.timeInput.type = "time";
        this.timeInput.style.backgroundColor = "transparent";
        this.timeInput.value = `${this.hours}:00`;
        this.timeInput.style.padding = "0px";
        this.timeInput.style.margin = "0px";
        this.timeInput.style.color = "#4b4c51";
        this.timeInput.style.font = "bold 12px Calibri";
        addToRoot(this.timeInput, this.xBox-100, this.yPosition+50, `time-${this.name}`, this.root);
        this.timeInput.addEventListener("input", () => {
            const date = new Date();
            const [newHours, minutes] = this.timeInput.value.split(":").map(Number);
            this.hours = newHours;
            drawCanvasGlobal();
        },false,);

        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        addToRoot(this.checkbox, this.xPosition+75, this.yPosition+35, `checkbox-${this.name}`, this.root);
        this.checkbox.addEventListener("change", () => {
            this.enabled = this.checkbox.checked;
            drawCanvasGlobal();
        });

        this.titleInput = document.createElement("textarea");
        createInputField(this.titleInput, "bold 14px Calibri", "#4b4c51", "280px", "15px", "Title");
        addToRoot(this.titleInput, this.xPosition+130, this.yPosition+50, `title-${this.name}`, this.root);

        this.descInput = document.createElement("textarea");
        createInputField(this.descInput, "12px scriptFont", "#4b4c51", "280px", "30px", "Description");
        addToRoot(this.descInput, this.xPosition+130, this.yPosition+80, `desc-${this.name}`, this.root);

        //this.initialized = true;
    }

    // Draw Schedule Day
    draw(ctx) {
        this.timeInput.style.visibility = this.enabled ? "visible" : "hidden";
        this.titleInput.style.visibility = this.enabled ? "visible" : "hidden";
        this.descInput.style.visibility = this.enabled ? "visible" : "hidden";
        if (!this.enabled) return;

        let offsetDate = new Date();
        offsetDate.setMinutes(0);

        drawImage(weekdayBgImage, this.xPosition, this.yPosition, this.width, this.height, ctx);
        
        offsetDate.setHours(this.hours);
        this.estTime = offsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        offsetDate.setHours(this.hours+6);
        this.cetTime = offsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        drawText("bold 12px Calibri", "#4b4c51", this.xBox-114, this.yPosition+74, 'left', 'middle', this.cetTime, ctx);

        offsetDate.setHours(this.hours+14);
        this.jstTime = offsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        drawText("bold 12px Calibri", "#4b4c51", this.xBox-114, this.yPosition+98, 'left', 'middle', this.jstTime, ctx);
    }

    async switchHtml(ctx) {
        let titlePrev = this.titleInput.style.visibility;
        let descPrev = this.descInput.style.visibility;
        let timePrev = this.timeInput.style.visibility;
        let checkPrev = this.checkbox.style.visibility;

        await delay(200);

        this.titleInput.style.visibility = 'hidden';
        this.descInput.style.visibility = 'hidden';
        this.timeInput.style.visibility = 'hidden';
        this.checkbox.style.visibility = 'hidden';

        if (this.enabled){
            drawText("bold 12px Calibri", "#4b4c51", this.xBox-114, this.yPosition+50, 'left', 'middle', this.estTime, ctx);
            drawText("bold 14px Calibri", "#4b4c51", this.xPosition+120-10, this.yPosition+50, 'left', 'middle', this.titleInput.value, ctx);
            drawText("12px scriptFont", "#4b4c51", this.xPosition+120-10, this.yPosition+80, 'left', 'middle', this.descInput.value, ctx);
        }

        await delay(500);

        this.titleInput.style.visibility = titlePrev;
        this.descInput.style.visibility = descPrev;
        this.timeInput.style.visibility = timePrev;
        this.checkbox.style.visibility = checkPrev;
        drawCanvasGlobal();
    }

    createElements (){
        if (this.initialized === true){
            return;
        }


    }
}
