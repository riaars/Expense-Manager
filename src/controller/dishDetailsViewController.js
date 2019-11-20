class DishDetailsViewController{
    constructor(view, model){
        this.view = view;
        this.model = model;
        this.addEventListeners();
    }

    addEventListeners(){
        this.sideBarView();
        this.recipeView();
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

    recipeView(){
        this.view.container.querySelector("#go-back-details")
        .addEventListener("click", this.goBackDetailsListener, false);

        this.view.container.querySelector("#add-to-menu-button")
        .addEventListener("click", this.addToMenuListener.bind(this), false);
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

    goBackDetailsListener(){
        GSC('details', 'gobackdetails');
    }

    confirmOrderListener(){
        GSC('details', 'confirmorderbutton');
    }

    numPeopleListener(evt){
        this.model.setNumberOfGuests(evt.target.value);
    }

    toggleCollapsed() {
        this.model.setSidebarToggle(!this.model.getUserPrefs("sidebarCollapsed"));
      }

      addToMenuListener(){
            this.model.addDishToMenu(this.model.getRecipeDetailsDish());
            GSC('details', 'gobackdetails');
      }
}