class SearchViewController{
    constructor(view, model){
        this.view = view;
        this.model = model;
        this.addEventListener();
    }

    addEventListener(){
        this.view.container.querySelector("#confirmorderbutton")
        .addEventListener("click", this.confirmOrderListener, false);
    }

    confirmOrderListener(){
        GSC('search', 'confirmorderbutton');
    }
}