/* @jsx m*/
class HomeView {
  constructor(container) {
    this.container = container;
  }
  
  jsx = () => (
    <div class="homeview-grid-container">
      <div class="centertext">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
        magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
        arcu. Maecenas a efficitur leo.
        <div class="spacing-medium">
        </div>
        <button id="startBtn" className="startBtn" type="button" onclick={this.createNewDinner}>
          Create new dinner
        </button>
      </div>
    </div>
  )

  render() {
    m.render(this.container, this.jsx())
  }

  createNewDinner() {
    window.location.hash = 'search';
  }
}
