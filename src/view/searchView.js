class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.sidebarView = undefined;
  }

  render(dishId) {
    let innerHTML = 
    `
    <div class="grid-container">
    <div id="loader" style="display:none">Loading...</div>
      <div class="header"><h1>Dinner Planner</h1></div>
      <div class="sidebar" id="sideBarView">sidebar</div>
      <div class="main" id="dishItems">Main</div>
      <div class="search" id="dishSearchView"></div>
    </div>
    `
    this.container.innerHTML = innerHTML;
    if(this.sidebarView === undefined) {
      this.sidebarView = new SidebarView(this.container.querySelector("#sideBarView"), this.model);
    }
    this.sidebarView.render(); 
  }
  
  afterRender() {
  }
}
