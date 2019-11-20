class eventEmitter {
    constructor() {
        this.eventListeners = [];
    }

    //The view handles the events from its elements, but only redirects them into the listening controller
    //This way the view does not change anything in the state, but notifies the controller that the user has interacted with it
    //so that the controller can take apropriate actions.
    emitEvent(evtType, evtData) {
        this.eventListeners.forEach(function (listener){
          listener.handleEvent(evtType, evtData)})
      }
  
      registerEventListener(listener) {
        this.eventListeners.push(listener);
      }
    
}
