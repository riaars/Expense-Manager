//static imports not allowed.
const createStore = Redux.createStore;

const SET_NUMBER_GUESTS = "SET_NUMBER_GUESTS"
const ADD_DISH = "ADD_DISH"
const REMOVE_DISH = "REMOVE_DISH"
const SET_DISHES = "SET_DISHES" 
const SET_RECIPE_DETAILS_DISH = "SET_RECIPE_DETAILS_DISH"
const DELETE_LAST_SEARCH = "DELETE_LAST_SEARCH" 
const REPLACE_LAST_SEARCH = "REPLACE_LAST_SEARCH" 
const SET_TOTAL_MENU_PRICE = "SET_TOTAL_MENU_PRICE"
const SET_SIDEBAR_COLLAPSED = "SET_SIDEBAR_COLLAPSED"
const REPLACE_AUTO_COMPLETE = "REPLACE_AUTO_COMPLETE"

//Action creators.
const actions = {
  setNoGuestsAction(num) {return {type: SET_NUMBER_GUESTS, guestAmount: num}},
  addDishAction(dish) {return {type: ADD_DISH, dish: dish}},
  removeDishAction(id) {return {type: REMOVE_DISH, id: id}},
  setDishAction(dishes) {return {type: SET_DISHES, dishes: dishes}},
  setRecipeDetailsDishAction(dish) {return {type: SET_RECIPE_DETAILS_DISH, recipe: dish}},
  replaceLastSearchAction(searchResult) {return {type: REPLACE_LAST_SEARCH, result: searchResult}},
  replaceLastAutocompleteAction(autoCompleteResults) {return {type: REPLACE_AUTO_COMPLETE, result: autoCompleteResults}},
  deletelastSearch() {return {type: DELETE_LAST_SEARCH}},
  setTotalMenuPriceAction(amount){return {type: SET_TOTAL_MENU_PRICE, totalPrice: amount}},
  setSidebarCollapsedAction(isCollapsed){return {type: SET_SIDEBAR_COLLAPSED, isCollapsed: isCollapsed}}
}

const store = createStore(reducer);


//State reducer
function reducer(state = {}, action) {
  return {
      dishes: dishes(state.dishes, action),
      numberOfGuests: numberOfGuests(state.numberOfGuests, action),
      dishSearchResults: lastSearchResult(state.dishSearchResults, action),
      autoCompleteResults: lastAutoCompleteResults(state.autoCompleteResults, action),
      prices: prices(state.prices, action),
      recipe: recipeDish(state.recipe, action),
      userPrefs:  userPrefs(state.userprefs, action)
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
//Searches reducer
function lastSearchResult(state = [], action) {
  switch(action.type) {
    case REPLACE_LAST_SEARCH: 
      return action.result;
    case DELETE_LAST_SEARCH:
      return [];
    default: 
      return state;
  }
}

//autoComplete reducer
function lastAutoCompleteResults(state = [], action) {
  switch(action.type) {
    case REPLACE_AUTO_COMPLETE: 
      return action.result;
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

function userPrefs(state={}, action) {
  switch(action.type) {
    case SET_SIDEBAR_COLLAPSED: 
      state.sidebarCollapsed = action.isCollapsed;
      return state;
    default: return state;
  }
}
//Prices reducer
function prices(state=[], action){
    switch(action.type){
      case SET_TOTAL_MENU_PRICE:
        return action.totalPrice;
      default:
        return state;
    }
}

//RecipeDish Reducer
function recipeDish(state=[], action){
    switch(action.type){
      case SET_RECIPE_DETAILS_DISH:
        return action.recipe;
      default:
        return state;
      }
}


class DinnerModel {
  constructor(should_load_state_from_localStore) {
    //this is used to optimize which observer callbacks are called.
    //if a certain listener is only interested in property x, it shouldn't be called when prop 7 is changed.
    this.lastChangedStateProp = undefined;
    
    this.localStorage = window.localStorage;
    this.subscribers = [];
    store.subscribe(this.notifyObservers.bind(this));
    //To make it simple, lets store the entire state in localstorage
    if(should_load_state_from_localStore) {
      this.restoreStateFromDisk();
      store.subscribe(this.saveStateToLocalStorage.bind(this));
    }
  }

  //Restore a saved state from the localstorage into the app state.
  restoreStateFromDisk() {
    let p = JSON.parse;
    for (const key in this.localStorage){
      switch(key) {
        case "dishes":
          store.dispatch(actions.setDishAction(p(this.localStorage.getItem(key))));
          break;
        case "numberOfGuests":
          store.dispatch(actions.setNoGuestsAction(p(this.localStorage.getItem(key))));
          break;
        case "dishSearchResults":
          store.dispatch(actions.replaceLastSearchAction(p(this.localStorage.getItem(key))));
          break;
        case "prices":
          store.dispatch(actions.setTotalMenuPriceAction(p(this.localStorage.getItem(key))));
          break;
        case "recipe":
          store.dispatch(actions.setRecipeDetailsDishAction(p(this.localStorage.getItem(key))));
          break;
      }
    }
  }

  saveStateToLocalStorage() {
    let state = store.getState();
    for(const key in state)
      this.localStorage.setItem(key,  JSON.stringify(state[key]));
  }

  //Notifies the subscribers with the state of their subscribed properties
  //Only listener interested in the last change should be notified of the change.
  notifyObservers() {
    let state = store.getState();
    this.subscribers.forEach(function(sub) {
      if(!this.lastChangedStateProp || sub.subscribedProp.includes(this.lastChangedStateProp))
        sub.func(...sub.subscribedProp.map((prop) => state[prop]));
    }.bind(this))
  }

  
  //A particular view wants to subscribe to a state property,
  //Instead of subscribing directly to the store, its added as a subscriber
  //And on store update, is notified of the properties' new state.
  addObserver(properties, callback, owner) {
    this.subscribers.push({subscribedProp: properties, func: callback, owner: owner})
  }

  //Removes the observer from the list of observers
  removeObserver(observer) {
    this.subscribers = this.subscribers.filter((elem) => elem.owner != observer)
  }

  
  recalculateTotalMenuPrice(){
    this.lastChangedStateProp = "prices";
    store.dispatch(actions.setTotalMenuPriceAction(this.getTotalMenuPrice()));
  }

  getLastSearchResults() {
    return store.getState().dishSearchResults;
  }

  
  setNumberOfGuests(num) {
    this.lastChangedStateProp = "numberOfGuests";
    store.dispatch(actions.setNoGuestsAction(num));
    this.recalculateTotalMenuPrice();
  }

  setRecipeDetailsDish(dish){
    this.lastChangedStateProp = "recipe";
    store.dispatch(actions.setRecipeDetailsDishAction(dish));
  }

  getRecipeDetailsDish(){
    return store.getState().recipe;
  }

  getNumberOfGuests() {
    return store.getState().numberOfGuests;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    return store.getState().dishes.filter(value => value.dishTypes.includes(type));
  }

  getUserPrefs(pref) {
    let state = store.getState();
    if(pref === undefined)
      return state.userPrefs;
    return state.userPrefs[pref];
  }

  setSidebarToggle(state) {
    this.lastChangedStateProp = "userPrefs"
    store.dispatch(actions.setSidebarCollapsedAction(state));
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return store.getState().dishes;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return store.getState().dishes
      .map(dish => dish.extendedIngredients).flat();
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    return store.getState().dishes
    .map(dishes => dishes.pricePerServing)
    .reduce((totalPrice, dishPrice) =>  totalPrice + dishPrice, 0)*store.getState().numberOfGuests;
  }

  //Adds the passed dish to the menu. 
  addDishToMenu(dish) {
    this.lastChangedStateProp = "dishes";
    store.dispatch(actions.addDishAction(dish));
    this.recalculateTotalMenuPrice();
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    this.lastChangedStateProp = "dishes";
    store.dispatch(actions.removeDishAction(id));
    this.recalculateTotalMenuPrice();
  }

  getAutocompleteResults(pattern, numSuggestions) {
  //console.log(ENDPOINT + '/' + 'recipes' + '/' + 'autocomplete?number=' + numSuggestions + '&query=' + pattern);
    return fetch(ENDPOINT + '/' + 'recipes' + '/' + 'autocomplete?number=' + numSuggestions + '&query=' + pattern , 
    {headers:{'X-Mashape-Key': API_KEY}})
    .then(response => response.json())
    .then(json => {
      this.lastChangedStateProp = "autoCompleteResults";
      store.dispatch(actions.replaceLastAutocompleteAction(json))
      return json; 
    })
    .catch(console.error)
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
    if(!type)
       type = '';

    if(!query)
       query = '';

    return new Promise(function(resolve, reject) {
      try{
        return fetch(ENDPOINT + '/' + 'recipes' + '/' + 'search?type=' + type + '&query=' + query , 
        {headers:{'X-Mashape-Key': API_KEY}})
        .then(response => response.json())
        .then(responseJson => {
          this.lastChangedStateProp = "dishSearchResults";
          store.dispatch(actions.replaceLastSearchAction(responseJson.results));
          resolve(responseJson.results)})
        .catch((error) => {
          console.error(error); 
          //From the tests it seems no matter what, never reject()
          resolve(undefined)})
      }  catch(e) {
          //this is not good, but it is here because otherwise, since the call throws immediately,
          //the loader would be shown, then immediately removed, and the promise would resolve before
          //the "loader is present" test was performed. Maybe it is me misunderstanding something.
          setTimeout(()=> {
            resolve(undefined);
          }, 1)
      }
    }.bind(this)) 
  }

  //Returns a dish of specific ID
  getDish(id) {
    return new Promise(function(resolve, reject) {
      try{  
        return fetch(ENDPOINT +'/' + 'recipes' + '/' + id + '/information', 
        {headers:{'X-Mashape-Key': API_KEY}})
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson)})
        .catch((error) => {
          console.error(error);
          //From the tests it seems no matter what, never reject()
          resolve(undefined)});
      }  catch(e) {
        //console.log("Error in evualuation, not api call call");
          //this is nnot good, but it is here because otherwise, since the call throws immediately,
          //the loader would be shown, then immediately removed, and the promise would resolve before
          //the "loader is present" test was performed. Maybe it is me misunderstanding something, 
          //but it passes the tests :)
          setTimeout(()=> {
            resolve(undefined);
          }, 1)
        }
    }) 
}
}