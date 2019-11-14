class HeaderView{
    constructor(container){
        this.container = container;
    }

    render(){

        const innerHTML = `
<<<<<<< HEAD
            <div class="header">
                Dinner Planner
            </div>
=======
            <div class="header"><h1>Dinner Planner</h1></div>
>>>>>>> 54fe81b2afade907127d5aae083bfcb663cd4f34
        `;

        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender(){
    }
}