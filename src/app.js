/* @jsx m*/
//For testing
const SHOULD_RESTORE_FROM_LOCALSTORAGE = true;


//Robert said using a global function for the toggler was ok
//But it also needs its own state to handle multiple ongoing requests, let it live inside a global object.
const loader = {
  ongoingRequests: 0,
  toggle: function(state){
    this.ongoingRequests += state ? 1 : -1;
    if(this.ongoingRequests === 0)
      document.querySelector("#loader").style.display = 'none';
    else 
      document.querySelector("#loader").style.display = 'block';
  },
}


// helper function to find the container by short name
const container=function(containerName){
  return document.body.querySelector("#container-"+containerName);
};

// the View containers will not all be visible at the same time. 
// Various screens will show different Views                                                              
const screens = { 
         home: ["header", "home"], 
         search: ["header", "sidebar", "search"],
         overview: ["header", "overview"],
         details: ["header", "details"],
         printout:["header", "printout"],
         notfound:["notfound"]         
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
  path:'printout',
  name:'PrintoutView'
}];

const states = [
  {initialState: 'home', condition: 'startBtn', nextState: 'search'},
  {initialState: 'overview', condition: 'toPrintBtn', nextState: 'printout'},
  {initialState: 'overview', condition: 'goBackBtn', nextState: 'search'},
  {initialState: 'printout', condition: 'goBackBtn', nextState: 'search'},
  {initialState: 'search', condition: 'confirmorderbutton', nextState: 'overview'},
  {initialState: 'search', condition: 'smallDishBtn', nextState: 'details'},
  {initialState: 'details', condition: 'gobackdetails', nextState: 'search'},
  {initialState: 'details', condition: 'confirmorderbutton', nextState: 'overview'}
];

// A General State Controller.
const GSC = function(initialState, condition){
  states.forEach(state => {
      if((state.initialState === initialState) && (state.condition === condition))     
        window.location.hash = state.nextState;
    });
}
 
//called for when the hash has changed
const hashHasChanged = function(){
    this.router.hashHasChanged(container);
};

window.onload = function () {
  window.location.hash = '';
  //Processes hashchange events. Event fires when a window's hash changes.
  window.addEventListener("hashchange", hashHasChanged, false);

  //We instantiate our model
  const model = new DinnerModel(true); 

    setTimeout(() => {      
          const views = {
            headerView: new HeaderView(container("header")),
            homeView: new HomeView(container("home"), model),
            overView: new OverviewView(container("overview"), model),
            searchView: new SearchView(container("search"), model),
            dishDetailsView: new DishDetailsView(container("details"),model),
            printoutView: new PrintoutView(container("printout"),model)
          }
          
          Object.keys(views).map(key => {
            views[key].render();
            });
            
            const controllers ={
              homeController: new HomeViewController(views["homeView"]),
              overviewController: new OverViewController(views["overView"]),
              printoutViewController: new PrintoutViewController(views["printoutView"]),
              searchViewController: new SearchViewController(views["searchView"], model),
              dishDetailsViewController: new DishDetailsViewController(views["dishDetailsView"], model)
            }

            window.location.hash = 'home';
        }, 10)
    //Router object which lets the user switch between views using hash in the browser.
    this.router = new Router(routes);
};
