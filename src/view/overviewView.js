class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        console.log(this.model.getFullMenu());
        this.overviewMyDinner = undefined;
        this.overviewHeader = undefined;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {

      let innerHTML = `
      
            <div id="overviewheader">
            </div>
            <div class="overviewmydinner" id="overviewmydinner">      
            </div>         
            <div class="overviewmain">
                <div class="overviewdishpresenter" id="overviewdishpresenter">
                </div>
                <div class="overviewpresenttotal">
                      Total:
                      <div id="overviewtotalnumber" style="color: red; display:inline;">
                      </div>
                      <div style="display: inline; color: red;">
                          SEK
                      </div>    
                </div>
            </div>
            <div class="overviewprint">
                    print
                <div class="overviewbutton">
                        <button class="startBtn" id="fullrecipebtn">
                              Print Full recipe
                        </button>
                </div>
            </div>
      
      
      `;

      this.container.innerHTML = innerHTML;
      
      if(this.overviewMyDinner === undefined)
            this.overviewMyDinner = new MyDinnerView(this.container.querySelector("#overviewmydinner"), this.model);

       if(this.overviewHeader === undefined)
             this.overviewHeader = new HeaderView(this.container.querySelector("#overviewheader"));

      this.afterRender();
	}

    afterRender() {
      this.overviewMyDinner.render();
      this.overviewHeader.render();
      this.dishPresenter();
    }

    dishPresenter(){

    let dishes = this.model.getFullMenu();
    dishes.map(dish => {let elem = document.createElement("div");
    elem.classList.add("value-main-course-name");
    elem.innerHTML = dish.title;
    elem.innerHTML = dish.pricePerServing/dish.servings;
    return elem;
    })
    .forEach(element => {
    this.container.querySelector("#overviewdishpresenter").appendChild(element);
    });

    this.container.querySelector("#overviewtotalnumber").innerHTML = this.model.getTotalMenuPrice().toFixed(2);
    }
}

{/* <div class="overview-grid-container"></div> */}