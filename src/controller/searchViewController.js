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

    sideBarView(){
        this.view.container.querySelector("#confirmorderbutton")
        .addEventListener("click", this.confirmOrderListener, false);

        this.view.container.querySelector("#num-people-input")
        .addEventListener("change", this.numPeopleListener.bind(this), false);

        this.view.container.querySelector("#collapse-button")
        .addEventListener("click", this.toggleCollapsed.bind(this), false);

        this.addRemoveDishEventListener();
    }

    dishSearchView(){

        this.view.container.querySelector("#dish-free-text-search")
        .addEventListener("keyup", function(event) {
            if (event.keyCode === 13)
                this.view.container.querySelector("#search-for-dish-btn").click();
          }.bind(this)); 

        this.view.container.querySelector("#search-for-dish-btn")
        .addEventListener("click", this.searchForDish.bind(this), false);
      }

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
        this.isCollapsed = !this.isCollapsed;
        let sidebarContainer = this.view.container.getElementsByClassName("sidebarcontainer")[0];
        this.isCollapsed ? (sidebarContainer.setAttribute("style", "height:1em")) :(sidebarContainer.setAttribute("style", "height:100%"));
        this.view.container.getElementsByClassName("collapse-button")[0].innerHTML = this.isCollapsed ? "expand" : "collapse";
        this.view.container.querySelector("#confirmorderbutton").style.display = !this.isCollapsed || "none";
      }

      searchForDish() {
        let textQuery = this.view.container.querySelector("#dish-free-text-search").value;
        let dishType = this.view.container.querySelector("#dish-type-selector").value;
        loader.toggle(true);
        this.model.getAllDishes(dishType, textQuery).then(() => {loader.toggle(false);})
    }

    addSmallDishListeners(){
        this.model.getLastSearchResults().map(dish =>{
            this.view.container.querySelector("#small-dish-preview-" + dish.id)
            .addEventListener("click", this.presentDetails(dish.id).bind(this), false);
        });
    }

    presentDetails(id){
        return function(){
            console.log(id);
            GSC('search', 'smallDishBtn');
        }
    }
}