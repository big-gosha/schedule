class WeekDay {
    constructor(xPosition, yPosition, date = new Date()) {       
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = 780;
        this.height = 132;
        this.xBox = this.xPosition+this.width;
        this.yBox = this.yPosition+this.height;

        this.name = dayIntToStr(date.getDay());
        this.hours = 22;
        this.dayOfMonth = date.getDate().toString().padStart(2, "0");
        this.enabled = false;
        this.drawAsCanvas = false;

        this.root = document.createElement("div");
        this.root.id = this.name;
        root.appendChild(this.root);
        
        this.timeInput = document.createElement("input");
        this.checkbox = document.createElement("input");
        this.titleInput = document.createElement("textarea");
        this.descInput = document.createElement("textarea");

        this.imageGetter = new ImageGetter(`${this.name}-image-getter`, this.xBox+25, this.yPosition+40);
        this.imageGetter.isBackground = false;

        this.estTime = "10:00 PM";
        this.cetTime = "08:00 PM";
        this.jstTime = "04:00 PM";
        
        // HTML elements
        this.timeInput.type = "time";
        this.timeInput.style.backgroundColor = "transparent";
        this.timeInput.value = `${this.hours}:00`;
        this.timeInput.style.padding = "0px";
        this.timeInput.style.margin = "0px";
        this.timeInput.style.color = "#4b4c51";
        this.timeInput.style.font = "bold 12px Calibri";
        addToRoot(this.timeInput, this.xBox-104, this.yPosition+50, `time-${this.name}`, this.root);
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
    }

    // Draw Schedule Day
    draw(ctx) {
        // always draw bg
        if (this.enabled) {
            drawImage(weekdayBgImage, this.xPosition, this.yPosition, this.width, this.height, ctx);

            let offsetDate = new Date();
            offsetDate.setMinutes(0);
            
            offsetDate.setHours(this.hours);
            this.estTime = offsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
            offsetDate.setHours(this.hours+6);
            this.cetTime = offsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            drawText("bold 12px Calibri", "#4b4c51", this.xBox-114, this.yPosition+74, 'left', 'middle', this.cetTime, ctx);
    
            offsetDate.setHours(this.hours+14);
            this.jstTime = offsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            drawText("bold 12px Calibri", "#4b4c51", this.xBox-114, this.yPosition+98, 'left', 'middle', this.jstTime, ctx);
        }

        if (this.drawAsCanvas){
            this.timeInput.style.visibility = "hidden";
            this.titleInput.style.visibility = "hidden";
            this.descInput.style.visibility = "hidden";
            this.imageGetter.root.style.visibility = "hidden";
            console.log('draw() -> drawing as canvas');

            let ctx = exportCanvas.ctx;
            drawText("bold 12px Calibri", "#4b4c51", this.xBox-114, this.yPosition+50, 'left', 'middle', this.estTime, ctx);
            drawText("bold 14px Calibri", "#4b4c51", this.xPosition+120-10, this.yPosition+50, 'left', 'middle', this.titleInput.value, ctx);
            drawText("12px scriptFont", "#4b4c51", this.xPosition+120-10, this.yPosition+80, 'left', 'middle', this.descInput.value, ctx);
        }
        else{
            console.log('draw() -> drawing as html');
            this.timeInput.style.visibility = this.enabled ? "visible" : "hidden";
            this.titleInput.style.visibility = this.enabled ? "visible" : "hidden";
            this.descInput.style.visibility = this.enabled ? "visible" : "hidden";
            this.imageGetter.root.style.visibility = this.enabled ? "visible" : "hidden";
        }
        
        let rectColor = this.enabled ? "rgb(235 255 185 / 70%)" : "rgb(245 226 131 / 70%)";
        let dayName = this.enabled ? this.name.slice(0,3).toLowerCase() : this.name.slice(0,3);
        let textPos = this.enabled ? this.xPosition+47 : this.xPosition+67;
        
        drawTextStroke("bold 40px Calibri", "#ffb1b1", "white", 6, this.xPosition+3, this.yPosition+78, 'center', 'middle', this.dayOfMonth, ctx); //124
        drawRoundRect(this.xPosition+7, this.yPosition+77, 54, 14, 8, rectColor, ctx);
        drawText('bold 15px Calibri', '#51484b', textPos, this.yPosition+90, 'center', 'middle', dayName, ctx);
    }

    setDrawAsCanvas (bool){
        this.drawAsCanvas = bool;
    }
}
