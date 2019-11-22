/* @jsx m */
class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.overviewMyDinner = undefined;
    this.overviewHeader = undefined;
  }

  jsx = () => (
    <div>
      <div className="overviewmydinner" id="overviewmydinner" />
      <div className="overviewmain" id="overviewView">
        <div className="overviewdishpresenter" id="value-main-course-name" />
        <div className="overviewpresenttotal">
          Total:
          <div className="overviewtotalnumber value-total-price" style={{ color: "red", display: "inline" }} />
          <div style={{ display: "inline", color: "red" }}>
            SEK
          </div>
        </div>
      </div>
      <div className="overviewprint">
        <div className="overviewbutton">
          <button className="startBtn" id="toPrintBtn">
            Print Full recipe
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    m.render(this.container, this.jsx());

    if (this.overviewMyDinner === undefined)
      this.overviewMyDinner = new MyDinnerView(this.container.querySelector("#overviewmydinner"), this.model);

    this.afterRender();
  }

  afterRender() {
    this.overviewMyDinner.render();
    this.update(this.model.getFullMenu(), this.model.getTotalMenuPrice());
    this.model.addObserver(["dishes", "prices"], this.update.bind(this), this);
  }

  update(dishes, prices) {
    if (dishes.length === 0) {
      m.render(this.container.querySelector("#value-main-course-name"), (<div>No Dish Chosen!</div>))
    } else {
      let dishOverviews = dishes.map(dish => (
        <div className="dishdiv">
          <img className="picdiv" src={dish.image} style={{ width: "100%" }} />
          <div className="namediv value-main-course-name">
            {dish.title}
          </div>
          <div className="pricediv">
            {(dish.pricePerServing / dish.servings).toFixed(2) + " SEK"}
          </div>
        </div>))
      m.render(this.container.querySelector("#value-main-course-name"), dishOverviews)
    }
    this.container.getElementsByClassName("value-total-price")[0].innerHTML = prices.toFixed(2);
  }
}