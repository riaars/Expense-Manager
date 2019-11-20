/* @jsx m*/
class DishDetailsView {
    constructor(container, model, controller) {
      this.container = container;
      this.controller = controller;
      this.model = model;
      this.sidebarView = undefined;
      this.recipeListView = undefined;
    }
  
    jsx = () => (
      <div className="grid-container" style={{gridTemplateRows:"0 auto"}}>
        <div className="sidebar" id="sbv">sidebar</div>
        <div class="main" id="recipecontainer"><h1></h1></div>
        <div style="display:none" id="dishSearchView"></div>
      </div>
    ) 

    render() {
      m.render(this.container, this.jsx());

      if(this.sidebarView === undefined) 
        this.sidebarView = new SidebarView(this.container.querySelector("#sbv"), this.model, this.controller);
      
      
      if(this.recipeListView === undefined) 
        this.recipeListView = new RecipeView(this.container.querySelector("#recipecontainer"), this.model);

      this.afterRender();
    }
    
    afterRender() {
      this.sidebarView.render();
      this.recipeListView.render();
    }
  }