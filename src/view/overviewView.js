class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {

      let innerHTML = `
      <div id="overview-grid-container">
             <div id="overviewheader"> <h1>Dinner Planner</h1>
             </div>
             <div id="overviewdinner">
                    <div id="myDinner" style="display: inline">My dinner: 
                    </div>
                    <div id="numGuest" class="value-num-guests" style="display: inline">
                         </div>&nbsp;<div id="people" style="display: inline">
                         </div>
                         <button class="startBtn"  id="toPrintBtn" onclick="show('search')">Go back and edit dinner
                         </button>        
                         </div>  
                         <div id="overviewmain">
                         <div id="value-total-price" style="display: inline ">
                         </div>
                     </div> 
                     <div id="fullrecipebtn">
                        <button class="startBtn">
                             Print Full Recipe
                        </button>
                     </div>
              </div>         
       </div>
      
      `;

      this.container.innerHTML = innerHTML;
      this.afterRender();
	}

    afterRender() {
      this.myDinner();
      this.dishPresenter();
    }

    myDinner(){
      this.container.querySelector("#numGuest").innerHTML = this.model.getNumberOfGuests();

      if("1" === this.container.querySelector("#numGuest").innerHTML)
          this.container.querySelector("#people").innerHTML = "person";
      else
          this.container.querySelector("#people").innerHTML = "people";
    }

    dishPresenter(){

      let dishes = this.model.getFullMenu();

      dishes.map(dish => {let elem = document.createElement("div");
        elem.classList.add("value-main-course-name");
        elem.innerHTML = dish.title;
        return elem;
      }).forEach(element => {
        this.container.querySelector("#disharea").appendChild(element);
      });
      this.container.querySelector("#value-total-price").innerHTML = this.model.getTotalMenuPrice();
    }
}
