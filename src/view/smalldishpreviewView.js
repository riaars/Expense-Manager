/* @jsx m*/
//This is a "dumb" view i.e. it does not require access to the model
//It exists only to generate the HTML for a small dish preview
//It could have been made as a template string in the search view results panel
//But having it as a separate class seems less messy 
//a numbere of dish previews could have been hardcoded into the results panel, but
//Assuming the search result can return an unknown number of dishes this made sense
class SmallDishPreviewView {
    //Expects a dish object like the from the api /info endpoint
    constructor(container, dishSummary) {
        this.dishSummary = dishSummary;
        this.container = container;
    }

    jsx = () => (
      <div className="small-dish-preview-container" style={{border:"solid black", backgrounColor:"#dedede"}}>
        <img className="small-dish-preview-image" style={{maxWidth:"100%", height:"150px"}} src={this.dishSummary.imageUrls[0]}></img>
        <div className="small-dish-preview-text" style={{whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden"}}>
          {this.dishSummary.title}
        </div>
      </div>
    )

    render() {
      m.render(this.container, this.jsx());
    }
}