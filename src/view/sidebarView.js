/* @jsx m*/
class SidebarView {
    constructor(container, model, controller) {
      this.container = container;
      this.model = model;
      this.model.addObserver(["dishes", "numberOfGuests"], this.update.bind(this), this);
      this.isCollapsed = false;
    }
    
    update(dishes, numGuests) {
      m.render(this.container.querySelector("#dishlistcontainer"), this.getDishListAsJsx());
      this.container.getElementsByClassName("num-people-input")[0].value = numGuests;
      this.container.getElementsByClassName("value-num-guests")[0].value = numGuests;
      this.container.getElementsByClassName("value-total-price")[0].innerHTML = this.model.getTotalMenuPrice().toFixed(2);      
    }
  
    getDishListAsJsx = () => {
      return (
      this.model.getFullMenu().map((dish) => (
        <div className="dishlistelement" style="display: flex; justify-content: space-between; font-size: 80%; padding-bottom: 10px;">
          <div className="value-main-course-name" style={{paddingLeft:"2em"}}>
            {dish.title}
          </div>
          <div style={{paddingRight: "1em"}}>
            {Math.round(dish.pricePerServing*this.model.getNumberOfGuests())}
            <span className="button-remove-dish"  
            onclick={function() {this.model.removeDishFromMenu(dish.id)}.bind(this)}> X
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
          <div className="collapse-button"
          onclick={this.toggleCollapsed.bind(this)}>
            {this.isCollapsed ? "expand" : "collapse"}
          </div>
        </div>
        <div style={{paddingLeft:"25px", display:"flex", flexDirection:"row", width: "50%"}}>
          People&nbsp;<input type="number" 
          style={{width: "2em"}} 
          className="num-people-input" 
          onchange={function(evt){this.model.setNumberOfGuests(evt.target.value)}.bind(this)}
          >
          </input>
        <div className="value-num-guests" style={{display:"none"}}>{this.model.getNumberOfGuests()}</div>
         
        </div>
        <div style={{  
          display: "flex", 
          justifyContent: "space-between", 
          borderTop:"5px solid black",
          borderBottom:"5px solid black",  
          backgroundColor: "#dedede" 
        }}>
            <div style={{paddingLeft:"25px"}}>Dish Name</div>
            <div style={{paddingRight:"25px"}}>Cost</div>
        </div>
        <div id="dishlistcontainer">
        </div>
        <div style={{display: "flex", justifyContent: "flex-end", color:"darkred"}}>
          <div>SEK:&nbsp;</div><div class="value-total-price" style="padding-right:25px;" >
            
          </div>
        </div>
        <div className="startBtn" id="confirmorderbutton"
        onclick= {() => {window.location.hash = '#overview'}}>Confirm Order</div>
      </div>
    )}

    render() {
      m.render(this.container, this.jsx());
      this.afterRender();
    }

    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed;
      let sidebarContainer = this.container.getElementsByClassName("sidebarcontainer")[0];
      this.isCollapsed ? 
      (sidebarContainer.setAttribute("style", "height:1em")) :
      (sidebarContainer.setAttribute("style", "height:100%"))
      this.container.getElementsByClassName("collapse-button")[0].innerHTML = this.isCollapsed ? "expand" : "collapse";
      this.container.querySelector("#confirmorderbutton").style.display = !this.isCollapsed || "none"
    }

    afterRender() {
      this.update(this.model.getFullMenu(), this.model.getNumberOfGuests());
    }
  }