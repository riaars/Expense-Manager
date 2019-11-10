class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {

      let innerHTML = `
      <div class="grid-container" id="overview-grid-container">
      <div id="loader" style="display:none">Loading...</div>
        <div class="header"><h1>Dinner Planner</h1></div>
        <div class="search" id="overviewdinner">
          <div style="display:flex; flex-direction:row;">
            <div>My dinner: &nbsp;</div>
            <div id="numGuest" class="value-num-guests"></div>&nbsp;
            <div id="people"></div>
          </div>
            <button id="toPrintBtn" onclick="show('search')">Go back and edit dinner</button>
        </div>
        <div class="main" id="overviewmain">
          <div>
            <div id="disharea">
            </div>
            <div id="value-total-price" class="value-total-price">
            </div>
          </div>  
            <button id="fullrecipebtn">
              Print Full Recipe
            </button>
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
