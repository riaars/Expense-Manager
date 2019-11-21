/* @jsx m*/
class DishSearchView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.sidebarView = undefined;      
      this.dropdownOptions = [
      {value:"", name:"Select A Type"},
      {value:"main course", name:"Main course"},
      {value:"side dish", name:"Side Dish"},
      {value:"dessert", name:"Dessert"},
      {value:"starter", name:"Starter"}]
    }
    
    autocompleteAsJsx = (suggestions) => 
      suggestions.map((suggestion) => (<option value={suggestion.title}/>));

    jsx = () => (
      <div id="dishsearchcontainer" style={{paddingLeft:"25px", paddingBottom:"20px"}}>
        <div style={{textAlign:"left"}}>
          Find a Dish
        </div>
        <div className="search-area">
          <form>
          <input type="text"  list="autocomplete-suggestions" placeholder="Enter key words" id="dish-free-text-search" style={{width:"8.5em", marginRight:"25px"}}>
          <datalist id="autocomplete-suggestions">
          
          </datalist>
          </input>
          </form>
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
              style={{margin:"0 0em 0em 0", marginLeft:"25px"}}>
              Search
            </button>
          </div>
        </div>
      </div>
    )

    render() {
      this.model.addObserver(["autoCompleteResults"], this.update.bind(this), this);
      m.render(this.container, this.jsx());
      this.afterRender();
    }

    update(autocompleteResults) {
      let autocompleteContainer = this.container.querySelector("#autocomplete-suggestions");
      m.render(autocompleteContainer, this.autocompleteAsJsx(autocompleteResults));
    }
    
    afterRender() { 
    }
}