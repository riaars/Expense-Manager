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
        
        this.container.getElementsByClassName("value-total-price")[0].innerHTML = this.model.getTotalMenuPrice();
    }
  
    render() {
        
        //setTimeout(function() {th.render()}, 2000);
      let innerHTML = 
      `
      <div class="sidebarcontainer">
        <div><h1>My Dinner</h1></div>
        <div style="display: flex; flex-direction: row; width: 50%;">People<input type="number" style="width: 3em;" class="numpeople"></input>
        <div class="value-num-guests"></div>
        </div>
        <div style="display: flex; justify-content: space-between; background-color: gray">
            <div style="padding-left:-25px">dish</div>
            <div style="padding-right:-25px">cost</div>
        </div>
        <div id="dishlistcontainer">
        </div>
        <div class="value-total-price"></div>
      </div>
      `
    this.container.innerHTML = innerHTML;
    let numGuestsFunc = this.model.setNumberOfGuests;
    console.log(this.model.getTotalMenuPrice());
    this.container.getElementsByClassName("value-total-price")[0].innerHTML = this.model.getTotalMenuPrice();
    this.container.getElementsByClassName("value-num-guests")[0].innerHTML = this.model.getNumberOfGuests();
    this.container.getElementsByClassName("numpeople")[0].value = this.model.getNumberOfGuests();
    this.container.getElementsByClassName("numpeople")[0].addEventListener("change", function(obj){numGuestsFunc(this.value)});
    this.updateMenu(this.model.getFullMenu(), this.model.getNumberOfGuests());
}

    afterRender() {
        
    }
  }