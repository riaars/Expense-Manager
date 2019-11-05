class OverviewView {
    constructor(container, model) {
      this.container = container;
      this.model = model;
      }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {
      let htmlText = () => {
        return `
        <div id="loader" style="display:none">Loading...</div>
        <div class="grid-container">
        <div class="header"><h1>Dinner Planner</h1></div>
        <div class="sidebar" id="sideBarView">sidebar</div>
        <div class="main">Main</div>  
        <div class="search" id="search"></div>
        </div>
        `;
      }      
      /*
      <p>This dinner will be Awesome!</p>
      <div id="loader" style="display:none">Loading...</div>
      <p><span id="numPeopleSpan"></span> people are coming!</p>
      <p>We will be eating the following:</p>
      <ul>
        <ul>Bread!</ul>
        <ul>Ham!</ul>
        <ul>Pizza!</ul>
      </ul>
      `;
     */
      
      this.container.innerHTML = htmlText();
      //this.container.querySelector("#numPeopleSpan").innerHTML = this.model.getNumberOfGuests();
      this.container.querySelector("#search")
      
      /*
      const paragraph = this.container.appendChild(document.createElement('P'))
      paragraph.innerHTML = "This dinner will be Awesome!";

      const num_people_val = this.model.getNumberOfGuests();
      const paragraph2 = this.container.appendChild(document.createElement('P'))
      const num_people = paragraph2.appendChild(document.createElement('SPAN'))
      num_people.innerHTML = num_people_val;
      paragraph2.innerHTML += " people are coming!";

      const paragraph3 = this.container.appendChild(document.createElement('P'))
      paragraph3.innerHTML = "We will be eating the following:";

      const list = this.container.appendChild(document.createElement('UL'))

      for(const food of ["Bread!", "Ham!", "Pizza!"]) {
        list.appendChild(document.createElement('UL')).innerHTML = food;
      }
      */
      this.afterRender();
    }

    afterRender() {
    }
}
