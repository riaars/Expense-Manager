class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.overviewMyDinner = undefined;
        this.overviewHeader = undefined;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {
        this.model.addObserver(["dishes", "prices"], this.update.bind(this), this);
        let innerHTML = `
            <div class="overviewmydinner" id="overviewmydinner">      
            </div>         
            <div class="overviewmain" id="overviewView">
                <div class="overviewdishpresenter" id="value-main-course-name">
                </div>
                <div class="overviewpresenttotal">
                      Total:
                      <div class="overviewtotalnumber value-total-price" style="color: red; display:inline;">
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

      this.afterRender();
    }

    afterRender() {
      this.overviewMyDinner.render();
      this.update(this.model.getFullMenu(), this.model.getTotalMenuPrice());
    }

    update(dishes, prices){
       
       this.container.querySelector("#value-main-course-name").innerHTML = "";
     
       if(dishes.length === 0){
            let elem = document.createElement("div");
            elem.innerHTML = "No Dish Chosen!";

            this.container.querySelector("#value-main-course-name").appendChild(elem);
       }
       else{
        dishes.map(dish => {
        let elem = document.createElement("div");
        let pic = document.createElement("img");
        let name = document.createElement("div");
        let price = document.createElement("div");
    
        elem.classList.add("dishdiv");
        pic.classList.add("picdiv");
        name.classList.add("namediv");
        name.classList.add("value-main-course-name");
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
    }

        this.container.getElementsByClassName("value-total-price")[0].innerHTML = prices;
    }
}