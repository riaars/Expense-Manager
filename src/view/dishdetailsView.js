class DishDetailsView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.sidebarView = undefined;
      this.dishDetailsView = undefined;
    }
  
    render(dishId) {
      let innerHTML = 
      `
      <div class="grid-container" style="grid-template-rows:minmax(100px, 10%) 0px auto">
        <div class="header"><h1>Dinner Planner</h1></div>
        <div class="sidebar" id="sbv">sidebar</div>
        <div class="main" id="selected-dish-info"><h1><h1></div>
        <div style="display:none" id="dishSearchView"></div>
      </div>
      `
      this.container.innerHTML = innerHTML;
      if(this.sidebarView === undefined) {
        this.sidebarView = new SidebarView(this.container.querySelector("#sbv"), this.model);
      }
      
      //Hardcode this view for now instead, shows the image adnd description of the dish
      //if(this.dishDetailsView === undefined) {
      //  this.dishDetailsView = new DishDetailsView(this.container.querySelector("#dishDetails"), this.model);
      //}
  

      this.afterRender();
    }
    
    dishDetailsInfo = () => {
      return `
      <div>Selected dish: Meatballs</div>
      <img src="/../images/meatballs.jpg">
      `
    } 
    
    
    afterRender() {
      this.container.querySelector("#selected-dish-info").innerHTML = this.dishDetailsInfo();
      this.sidebarView.render();
    }
  }
  