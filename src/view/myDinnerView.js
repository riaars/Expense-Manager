class MyDinnerView{
    constructor(container, model){
        this.container = container;
        this.model = model;
    }

    render(){

        const innerHTML = `
        
                <div class="mydinner" >
                    <div class="leftmydinner">
                        <div style="display: inline">
                            My dinner:&nbsp;
                        </div>
                        <div id="numGuest" class="value-num-guests" style="display: inline">
                           
                        </div>   
                        <div id="people" style="display: inline">
                        </div>
                    </div>   
                    <div class="rightmydinner">
                    <button class="startBtn" type="button"  id="goBackBtn" onclick="show('search')" style="margin:0 0em 0em 0; margin-left:25px">
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
            this.container.querySelector("#people").innerHTML = "&nbsp;person";
        else
            this.container.querySelector("#people").innerHTML = "&nbsp;people";
      }
}