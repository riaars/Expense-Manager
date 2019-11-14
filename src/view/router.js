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
        {
            screens[route[0].path]
            .forEach(containerName => container(containerName).style.display = "block");
        }

    }

    //hides the contents of the different views
    hideViews(container){
<<<<<<< HEAD
        ["home", "overview", "search", "sidebar", "notfound"]
=======
        ["header", "home", "overview", "search", "sidebar", "notfound", "details"]
>>>>>>> 54fe81b2afade907127d5aae083bfcb663cd4f34
      .forEach(containerName => container(containerName).style.display="none");
    }
}