class HeaderView{
    constructor(container){
        this.container = container;
    }

    render(){

        const innerHTML = `
            <div class="header">Dinner Planner</div>
        `;

        this.container.innerHTML = innerHTML;
        this.afterRender();
    }

    afterRender(){
    }
}