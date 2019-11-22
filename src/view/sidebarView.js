/* @jsx m*/
class SidebarView extends eventEmitter {
    constructor(container, model) {
      super();
      this.container = container;
      this.model = model;
    }
    
    update(dishes, numGuests, prices) {
      m.render(this.container.querySelector("#dishlistcontainer"), this.getDishListAsJsx(dishes, numGuests));
      this.container.querySelector("#num-people-input").value = numGuests;
      this.container.getElementsByClassName("value-num-guests")[0].value = numGuests;
      this.container.getElementsByClassName("value-total-price")[0].innerHTML = (prices).toFixed(2);      
      this.container.getElementsByClassName("value-num-guests").innerHTML = numGuests;
    }

    onUserPrefsUpdated(userPrefs) {
      let state = userPrefs.sidebarCollapsed;
      let sidebarContainer = this.container.getElementsByClassName("sidebarcontainer")[0];
      sidebarContainer.setAttribute("style", state ? "height:0.6em" : "height:100%");
      sidebarContainer.getElementsByClassName("collapse-button")[0].innerHTML = state ? "expand" : "collapse";
    }

    getDishListAsJsx = (dishes , numGuests) => {
      return (
      dishes.map((dish) => (
        <div className="dishlistelement" style={{display: "flex", justifyContent: "space-between", fontSize: "80%", paddingBottom: "10px"}}>
          <div className="value-main-course-name" style={{paddingLeft:"2em"}}>
            {dish.title}
          </div>
          <div style={{paddingRight: "1em"}}>
            { Math.round(dish.pricePerServing*numGuests) }
            <span className="button-remove-dish" id={"button-remove-dish-" + dish.id} 
            onclick={function() {this.emitEvent("dishRemovedButtonClicked", {id: dish.id})}.bind(this)}> 
            {" X"}
            </span>
          </div>
        </div>
        ))
    )}

    jsx = () => { return (
      <div className="sidebarcontainer" style={{height:"100%"}}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingLeft:"25px", paddingRight:"25px", margin:"0"}}>
          <div>
            <h2>My Dinner</h2>
          </div>
          <div className="collapse-button" id="collapse-button">
             collapse
          </div>
        </div>
        <div style={{paddingLeft:"25px", display:"flex", flexDirection:"row", width: "50%"}}>
          People&nbsp;
          <input type="number" 
            style={{width: "2em"}} 
            id="num-people-input"/>
          <div className="value-num-guests" style={{display:"none"}}>
            {this.model.getNumberOfGuests()}
          </div>       
        </div>
        <div style={{  
          display: "flex", 
          justifyContent: "space-between", 
          borderTop:"5px solid black",
          borderBottom:"5px solid black",  
          backgroundColor: "#dedede"}}>
          <div style={{ paddingLeft:"25px"  }}>Dish Name</div>
          <div style={{ paddingRight:"25px" }}>Cost</div>
        </div>
        <div id="dishlistcontainer"/>
        <div style={{display: "flex", justifyContent: "flex-end", color:"darkred"}}>
          <div>SEK:&nbsp;</div><div class="value-total-price" style="padding-right:25px;"/>
        </div>
        <div className="startBtn" id="confirmorderbutton">
          Confirm Order
        </div>
      </div>
    )}

    render() {
      m.render(this.container, this.jsx());
      this.afterRender();
    }

    afterRender() {
      this.model.addObserver(["dishes", "numberOfGuests", "prices"], this.update.bind(this), this);  
      this.model.addObserver(["userPrefs"], this.onUserPrefsUpdated.bind(this), this);  
      this.update(this.model.getFullMenu(), this.model.getNumberOfGuests(), this.model.getTotalMenuPrice());
      this.container.querySelector("#collapse-button")
      .addEventListener("click", () => {this.emitEvent("collapseButtonPressed")}, false);
    }
  }