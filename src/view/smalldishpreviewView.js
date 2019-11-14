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
    render() {
        let innerHTML = `
        <div class="small-dish-preview-container" style="border:solid black; background-color:#dedede">
            <img class="small-dish-preview-image" style="max-width:100%; height:150px;"></img>
            <div class="small-dish-preview-text" style="white-space: nowrap; text-overflow: ellipsis; overflow:hidden">
        </div>
        `
        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender() {
        this.container.getElementsByClassName("small-dish-preview-image")[0].setAttribute("src", this.dishSummary.imageUrls[0])
        this.container.getElementsByClassName("small-dish-preview-text")[0].innerHTML = this.dishSummary.title;
    }

}