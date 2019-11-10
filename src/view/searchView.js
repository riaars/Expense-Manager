class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.sidebarView = undefined;
    this.dishSearchView = undefined;
  }

  render(dishId) {
    let innerHTML = 
    `
    <div class="grid-container">
    <div id="loader" style="display:none">Loading...</div>
      <div class="header"><h1>Dinner Planner</h1></div>
      <div class="sidebar" id="sideBarView">
      >sidebar</div>
      <div class="main" id="dishItems">Main</div>
      <div class="search" id="dishSearchView">SEARCH</div>
    </div>
    `
    this.container.innerHTML = innerHTML;
    if(this.sidebarView === undefined) {
      this.sidebarView = new SidebarView(this.container.querySelector("#sideBarView"), this.model);
    }

    if(this.dishSearchView === undefined) {
      this.dishSearchView = new DishSearchView(this.container.querySelector("#dishSearchView"), this.model);
    }
    this.afterRender();
  }
  
  afterRender() {
    this.sidebarView.render();
    this.dishSearchView.render(); 
  }
}
