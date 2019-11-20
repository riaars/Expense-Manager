class SearchViewController{
    constructor(view, model){
        this.view = view;
        this.model = model;
        this.isCollapsed = false;
        this.addEventListeners();
    }

    addEventListeners(){
        this.sideBarView();
        this.dishSearchView();
        this.searchResultsView();
    }

    // Event listeners to the SidebarView functionalities.
    sideBarView(){
        this.view.container.querySelector("#confirmorderbutton")
        .addEventListener("click", this.confirmOrderListener, false);

        this.view.container.querySelector("#num-people-input")
        .addEventListener("change", this.numPeopleListener.bind(this), false);

        this.view.container.querySelector("#collapse-button")
        .addEventListener("click", this.toggleCollapsed.bind(this), false);

        this.addRemoveDishEventListener();
    }

    // Event listeners to the DishSearchView functionalities.
    dishSearchView(){

        this.view.container.querySelector("#dish-free-text-search")
        .addEventListener("keyup", function(event) {
            if (event.keyCode === 13)
                this.view.container.querySelector("#search-for-dish-btn").click();
          }.bind(this)); 

        this.view.container.querySelector("#search-for-dish-btn")
        .addEventListener("click", this.searchForDish.bind(this), false);
      }

      // Event listeners to the SearchResultsView functionalities.
      searchResultsView(){
          this.addSmallDishListeners();
      }

    confirmOrderListener(){
        GSC('search', 'confirmorderbutton');
    }

    numPeopleListener(evt){
        this.model.setNumberOfGuests(evt.target.value);
    }

    addRemoveDishEventListener(){
        this.model.getFullMenu().map(dish => {
            this.view.container.querySelector("#button-remove-dish-" + dish.id)
            .addEventListener("click", this.removeDishListener(dish.id).bind(this), false);   
        });
    }

    removeDishListener(id){
        return function(){
            this.model.removeDishFromMenu(id);
            this.addRemoveDishEventListener();
        }
    }

    toggleCollapsed() {
        this.model.setSidebarToggle(!this.model.getUserPrefs("sidebarCollapsed"));
    }

      searchForDish() {
        let textQuery = this.view.container.querySelector("#dish-free-text-search").value;
        let dishType = this.view.container.querySelector("#dish-type-selector").value;
        loader.toggle(true);
        this.model.getAllDishes(dishType, textQuery).then(() => {loader.toggle(false)});
        addSmallDishListeners();
    }

    addSmallDishListeners(){
        this.model.getLastSearchResults().map(dish =>{
            this.view.container.querySelector("#small-dish-preview-" + dish.id)
            .addEventListener("click", this.presentDetails(dish.id).bind(this), false);
        });
    }

    presentDetails(id){
        return function(){
            loader.toggle(true);
            this.model.getDish(id).then(dish => {
                loader.toggle(false);
                this.model.setRecipeDetailsDish(dish);
                GSC('search', 'smallDishBtn');
            });
        }
    }
}