window.onload = function () {
  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();
  model.getDish(512).then(dish => model.addDishToMenu(dish))
  .then(model.getDish(522).then(dish => model.addDishToMenu(dish)))
  .then(model.getDish(23456).then(dish => model.addDishToMenu(dish)))

  const container = document.getElementsByClassName("page-content")[0];
  const view = new SearchView(container, model);

  view.render()

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with.
   */

};