/* @jsx m*/
class SearchResultsView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.model.addObserver(["dishSearchResults"], this.update.bind(this), this);
    }

    update(searchResults) {
        m.render(this.container.getElementsByClassName("dish-previews-container")[0], this.getSearchResultsAsJsx(searchResults))
    }

    //generate previews from model data
    getSearchResultsAsJsx = (searchResults) => (
    
        searchResults.map((result) => (
            <div id={"small-dish-preview-" + result.id} style={{width:"150px", height:"150px", margin:"1em", marginBottom:"3em"}}>        
                <div className="small-dish-preview-container" style={{border:"solid black", backgrounColor:"#dedede"}}>
                <img className="small-dish-preview-image" style={{maxWidth:"100%", height:"150px"}} src={"https://spoonacular.com/recipeImages/" + result.imageUrls[0]}></img>
                <div className="small-dish-preview-text" style={{whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden"}}>
                {result.title}
                </div>
                </div>
                </div>  
        )) 
    )

    jsx = () => (
      <div className="dish-search-results-container" id="dishItems">
        <div className="dish-previews-container" 
        style={{
            margin:"5%",
            display:"flex",
            flexFlow:"row wrap",
            justifyContent:"left"}}>
        </div>
      </div>
      )

    render() {
        m.render(this.container, this.jsx());
        this.afterRender();
    }

    afterRender() {
        let sr = this.model.getLastSearchResults(); 
        if(sr)
            this.update(sr);
    }
}
