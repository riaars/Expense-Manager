class MyDinnerView{
    constructor(container, model){
        this.container = container;
        this.model = model;
    }

    render(){

        const innerHTML = `
        
                <div class="mydinner" >
                    <div style="align-content: center display: flex">
                        <div style="display: inline">My dinner: </div>
                        <div id="numGuest" class="value-num-guests" style="display: inline">
                        </div>
                            
                        <div id="people" style="display: inline">
                        </div>
                    </div>    

                    <div>
                    <button class="startBtn"  id="toPrintBtn" onclick="show('search')" style="float: right;">
                          Go back and edit dinner
                    </button>        
                    </div>
                </div>  

        
        `;

        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender(){
        this.myDinner();
    }

    myDinner(){
        this.container.querySelector("#numGuest").innerHTML = this.model.getNumberOfGuests();
  
        if("1" === this.container.querySelector("#numGuest").innerHTML)
            this.container.querySelector("#people").innerHTML = "person";
        else
            this.container.querySelector("#people").innerHTML = "people";
      }
}