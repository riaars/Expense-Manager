class DishDetailsView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.sidebarView = undefined;
      this.recipeListView = undefined;
    }
  
    render(dishId = 512) {
      console.log(dishId);
      let innerHTML = 
      `
      <div class="grid-container" style="grid-template-rows:minmax(100px, 10%) 0px auto">
        <div class="header"><h1>Dinner Planner</h1></div>
        <div class="sidebar" id="sbv">sidebar</div>
        <div class="main" id="recipecontainer"><h1><h1></div>
        <div style="display:none" id="dishSearchView"></div>
      </div>
      `
      this.container.innerHTML = innerHTML;
      if(this.sidebarView === undefined) {
        this.sidebarView = new SidebarView(this.container.querySelector("#sbv"), this.model);
      }
      
      if(this.recipeListView === undefined) {
        this.recipeListView = new RecipeView(this.container.querySelector("#recipecontainer"), this.model, dishId);
      }
  

      this.afterRender();
    }
    
    dishDetailsInfo = () => {
      return `
      <div>Selected dish: Meatballs</div>
      <img src="/../images/meatballs.jpg">
      `
    } 
    
    
    afterRender() {
      this.sidebarView.render();
      this.recipeListView.render();
    }
  }
  