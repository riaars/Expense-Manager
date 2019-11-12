class HeaderView{
    constructor(container){
        this.container = container;
    }

    render(){

        const innerHTML = `
            <div class="header"><h1>Dinner Planner</h1></div>
        `;

        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender(){
    }
}