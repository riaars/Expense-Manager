class DinnerModel {
  constructor() {
    this.numberOfguests = 1;
    this.fullMenu = [];
  }

  setNumberOfGuests(num) {
    this.numberOfguests = Math.max(num,1);
  }

  getNumberOfGuests() {
    return this.numberOfguests;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    return this.fullMenu.filter(value => value.dishTypes.includes(type));
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.fullMenu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
     return this.fullMenu.map(dish => dish.extendedIngredients.map(ingredient => ingredient.name)).flat().filter((dish, pos, arr) => {return arr.indexOf(dish) === pos;});   
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    return this.fullMenu.map(dishes => dishes.pricePerServing).reduce((totalPrice, dishPrice) =>  totalPrice + dishPrice, 0)*this.numberOfguests;
  }

  //Adds the passed dish to the menu. 
  addDishToMenu(dish) {
    this.fullMenu.push(dish);
    
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    this.fullMenu = this.fullMenu.filter(value => {value.id != id});
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
 
    if(!type)
       type = '';

    if(!query)
       query = '';

    return fetch(ENDPOINT + '/' + 'recipes' + '/' + 'search?type=' + type + '&query=' + query , HEADERS)
           .then(response => response.json())
           .then(responseJson => responseJson.results)
           .catch(console.error);
  }

  //Returns a dish of specific ID
  getDish(id) {
    
    return fetch(ENDPOINT +'/' + 'recipes' + '/' + id + '/information', HEADERS)
           .then(response => response.json())
           .then(responseJson => responseJson)
           .catch(console.error);
  }
}

