class SearchResultsView {
    constructor(container, model) {
        //Subscribe to the model search results, will be replaced by a controller in lab3
        this.container = container;
        this.model = model;
        this.model.subscribeToProperty(["dishSearchResults"], this.onNewSearchResults.bind(this));
    }

    //Model received new search data
    onNewSearchResults(searchResults) {
        let dishPreviewContainer = this.container.getElementsByClassName("dish-previews-container")[0];
        dishPreviewContainer.innerHTML="";
        searchResults.forEach(element => {
            let previewElement = document.createElement("div")
            previewElement.setAttribute("style", "width:150px; height:150px; margin:1em; margin-bottom:3em;")
            let copy = JSON.parse(JSON.stringify(element))
            let url = "https://spoonacular.com/recipeImages/" + element.imageUrls[0];
            copy.imageUrls[0] = url; 
            dishPreviewContainer.appendChild(previewElement)
            new SmallDishPreviewView(previewElement, copy).render();    
        });
    }

    render() {
        let innerHTML = `
        <div class="dish-search-results-container">
            <div class="dish-previews-container" style="margin: 5%; display:flex; flex-flow:row wrap; justify-content: left;">
            </div>
        </div>`
        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender() {
        let sr = this.model.getLastSearchResults(); 
        if(sr)
            this.onNewSearchResults(sr);
    }


}