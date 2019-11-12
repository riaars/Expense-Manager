class RecipeView {
    constructor (container, model, dishId) {
        this.container = container;
        this.model = model;
        this.dishId = dishId;
    }

    render() {
        let innerHTML = `
        <div style="display:flex; flex-direction:left;">
        <div class="leftUpper" style="width:50%; padding:20px; text-align:left">
        <h2><div id="dish-title">Dish Title</div></h2>
            <div id="dish-image"></div>
            <div class="dish-description" style="text-align:justify;  font-size:80%;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Vivamus sagittis, quam vitae lobortis pharetra, arcu felis 
            tempus nisl, a rhoncus nisl nisl quis orci. 
            Sed faucibus, sapien at lobortis placerat, nisl 
            velit feugiat nulla, vitae consectetur enim 
            libero ut tortor. Proin erat mauris, 
            pretium eget sapien quis, auctor semper sem.</div>
            <div class="startBtn" id="go-back-details">Back to search</div>
            <div class="back-button"><h2>PREPARATION<h2></div>
            <div id="instructions-container" style="font-size:80%;"></div>
        </div>
        <div class="rightUpper" style="width:50%;">RU
            <div>INGREDIENTS LIST
            </div>
        </div>
        </div>
        `
        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender() {
        this.model.getDish(this.dishId).then( dish => {
            console.log(dish)
            //Append the image and title
            this.container.querySelector("#dish-title").innerHTML = dish.title;
            let imgElem = document.createElement("img");
            imgElem.setAttribute("src", dish.image);
            imgElem.setAttribute("style", "width:100%;");
            this.container.querySelector("#dish-image")
            .appendChild(imgElem);

            //Append the instructions
            let instructionElements = dish.analyzedInstructions[0].steps.map((stepInfo) => {
                console.log(stepInfo)
                let stepElem = document.createElement("div");
                let stepParagraph = document.createElement("p")
                stepElem.setAttribute("style", "padding-top:1em")
                stepParagraph.innerHTML = stepInfo.number +": " + stepInfo.step;
                stepElem.appendChild(stepParagraph);
                return stepElem;
            }).forEach((elem) => {
                this.container.querySelector("#instructions-container").appendChild(elem);
            });
                        
        })
        this.container.querySelector("#go-back-details").addEventListener("click", () => {window.location.hash = '#search';} )
    }
}