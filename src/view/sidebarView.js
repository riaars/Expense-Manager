/* @jsx m*/
class SidebarView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      this.model.addObserver(["dishes", "numberOfGuests", "prices"], this.update.bind(this), this);  
    }
    
    update(dishes, numGuests, prices) {
      m.render(this.container.querySelector("#dishlistcontainer"), this.getDishListAsJsx(dishes, numGuests));
      this.container.getElementsByClassName("num-people-input")[0].value = numGuests;
      this.container.getElementsByClassName("value-num-guests")[0].value = numGuests;
      this.container.getElementsByClassName("value-total-price")[0].innerHTML = (numGuests*prices).toFixed(2);      
    }
  
    getDishListAsJsx = (dishes , numGuests) => {
      return (
      dishes.map((dish) => (
        <div className="dishlistelement" style="display: flex; justify-content: space-between; font-size: 80%; padding-bottom: 10px;">
          <div className="value-main-course-name" style={{paddingLeft:"2em"}}>
            {dish.title}
          </div>
          <div style={{paddingRight: "1em"}}>
            {Math.round(dish.pricePerServing*numGuests)}
            <span className="button-remove-dish" id={"button-remove-dish-" + dish.id}> 
                  X
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
          People&nbsp;<input type="number" 
          style={{width: "2em"}} 
          className="num-people-input" id="num-people-input">
          </input>
        <div className="value-num-guests" style={{display:"none"}}></div>       
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
      this.update(this.model.getFullMenu(), this.model.getNumberOfGuests(), this.model.getTotalMenuPrice());
    }
  }