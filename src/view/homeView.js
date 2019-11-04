class HomeView {
  constructor(container) {
    this.container = container;
    window.gCont = container;
    this.startBtn = null;
  }
  
  // An example of creating HTML declaratively. Think about the pros and cons of this approach.
  render() {
    var content = /* template */ `

    <div class="header">
      <div class = "headertext"> 
        <h1>Dinner Planner</h1>
        </div>
    </div>
    <div class="centertext">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.
        <div class="spacing-medium"></div>
        <div class="homeviewbutton">
          Create new dinner
          </div>
      </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
    this.startBtn = this.container.getElementByClassName("homviewbutton");
    console.log(this.container);
    console.log(this.startBtn);
    this.startBtn.addEventListener("click", this.myFunction);
  }

  myFunction(){
    console.log("myfunction");
  }
}
