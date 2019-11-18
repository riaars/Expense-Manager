class MyDinnerView{
    constructor(container, model){
        this.container = container;
        this.model = model;
        this.model.addObserver(["numberOfGuests"], this.myDinner.bind(this), this);
    }

    render(){

        const innerHTML = `
        
                <div class="mydinner-grid-container" >
                    
                    <div class="leftmydinner">
                        <div style="display: inline">
                            My dinner:&nbsp;
                        </div>
                        <div id="numGuest" class="value-num-guests" style="display: inline">    
                            1                     
                        </div>   
                        <div id="people" style="display: inline">
                        </div>
                    </div> 
                    <div class="rightmydinner">
                    <button class="startBtn" type="button"  id="mydinnergobackbtn" onclick="window.location.hash = '#search'">
                          Go back and edit dinner
                    </button>        
                    </div>
                </div>        
        `;

        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender(){
    }

    myDinner(guests){
        this.container.querySelector("#numGuest").innerHTML = guests;
  
        if(1 === guests)
            this.container.querySelector("#people").innerHTML = "&nbsp;person";
        else
            this.container.querySelector("#people").innerHTML = "&nbsp;people";
      }
}