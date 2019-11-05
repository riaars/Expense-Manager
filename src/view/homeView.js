class HomeView {
  constructor(container) {
    this.container = container;
    window.gCont = container;
    this.startBtn = null;
  }
  
  // An example of creating HTML declaratively. Think about the pros and cons of this approach.
  render() {
    var content = /* template */ `
    <div class="headertext"> 
      <h1>Dinner Planner</h1>
    </div>
    <div id="loader" style="display:none">Loading...</div>
    <div class="centertext">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.
        <div class="spacing-medium"></div>
        <button class="homeviewbutton" >
          Create new dinner
          </button>
      </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
     this.startBtn = this.container.getElementsByClassName("homeviewbutton");
     this.startBtn[0].addEventListener("click", this.createNewDinner);
  }

  createNewDinner() {
    console.log("myfunction");
  }
}
