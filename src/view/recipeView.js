class RecipeView {
    constructor (container, model, dishId) {
        this.container = container;
        this.model = model;
        this.dishId = dishId;
        this.dish = undefined;
    }

    render() {
        let innerHTML = `
        <div class="recipeview-container">
        <div class="leftUpper" style="width:50%; padding:1em;">
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
            <div id="instructions-container" style="font-size:80%;">
            </div>
        </div>
        <div class="rightUpper" style="width:50%; padding:1em">
            
            <div class="recipe-ingredients" style="padding:1em">
            <div>
                <span>Igredients for &nbsp;</span>
                <span class="value-num-guests"></span>
                <span>&nbsp;people</span>
            </div>
            <div class="ingredients-inner" style="padding:1em;">
                <hr class="horizontal-line">
                <table class="ingredientslist-table" style="width:100%; padding-left:1em; padding-right:1em;">
                </table>
                <hr class="horizontal-line">
                <div style="display:flex; flex-direction:row;
                align-items: center;
                justify-content: space-between;"
                >
                    <div class="startBtn" id="add-to-menu-button">
                        Add to menu
                    </div>
                    <div>
                        <span class="total price">SEK </span><span class="value-total-price" id="recipe-final-price"></span>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        `
        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender() {
        this.container.querySelector("#add-to-menu-button").addEventListener("click", () =>{
            this.model.getDish(this.dishId).then(dish => {
                this.model.addDishToMenu(dish);
                window.location.hash = '#search';
            })
        });

        this.model.getDish(this.dishId).then( dish => {
            this.dish = dish;
            //Append the image and title
            this.container.querySelector("#dish-title").innerHTML = dish.title;
            let imgElem = document.createElement("img");
            imgElem.setAttribute("src", dish.image);
            imgElem.setAttribute("style", "width:100%;");
            this.container.querySelector("#dish-image")
            .appendChild(imgElem);

            //Append the instructions if there are any
            if(dish.analyzedInstructions[0]) {
                
                dish.analyzedInstructions[0].steps.map((stepInfo) => {
                    let stepElem = document.createElement("div");
                    let stepParagraph = document.createElement("p")
                    stepElem.setAttribute("style", "padding-top:1em")
                    stepParagraph.innerHTML = stepInfo.number +": " + stepInfo.step;
                    stepElem.appendChild(stepParagraph);
                    return stepElem;
                }).forEach((elem) => {
                    this.container.querySelector("#instructions-container").appendChild(elem);
                });   
            } else 
                this.container.querySelector("#instructions-container").innerHTML = "Instructions not clear, try sticking all the ingredients in a blender (API did not provide instructions)";
            
            //Append the ingredients
            "display: flex; justify-content: space-between;"
            dish.extendedIngredients.map(ingredient => {
                            //parse(parse()) => Max 2 dec, but remove trailing zeros
                let textC1 = parseFloat(parseFloat(ingredient.measures.metric.amount).toFixed(2)) + " " + ingredient.measures.metric.unitShort 
                let textC2 = (ingredient.meta[0] || "") + " "  + ingredient.name;
                let colCreator = (text) => {
                    let col = document.createElement("th")
                    col.innerHTML = text;
                    return col;
                }
                let rowElem = document.createElement("tr");
                rowElem.appendChild(colCreator(textC1))
                rowElem.appendChild(colCreator(textC2))
                rowElem.appendChild(colCreator("SEK"))
                rowElem.appendChild(colCreator("??"))
                
                
                //textElement.innerHTML = text;
                return rowElem; 
            }).forEach(elem => {
                this.container.getElementsByClassName("ingredientslist-table")[0].appendChild(elem);
            })      
            this.container.querySelector("#recipe-final-price").innerHTML = dish.pricePerServing*this.model.getNumberOfGuests();
        })
        this.container.getElementsByClassName("value-num-guests")[0].innerHTML = this.model.getNumberOfGuests();
        this.container.querySelector("#go-back-details").addEventListener("click", () => {window.location.hash = '#search';} )
    }
}