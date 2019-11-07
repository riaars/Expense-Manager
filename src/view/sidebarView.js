class SidebarView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.model.subscribeToProperty(["dishes", "numberOfGuests"], this.updateMenu.bind(this));
    }
    updateMenu(dishes, numGuests) {
        this.container.querySelector("#dishlistcontainer").innerHTML = "";
        dishes.forEach(function(dish){
            let elem = document.createElement("div");
            elem.style ="display: flex;  justify-content: space-between; font-size:80%; padding-bottom: 10px;" 
            elem.className = "dishlistelement";
            let titleElem = document.createElement("div");
            titleElem.className = "value-main-course-name"
            titleElem.innerHTML = dish.title;
            let costElem = document.createElement("div");
            costElem.innerHTML = Math.round(dish.pricePerServing*numGuests);
            
            elem.appendChild(titleElem);
            elem.appendChild(costElem);
            this.container.querySelector("#dishlistcontainer").appendChild(elem);
            this.container.getElementsByClassName("value-num-guests")[0].innerHTML = this.model.getNumberOfGuests();
            this.container.getElementsByClassName("numpeople")[0].value = this.model.getNumberOfGuests();
        }.bind(this))
        
        this.container.getElementsByClassName("value-total-price")[0].innerHTML =this.model.getTotalMenuPrice().toFixed(2);
        this.container.getElementsByClassName("value-num-guests")[0].innerHTML = this.model.getNumberOfGuests();
        this.container.getElementsByClassName("numpeople")[0].value = this.model.getNumberOfGuests();
    }
  
    render() {
        
        //setTimeout(function() {th.render()}, 2000);
      let innerHTML = 
      `
      <div class="sidebarcontainer">
        <div><h1>My Dinner</h1></div>
        <div style="display: flex; flex-direction: row; width: 50%;">People&nbsp;<input type="number" style="width: 2em;" class="numpeople"></input>
        <div class="value-num-guests"></div>
        </div>
        <div style="
          display: flex; 
          justify-content: space-between; 
          border-top:5px solid black; 
          border-bottom:5px solid black;  
          background-color: gray; 
          margin-left:-25px; 
          margin-right:-25px;">
            <div style="padding-left:25px">Dish Name</div>
            <div style="padding-right:25px">Cost</div>
        </div>
        <div id="dishlistcontainer">
        </div>
        <div style="display: flex; justify-content: flex-end; color:darkred;">
          <div>SEK:&nbsp;</div><div class="value-total-price"></div>
        </div>
        <div class="homeviewbutton" id="confirmorderbutton">Confirm Order</div>
      </div>
      `
    this.container.innerHTML = innerHTML;
    this.container.querySelector("#confirmorderbutton").addEventListener("click", () =>{alert("Confirm Order")});
    let numGuestsFunc = this.model.setNumberOfGuests;
    this.container.getElementsByClassName("numpeople")[0].value = this.model.getNumberOfGuests();
    this.container.getElementsByClassName("numpeople")[0].addEventListener("change", function(obj){numGuestsFunc(this.value)});
    this.updateMenu(this.model.getFullMenu(), this.model.getNumberOfGuests());
}

    afterRender() {
        
    }
  }