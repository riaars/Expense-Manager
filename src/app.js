// helper function to find the container by short name
const container=function(containerName){
  return document.body.querySelector("#container-"+containerName);
};

// the View containers will not all be visible at the same time. 
// Various screens will show different Views                                                              
const screens = { 
         home: ["home"], 
         search: ["header", "sidebar", "search"],
<<<<<<< HEAD
         overview: ["header", "overview", "mydinner"],
         details: ["details", "details"],
=======
         overview: ["header", "overview"],
         details: ["header", "details"],
>>>>>>> 54fe81b2afade907127d5aae083bfcb663cd4f34
         header: ["header"],
         mydinner: ["mydinner"]
         
      // TODO: add more screens here!    
};


//A container of routes with paths and names.
const routes = [{
  path:'overview',
  name:'OverView'
},
{
  path:'search',
  name:'SearchView'
},
{
  path:'home',
  name:'HomeView'
},
{
  path:'details',
  name:'DetailView'
},
{
  path: 'header',
  name: 'HeaderView'
},
{
  path:'printout',
  name:'PrintoutView'
},
{
  path: 'mydinner',
  name: 'MyDinnerView'
}];


// switching between screens
const show= function(screenName) {
    // hide all views first 
    // optional FIXME: we could avoid hiding the containers that are part of the screen to be shown
    // optional FIXME: finding the containers could be done automatically
    // by looking at document.body.firstChild.children
    ["header", "home", "overview", "search", "sidebar", 'details', 'printout', 'mydinner']
      .forEach(containerName => container(containerName).style.display="none");
    
    // now we show all the Views used by the indicated screen
    screens[screenName]
      .forEach(containerName => container(containerName).style.display = "block");
};
 
//called for when the hash has changed
const hashHasChanged = function(){
    this.router.hashHasChanged(container);
};

window.onload = function () {

  //Processes hashchange events. Event fires when a window's hash changes.
  window.addEventListener("hashchange", hashHasChanged, false);

  //We instantiate our model
  const model = new DinnerModel();

<<<<<<< HEAD
     model.getDish(522).then(dish => model.addDishToMenu(dish))
   .then(model.getDish(522).then(dish => model.addDishToMenu(dish)))
   .then(model.getDish(512).then(dish => {model.addDishToMenu(dish); 
    console.log(model.getFullMenu())
    new OverviewView(container("overview"), model).render();
  }))
   
    //new HomeView(container("home"), model).render();
    // new SearchView(container("search"), model).render();
    //new HeaderView(container("header")).render();
   // new OverviewView(container("overview"), model).render();
    
    //new MyDinnerView(container("mydinner"),model).render();
=======
  //Make sure all promises resolve so model is populated
  Promise.all([model.getDish(522), model.getDish(512), model.getDish(720)]) 
  .then(dishes => {
    dishes.forEach(model.addDishToMenu);
    new HeaderView(container("header")).render();
    new HomeView(container("home"), model).render();
    new OverviewView(container("overview"), model).render();
    new SearchView(container("search"), model).render();
    new DishDetailsView(container("details"), model).render();
    new PrintoutView(container("printout"),model).render();
    new MyDinnerView(container("mydinner"),model).render();
})


>>>>>>> 54fe81b2afade907127d5aae083bfcb663cd4f34
 
    //Router object which lets the user switch between views using hash in the browser.
    this.router = new Router(routes);
  
  // TODO:  more views here
  // TODO: The views are not being rendered yet. Figure out how to do so.
  
<<<<<<< HEAD
 
  show("overview");
=======
  show("search");
>>>>>>> 54fe81b2afade907127d5aae083bfcb663cd4f34

  /**
   * IMPORTANT: app.js is the only place where you are allowed to use document.body
   * In other Views you should limit your DOM searches to children of that View. For that, you must use querySelector()
   * It is possible to implement Views using no DOM search at all, using DOM fields like element.firstChild, 
   * element.nextSibling...
   */
};
