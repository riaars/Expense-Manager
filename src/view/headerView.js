/* @jsx m*/
class HeaderView{
    constructor(container){
        this.container = container;
    }

    render(){
        m.render(this.container, <div class="header"><h1>Dinner Planner</h1></div>)
    }
}