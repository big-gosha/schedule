// Class ImageGetter
class ImageGetter {
    constructor(id, xPos, yPos) {
        this.name = id;
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = new Image();
        this.transform = new Transform();
        this.isBackground = true;
        this.imageIsLoaded = false;
        this.imageIsSet = false;

        this.root = document.createElement('div');
        this.root.classList.add('root-child');
        addToRoot(this.root, 0, 0, `${this.name}-getter-root`, root);

        this.editButton = document.createElement('button');
        this.editButton.style.padding = '3px 6px';
        this.editButton.innerHTML = 'Edit';
        this.editButton.style.visibility = 'hidden';
        addToRoot(this.editButton, this.xPos, this.yPos, `${this.name}-edit-button`, this.root);

        this.imagePickerDiv = document.createElement('div');
        this.imagePickerDiv.classList.add('root-child');
        this.imagePickerDiv.style.textAlign = 'left';
        this.imagePickerDiv.style.lineHeight = '1.5rem';
        this.imagePickerDiv.style.textShadow = '1px 1px 1px black'; /* offset-x | offset-y | blur-radius | color */
        // addToRoot(this.imagePickerDiv, this.xBox+25, this.yPosition+40, `${this.name}-image-picker`, root);
        addToRoot(this.imagePickerDiv, this.xPos, this.yPos, `${this.name}-image-picker`, this.root);
        
        this.fileBrowserLabel = document.createElement('label');
        this.fileBrowserLabel.id = `${this.name}-file-browser-label`;
        this.fileBrowserLabel.style.padding = '3px 6px';
        this.fileBrowserLabel.innerHTML = 'Browse';
        this.fileBrowserLabel.htmlFor = `${this.name}-file-browser`;
        
        let lineBreak01 = document.createElement('br');
        let lineBreak02 = document.createElement('br');
        
        this.pasteFileButton = document.createElement('button');
        this.pasteFileButton.id = `${this.name}-paste-button`;
        this.pasteFileButton.style.padding = '3px 6px';
        this.pasteFileButton.innerHTML = 'Paste';
        
        this.fileBrowser = document.createElement('input');
        this.fileBrowser.id = `${this.name}-file-browser`;
        this.fileBrowser.type = 'file';
        this.fileBrowser.accept = 'image/*';
        this.fileBrowser.style.visibility = 'collapse';
        
        this.imagePickerDiv.appendChild(this.fileBrowserLabel);
        this.imagePickerDiv.appendChild(lineBreak01);
        this.imagePickerDiv.appendChild(lineBreak02);
        this.imagePickerDiv.appendChild(this.pasteFileButton);
        this.imagePickerDiv.appendChild(this.fileBrowser);
        
        this.fileBrowserLabel.insertAdjacentText("afterend", " for an image");
        lineBreak01.insertAdjacentText("afterend", "or"); //"&nbsp;&nbsp;or"
        this.pasteFileButton.insertAdjacentText("afterend", " an image");

        let getter = this;
        this.fileBrowser.addEventListener("change", function(event) {
            let file = this.files[0];
            let reader = new FileReader();
            if (!file) return;
            
            reader.onload = function(e) {
                getter.image.onload = () => {
                    getter.imageIsLoaded = true;
                    transformTool.show(getter);
                    getter.editButton.style.visibility = 'hidden';
                    getter.imagePickerDiv.style.visibility = 'hidden';

                    // send this image to transformTool
                    // hide 'file-browser'
                    // show 'edit button'
                    // logic to draw this image on canvasGlobal

                    // this.resetMatrix();
                    drawCanvasGlobal();
                }
                getter.image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        this.pasteFileButton.addEventListener("click", async function() {
            const clipboardItems = await navigator.clipboard.read();
            for (const item of clipboardItems) 
            {
                for (const type of item.types) 
                {
                    if (type.startsWith("image/")) 
                    {
                        const blob = await item.getType(type);
                        getter.image = new Image();
        
                        getter.image.onload = function () 
                        {
                            getter.imageIsLoaded = true;
                            transformTool.show(getter);
                            getter.editButton.style.visibility = 'hidden';
                            getter.imagePickerDiv.style.visibility = 'hidden';
                            drawCanvasGlobal();
                        };
        
                        getter.image.src = URL.createObjectURL(blob);
                        return;
                    }
                }
            }
            alert("No image found in clipboard!");
        });

        this.editButton.addEventListener("click", async function() {
            transformTool.show(getter);
            getter.imageIsSet = false;
            getter.editButton.style.visibility = 'hidden';
            getter.imagePickerDiv.style.visibility = 'hidden';
            drawCanvasGlobal();
        });
    }

    cancelEdit (){
        // return to last place?
        this.imageIsSet = false;
        this.transform.reset();
        this.editButton.style.visibility = 'hidden';
        this.imagePickerDiv.style.visibility = 'visible';
        drawCanvasGlobal();
    }

    confirmEdit (transform){
        this.imageIsSet = true;
        this.transform.copyFrom(transform);
        this.editButton.style.visibility = 'visible';
        this.imagePickerDiv.style.visibility = 'hidden';
        drawCanvasGlobal();
    }

    resetMatrix (){
        this.transform = new Transform();
    }
}

