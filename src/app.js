var show;
// This will be a global funciton

window.onload = function () {
  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();

  var containers = {}
  var screens = {}
  show = function(screen) {
    for(var containerName in containers) { // Hide all 
      containers[containerName].style.display = "none";
    }

    // Show only these (notice for of loop, good for arrays)
    for(var containerName of screens[screen]) {
      containers[containerName].style.display = "block";
    }
  }

  containers["header"] = document.getElementById("container-header")
  containers["home"] = document.getElementById("container-home")
  containers["overview"] = document.getElementById("container-overview")
  containers["search"] = document.getElementById("container-search")
  containers["sidebar"] = document.getElementById("container-sidebar")
  new HomeView(containers["home"], model);
  new OverviewView(containers["overview"], model);
  new SearchView(containers["search"], model);

  // TODO Proably many are missing, but also not every one needs a view...

  screens["home"] = ["home"]
  screens["search"] = ["header", "sidebar", "search"]
  screens["overview"] = ["header", "overview"]

  show("home");

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with.
   */
};
