/* @jsx m*/
class DishSearchView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.sidebarView = undefined;
      this.model.subscribeToProperty(["dishSearchResults"], this.wasUpdated.bind(this));
      this.dropdownOptions = [
      {value:"", name:"Select A Type"},
      {value:"main course", name:"Main course"},
      {value:"side dish", name:"Side Dish"},
      {value:"dessert", name:"Dessert"},
      {value:"starter", name:"Starter"}]
    }
    
    jsx = () => (
      <div id="dishsearchcontainer" style={{paddingLeft:"25px", paddingBottom:"20px"}}>
        <div style={{textAlign:"left"}}>
          Find a Dish
        </div>
        <div className="search-area">
          <input type="text" placeholder="Enter key words" id="dish-free-text-search" style={{width:"8.5em", marginRight:"25px"}}></input>
          <div style={{display:"flex", flexDirection:"row"}}>
            <select name="cars" id="dish-type-selector" style={{width:"8.5em", marginRight:"25px"}}>
              {
                this.dropdownOptions.map(option => (
                <option value={option.value}>{option.name}</option>))
              }
            </select>
            <button id="search-for-dish-btn" 
              className="startBtn" 
              type="button"
              style={{margin:"0 0em 0em 0", marginLeft:"25px"}}
              onclick={this.searchForDish.bind(this)}>
              Search
            </button>
          </div>
        </div>
      </div>
    )

    render() {
      m.render(this.container, this.jsx());
      this.afterRender();
    }
    wasUpdated(obj) {
      //Handle the changed state
    }
    
    afterRender() {
      //Listen for enter key
        this.container.querySelector("#dish-free-text-search").addEventListener("keyup", function(event) {
          if (event.keyCode === 13)
          this.container.querySelector("#search-for-dish-btn").click();
        }.bind(this));    
    }

    //This will be moved into a controller in lab3, it is only here for testing.
    searchForDish() {
        let textQuery = this.container.querySelector("#dish-free-text-search").value;
        let dishType = this.container.querySelector("#dish-type-selector").value;
        loader.toggle(true);
        this.model.getAllDishes(dishType, textQuery).then(() => {loader.toggle(false);})
    }
}