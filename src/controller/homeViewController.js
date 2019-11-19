class HomeViewController{
    constructor(view){
        this.view = view;
        this.addEventListener();
    }

    addEventListener(){
        this.view.container.querySelector("#startBtn")
        .addEventListener("click", this.listener, false);
    }

    listener(){
        window.location.hash = 'search';
    }
}