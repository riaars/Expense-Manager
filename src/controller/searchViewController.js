class SearchViewController{
    constructor(view, model){
        this.view = view;
        this.model = model;
        this.isCollapsed = false;
        this.addEventListeners();
    }

    addEventListeners(){
        this.dishSearchView();
        this.searchResultsView();
        this.sidebarView().registerEventListener(this);
        this.searchResultsView().registerEventListener(this);
        /*
        this.sideBarView();
        */
    }

    //A view tells us it has been interacted with
    //controller is free to take apropriate action
    handleEvent(evtType, evtData) {
        switch(evtType) {
            case "collapseButtonPressed":
                this.toggleCollapsed();
                break;
            case "dishPreviewClicked":
                this.presentDetails(evtData.id);
                break;
            case "dishRemovedButtonClicked":
                this.removeDish(evtData.id);
                break;
        }
    }

    // Event listeners to the SidebarView functionalities.
    sidebarView(){
        this.view.container.querySelector("#confirmorderbutton")
        .addEventListener("click", this.confirmOrderListener, false);
        
        this.view.container.querySelector("#num-people-input")
        .addEventListener("change", this.numPeopleListener.bind(this), false);
        
        return this.view.sidebarView;
        /*
        //this.view.container.querySelector("#collapse-button")
        //.addEventListener("click", this.toggleCollapsed.bind(this), false);

        this.addRemoveDishEventListener();
        */
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
        return this.view.searchResultsView;  
        this.addSmallDishListeners();
      }

    confirmOrderListener(){
        GSC('search', 'confirmorderbutton');
    }

    numPeopleListener(evt){
        this.model.setNumberOfGuests(evt.target.value);
    }

    
    removeDish(id){
        this.model.removeDishFromMenu(id);
        this.addRemoveDishEventListener();
    }
    
    toggleCollapsed() {
        this.model.setSidebarToggle(!this.model.getUserPrefs("sidebarCollapsed"));
    }
    
    searchForDish() {
        let textQuery = this.view.container.querySelector("#dish-free-text-search").value;
        let dishType = this.view.container.querySelector("#dish-type-selector").value;
        loader.toggle(true);
        this.model.getAllDishes(dishType, textQuery).then(() => {loader.toggle(false)});
    }
    
    presentDetails(id){
        loader.toggle(true);
        this.model.getDish(id).then(dish => {
            loader.toggle(false);
            this.model.setRecipeDetailsDish(dish);
            GSC('search', 'smallDishBtn');
        });
    }

    /*
    addRemoveDishEventListener(){
        this.model.getFullMenu().map(dish => {
            this.view.container.querySelector("#button-remove-dish-" + dish.id)
            .addEventListener("click", this.removeDishListener(dish.id).bind(this), false);   
        });
    }
    */
}