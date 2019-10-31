//toggles the loader indicator to indicate whether an api call is currently loading
function toggleLoader(state){
  document.querySelector("#loader").style.display = state ? '' : 'none';
};

window.onload = function () {
  //We instantiate our model
  const model = new DinnerModel();
  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with.
   */

};
