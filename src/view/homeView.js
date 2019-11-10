class HomeView {
  constructor(container) {
    this.container = container;
    this.startBtn = null;
  }
  
  // An example of creating HTML declaratively. Think about the pros and cons of this approach.
  render() {
    var content = /* template */ `
   <div id="homeview-grid-container">
    <div class="header" id="homeviewheader"> 
      <h1>Dinner Planner</h1>
    </div>
    <div id="loader" style="display:none">Loading...</div>
    <div class="centertext">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.
        <div class="spacing-medium"></div>
  
      </div>
      <button id="startBtn" class="startBtn" type="button">
          Create new dinner
          </button>
    </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
     this.startBtn = this.container.querySelector("#startBtn");
     this.startBtn.addEventListener("click", this.createNewDinner);
  }

  createNewDinner() {
    show("search");
  }
}
