//Let's the user change views through different given hash values.
class Router{
    
    constructor(routes){
        this.routes = routes;
    }

    //changes the viewed showed according the most resent hash value.
    hashHasChanged(container){
         
        this.hideViews(container);

        let uri = location.hash.slice(1);
        var route = routes.filter(r => r.path === uri);
    
        if(!route[0])
            container("notfound").style.display = "block";
        else
            container(route[0].path).style.display = "block";

    }

    //hides the contents of the different views
    hideViews(container){
        ["header", "home", "overview", "search", "sidebar", "notfound"]
      .forEach(containerName => container(containerName).style.display="none");
    }
}