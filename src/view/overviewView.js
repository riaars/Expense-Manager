class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
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
            <div class="overviewmain" id="overviewView">
                <div class="overviewdishpresenter" id="value-main-course-name">
                </div>
                <div class="overviewpresenttotal">
                      Total:
                      <div class="overviewtotalnumber" id="value-num-guests" style="color: red; display:inline;">
                      </div>
                      <div style="display: inline; color: red;">
                          SEK
                      </div>    
                </div>
            </div>
            <div class="overviewprint">
                <div class="overviewbutton">
                        <button class="startBtn" id="toPrintBtn">
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
    dishes.map(dish => {
        let elem = document.createElement("div");
        let pic = document.createElement("img");
        let name = document.createElement("div");
        let price = document.createElement("div");
    
    
        elem.classList.add("dishdiv");
        pic.classList.add("picdiv");
        name.classList.add("namediv");
        price.classList.add("pricediv");

        pic.setAttribute("src", dish.image);
        pic.setAttribute("style", "width:100%;");
      

        name.innerHTML = dish.title;
        var numb =  dish.pricePerServing/dish.servings;
        price.innerHTML = numb.toFixed(2)  + " SEK";

        elem.appendChild(pic);
        elem.appendChild(name);
        elem.appendChild(price);

    return elem;
    })
    .forEach(element => {
    this.container.querySelector("#value-main-course-name").appendChild(element);
    });

    this.container.querySelector("#value-num-guests").innerHTML = this.model.getTotalMenuPrice().toFixed(2);
    }
}