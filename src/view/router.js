class Router{
    
    constructor(routes){
        this.routes = routes;
    }

    hashHasChanged(container){
         
        this.hideViews();

        let uri = location.hash.slice(1);
        var route = routes.filter(r => r.path === uri);
    
        if(!route[0])
            container("notfound").style.display = "block";
        else
            container(route[0].path).style.display = "block";

         
    
    }

    hideViews(){
        ["header", "home", "overview", "search", "sidebar", "notfound"]
      .forEach(containerName => container(containerName).style.display="none");
    }
}