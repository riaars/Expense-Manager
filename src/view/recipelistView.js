class RecipeListView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      //this.model.subscribeToProperty(["dishes", "numberOfGuests"], this.updateMenu.bind(this));
    }
    updateRecipes(dishes, numGuests) {
        //React to changes in the model
    }
  
    render() {
      let innerHTML = 
      `
      <div id="recipelistcontainer">
      </div>
      `
    this.container.innerHTML = innerHTML;
    this.afterRender();
    }

    afterRender() {
      let recipelistcont = this.container.querySelector("#recipelistcontainer");
      this.model.getFullMenu().map((dish) => {   
        let elem = document.createElement("div");
        elem.classList.add("recipe-container");
        return {
          "elem": elem,
          "dish": dish
        }
      }).forEach((info) => {
        console.log(recipelistcont);
        new RecipeView(info.elem, info.dish).render();
        recipelistcont.appendChild(info.elem);
      }); 
    }
  }