class DishSearchView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.sidebarView = undefined;
    }
    
    render() {
        let innerHTML = `
        <div id="dishsearchcontainer" style="padding-left:25px; padding-bottom:20px;">
        <div style="text-align:left;"><h1>Find a Dish</h1></div>
            <div style="display:flex; flex-direction:row;">Search&nbsp;<input type="text" id="dish-free-text-search" size=10em></input>
            <select name="cars" id="dish-type-selector" style="margin-left:25px;">
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
        `;
        this.container.innerHTML = innerHTML;
        this.afterRender();
    }
    wasUpdated(obj) 
    {console.log(obj);}
    
    afterRender(){
        this.container.querySelector("#search-for-dish-btn").addEventListener("click", this.searchForDish.bind(this));
        this.model.subscribeToProperty(["dishSearchResults"], this.wasUpdated.bind(this));
    }

    searchForDish() {
        let textQuery = this.container.querySelector("#dish-free-text-search").value;
        let dishType = this.container.querySelector("#dish-type-selector").value;
        this.model.getAllDishes(dishType, textQuery).then(console.log);
    }
}