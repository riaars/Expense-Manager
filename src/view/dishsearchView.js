class DishSearchView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.sidebarView = undefined;
    }
    
    render() {
        let innerHTML = `
        <div id="dishsearchcontainer" style="padding-left:25px; padding-bottom:20px;">
        <div style="text-align:left;">
            Find a Dish
        </div>
        <div class="search-area">
        <input type="text" placeholder="Enter key words" id="dish-free-text-search" style="width:8.5em; margin-right:25px"></input>
        <div style="display:flex; flex-direction:row;">
            <select name="cars" id="dish-type-selector" style="width:8.5em; margin-right:25px;">
                <option value="">Select A Type</option>
                <option value="main course">Main course</option>
                <option value="side dish">Side Dish</option>
                <option value="dessert">Dessert</option>
                <option value="starter">Starter</option>
            </select>
            <button id="search-for-dish-btn" class="startBtn" type="button" style="margin:0 0em 0em 0; margin-left:25px">
              Search
            </button>
            </div>
        </div>
        `;
        this.container.innerHTML = innerHTML;
        this.afterRender();
    }
    wasUpdated(obj) 
    {
        console.log("OJ")
        console.log(obj);
    }
    
    afterRender(){
        //this will be replaced by a controller in lab3, only for testing with real content.
        let btn = this.container.querySelector("#search-for-dish-btn"); 
        btn.addEventListener("click", this.searchForDish.bind(this));
        //Enter too
        this.container.querySelector("#dish-free-text-search").addEventListener("keyup", function(event) {
            if (event.keyCode === 13)
                              btn.click();
        });
        this.model.subscribeToProperty(["dishSearchResults"], this.wasUpdated.bind(this));
    }

    searchForDish() {
        let textQuery = this.container.querySelector("#dish-free-text-search").value;
        let dishType = this.container.querySelector("#dish-type-selector").value;
        this.model.getAllDishes(dishType, textQuery);
    }
}