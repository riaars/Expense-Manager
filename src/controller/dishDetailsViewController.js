class DishDetailsViewController{
    constructor(view, model){
        this.view = view;
        this.model = model;
        this.addEventListeners();
    }

    addEventListeners(){
        this.sideBarView();
        this.recipeView();
        this.view.sidebarView.registerEventListener(this);
    }

    //A view tells us it has been interacted with
    //controller is free to take apropriate action
    handleEvent(evtType, evtData) {
        switch(evtType) {
            case "collapseButtonPressed":
                this.model.setSidebarToggle(!this.model.getUserPrefs("sidebarCollapsed"));
                break;
            case "dishRemovedButtonClicked":
                this.model.removeDishFromMenu(evtData.id);
                break;
        }
    }

    sideBarView(){
        this.view.container.querySelector("#confirmorderbutton")
        .addEventListener("click", this.confirmOrderListener, false);

        this.view.container.querySelector("#num-people-input")
        .addEventListener("change", this.numPeopleListener.bind(this), false);
    }

    recipeView(){
        this.view.container.querySelector("#go-back-details")
        .addEventListener("click", this.goBackDetailsListener, false);

        this.view.container.querySelector("#add-to-menu-button")
        .addEventListener("click", this.addToMenuListener.bind(this), false);
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

    addToMenuListener(){
          this.model.addDishToMenu(this.model.getRecipeDetailsDish());
          GSC('details', 'gobackdetails');
    }
}