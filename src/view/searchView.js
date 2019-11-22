/* @jsx m*/
class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.sidebarView = undefined;
    this.dishSearchView = undefined;
    this.searchResultsView = undefined;
  }

  jsx = () => ( 
    <div class="grid-container">
      <div class="sidebar" id="sideBarView">sidebar</div>
      <div class="main" id="searchResultsView">Main</div>
      <div class="search" id="dishSearchView">SEARCH</div>
    </div>
  );


  render(dishId) {
    m.render(this.container, this.jsx());
    
    if(this.sidebarView === undefined) {
      this.sidebarView = new SidebarView(this.container.querySelector("#sideBarView"), this.model);
    }

    if(this.dishSearchView === undefined) {
      this.dishSearchView = new DishSearchView(this.container.querySelector("#dishSearchView"), this.model);
    }

    if(this.searchResultsView === undefined) {
      this.searchResultsView = new SearchResultsView(this.container.querySelector("#searchResultsView"), this.model)
    }

    this.afterRender();
  }
  
  afterRender() {
    this.sidebarView.render();
    this.dishSearchView.render(); 
    this.searchResultsView.render(); 
  }
}
