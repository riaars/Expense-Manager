/* @jsx m*/
class RecipeView {
    constructor (container, model, dishId) {
        this.container = container;
        this.model = model;
        this.dishId = dishId;
        this.dish = undefined;
    }

    jsx = () => (
        <div className="recipeview-container">
          <div className="recipe-view-row-col">
          <h2><div id="dish-title">Dish Title</div></h2>
          <div id="dish-image"></div>
          <div class="dish-description" style="text-align:justify;  font-size:80%;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Vivamus sagittis, quam vitae lobortis pharetra, arcu felis 
            tempus nisl, a rhoncus nisl nisl quis orci. 
            Sed faucibus, sapien at lobortis placerat, nisl 
            velit feugiat nulla, vitae consectetur enim 
            libero ut tortor. Proin erat mauris, 
            pretium eget sapien quis, auctor semper sem.
          </div>
          <div className="startBtn" 
            id="go-back-details" 
            onclick={() => {window.location.hash = '#search';}}>
                Back to search
          </div>
          <div className="back-button"><h2>PREPARATION</h2></div>
          <div id="instructions-container" style={{fontSize:"80%"}}></div>
        </div>
        <div className="recipe-view-row-col">
          <div className="recipe-ingredients" style={{padding:"1em"}}>
            <div>
              <span>Igredients for &nbsp;</span>
              <span className="value-num-guests">{this.model.getNumberOfGuests()}</span>
              <span>&nbsp;people</span>
            </div>
            <div className="ingredients-inner" style={{padding:"1em"}}>
              <hr className="horizontal-line"/>
              <table className="ingredientslist-table" style={{width:"100%", paddingLeft:"1em", paddingRight:"1em"}}>
              </table>
              <hr className="horizontal-line"/>
              <div style={{display:"flex", 
              flexDirection:"row",
              alignItems:"center",
              justifyContent: "space-between"}}>
              <div className="startBtn" id="add-to-menu-button"
              onclick={() =>{
                this.model.getDish(this.dishId)
                .then(dish => {
                  this.model.addDishToMenu(dish);
                  window.location.hash = '#search';}
                )
              }}>
                Add to menu
              </div>
              <div>
                <span className="total price">SEK </span><span className="value-total-price" id="recipe-final-price"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

    render() {
        m.render(this.container, this.jsx());
        this.afterRender();
    }

    afterRender() {
        this.model.getDish(this.dishId).then( dish => {
            this.dish = dish;
            //Append the image and title
            m.render(this.container.querySelector("#dish-title"), dish.title);
            m.render(this.container.querySelector("#dish-image"),<img src={dish.image} style={{width:"100%"}}/>)
            //Set the totalPrice
            this.container.querySelector("#recipe-final-price").innerHTML =(dish.pricePerServing*this.model.getNumberOfGuests()).toFixed(2);

            //Append the instructions if there are any
            if(dish.analyzedInstructions[0]) {
              let stepsContent = dish.analyzedInstructions[0].steps.map((stepInfo) => (
                <div style={{paddingTop:"1em"}}>
                  <p>{stepInfo.number + ": " + stepInfo.step}</p>
                </div>
              ))
              m.render(this.container.querySelector("#instructions-container"), stepsContent)
            } else 
              this.container.querySelector("#instructions-container").innerHTML = "Instructions not clear, try sticking all the ingredients in a blender (API did not provide instructions)<br>Try reloading the page to get a new random dish!";
            
            //Append the ingredients
            let ingredientContent =  dish.extendedIngredients.map(ingredient => (
              <tr>
                <th>{parseFloat(parseFloat(ingredient.measures.metric.amount).toFixed(2)) + " " + ingredient.measures.metric.unitShort}</th>
                <th>{(ingredient.meta[0] || "") + " "  + ingredient.name}</th>
                <th>SEK</th>
                <th>??</th>
              </tr>
            ))
            m.render(this.container.getElementsByClassName("ingredientslist-table")[0], ingredientContent);
        })
    }
}