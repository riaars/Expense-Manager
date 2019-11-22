/* @jsx m */
class MyDinnerView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.model.addObserver(["numberOfGuests"], this.update.bind(this), this);
  }

  jsx = () => (
    <div className="mydinner-grid-container" >
      <div className="leftmydinner">
        <div style={{ display: "inline" }}>
          My dinner:&nbsp;
        </div>
        <div id="numGuest" className="value-num-guests" style={{ display: "inline" }} />
        <div id="people" style={{ display: "inline" }} />
      </div>
      <div className="rightmydinner">
        <button className="startBtn" type="button" id="mydinnergobackbtn">
          Go back and edit dinner
        </button>
      </div>
    </div>
  )

  render() {
    m.render(this.container, this.jsx())
    this.afterRender();
  }

  afterRender() {
    this.update(this.model.getNumberOfGuests());
  }

  update(guests) {
    this.container.querySelector("#numGuest").innerHTML = guests;
    let peopleOrPerson = guests === 1 ? "person" : "people"
    this.container.querySelector("#people").innerHTML = "&nbsp;" + peopleOrPerson;
  }
}