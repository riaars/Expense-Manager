const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus 
              sagittis, quam vitae lobortis pharetra, arcu felis tempus nisl, a 
              rhoncus nisl nisl quis orci. Sed faucibus, sapien at lobortis placerat, 
              nisl velit feugiat nulla, vitae consectetur enim libero ut tortor. Proin 
              erat mauris, pretium eget sapien quis, auctor semper sem.`;

class PrintoutView{

constructor(container, model){
    this.model = model;
    this.container = container;
    this.printoutmydinner = undefined;
    this.printoutheader= undefined;
}

    render(){
        const innerHTML = `
            <div class="printoutmydinner" id="printoutmydinner">
            </div>
            <div class="printoutmain" id="printoutmain">
            </div>
        `;

            this.container.innerHTML = innerHTML;

            if(this.printoutheader === undefined)
                    this.printoutheader = new HeaderView(this.container.querySelector("#printoutheader"));

            if(this.printoutmydinner === undefined)
                    this.printoutmydinner = new MyDinnerView(this.container.querySelector("#printoutmydinner"), this.model);

            this.afterRender();
    }

    afterRender(){
        this.printoutmydinner.render();
        this.dishpresenter();
    }

    dishpresenter(){


        let dishes = this.model.getFullMenu();

        dishes.map(dish => {
            let elem = document.createElement("div");
            let pic = document.createElement("img");
            let desc = document.createElement("div");
            let prep = document.createElement("div");

            elem.classList.add("printdiv");
            pic.classList.add("printpicdiv");
            desc.classList.add("descdiv");
            prep.classList.add("prepdiv");

            pic.setAttribute("src", dish.image);

            desc.appendChild(document.createElement("h3"));
            desc.firstChild.innerHTML = dish.title;
            //desc.firstChild.setAttribute("class", "value-main-course-name");
            desc.appendChild(document.createElement("div"));
            desc.children[1].innerHTML = text;

            prep.appendChild(document.createElement("h5"));
            prep.firstChild.innerHTML = "Preparation";
            prep.appendChild(document.createElement("div"));
            prep.children[1].innerHTML = text;

            elem.appendChild(pic);
            elem.appendChild(desc);
            elem.appendChild(prep);

            return elem;
        })
        .forEach(element => {
            this.container.querySelector("#printoutmain").appendChild(element);
        });
    }

}