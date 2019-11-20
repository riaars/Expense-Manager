class PrintoutViewController{
    constructor(view){
        this.view = view;
        this.addEventListener();
    }

    addEventListener(){
        this.view.container.querySelector("#mydinnergobackbtn")
        .addEventListener("click", this.listener, false);
    }

    listener(){
        GSC('printout', 'goBackBtn');
    }
}