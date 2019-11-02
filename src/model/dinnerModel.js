//Static imports not allowed, so let's not use import statement.
const store = Redux.createStore(reducer);

const SET_NUMBER_GUESTS = "SET_NUMBER_GUESTS"
const ADD_DISH = "ADD_DISH"
const REMOVE_DISH = "REMOVE_DISH"
const SET_DISHES = "SET_DISHES" 

//Action creators.
const actions = {
  setNoGuestsAction(num) {return {type: SET_NUMBER_GUESTS, guestAmount: num}},
  addDishAction(dish) {return {type: ADD_DISH, dish: dish}},
  removeDishAction(id) {return {type: REMOVE_DISH, id: id}},
  setDishAction(dishes) {return {type: SET_DISHES, dishes: dishes}},
}

const store = createStore(reducer);

//State reducer
function reducer(state = {}, action) {
  return {
      dishes: dishes(state.dishes, action),
      numberOfGuests: numberOfGuests(state.numberOfGuests, action)
   };
}
  
//guests reducer
function numberOfGuests(state = 1, action) {
  switch(action.type) {
    case SET_NUMBER_GUESTS:
      return Math.max(action.guestAmount, 1) ;
    default:
      return state;
  }
}

//Dishes reducer
function dishes(state=[], action) {
  switch(action.type) {
    case ADD_DISH: 
      return [...state, action.dish];
    case REMOVE_DISH:
      return state.filter(dish => dish.id != action.id);
    case SET_DISHES: 
      return action.dishes;
    default:
      return state;
  }
}

class DinnerModel {
  constructor() {
    store.dispatch(actions.setDishAction([]));
    store.dispatch(actions.setNoGuestsAction(0));
  }

  setNumberOfGuests(num) {
    store.dispatch(actions.setNoGuestsAction(num));
  }

  getNumberOfGuests() {
    return store.getState().numberOfGuests;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    return store.getState().dishes.filter(value => value.dishTypes.includes(type));
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return store.getState().dishes;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return store.getState().dishes
      .map(dish => dish.extendedIngredients
      .map(ingredient => ingredient.name))
      .flat().filter((dish, pos, arr) => {return arr.indexOf(dish) == pos;});
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    return store.getState().dishes
    .map(dishes => dishes.pricePerServing)
    .reduce((totalPrice, dishPrice) =>  totalPrice + dishPrice, 0)*this.numberOfguests;
  }

  //Adds the passed dish to the menu. 
  addDishToMenu(dish) {
    store.dispatch(actions.addDishAction(dish));
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    store.dispatch(actions.removeDishAction(id));
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
 
    if(!type)
       type = '';

    if(!query)
       query = '';

    toggleLoader(true);
    return fetch(ENDPOINT + '/' + 'recipes' + '/' + 'search?type=' + type + '&query=' + query , HEADERS)
           .then(response => response.json())
           .then(responseJson => {toggleLoader(false); return responseJson.results})
           .catch(console.error);
  }

  //Returns a dish of specific ID
  getDish(id) {
    toggleLoader(true);
    return fetch(ENDPOINT +'/' + 'recipes' + '/' + id + '/information', HEADERS)
           .then(response => response.json())
           .then(responseJson => {toggleLoader(false); return responseJson})
           .catch(console.error);
  }
}

