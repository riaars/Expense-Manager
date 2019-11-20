class OverViewController{
    constructor(view){
        this.view = view;
        this.addEventListener();
    }

    addEventListener(){
        this.view.container.querySelector("#toPrintBtn")
        .addEventListener("click", this.toPrintBtnListener, false);

        this.view.container.querySelector("#mydinnergobackbtn")
        .addEventListener("click",this.goBackBtnListener,false);
    }

    toPrintBtnListener(){
        GSC('overview', 'toPrintBtn');
    }

    goBackBtnListener(){
        GSC('overview', 'goBackBtn');
    }
}