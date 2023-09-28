const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOCK = "ICE_CREAM_RESTOCK";

const orderCake = (quantity = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: quantity,
  };
};

const restockCake = (quantity = 1) => {
  return {
    type: CAKE_RESTOCK,
    payload: quantity,
  };
};

const orderIceCream = (quantity = 1) => {
  return {
    type: ICE_CREAM_ORDERED,
    payload: quantity,
  };
};

const restockIceCream = (quantity = 1) => {
  return {
    type: ICE_CREAM_RESTOCK,
    payload: quantity,
  };
};

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 10,
};

const reducerCake = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };

    case CAKE_RESTOCK:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

const reducerIceCream = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };

    case ICE_CREAM_RESTOCK:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducer({
  cake: reducerCake,
  iceCream: reducerIceCream,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State : ", store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(4));
store.dispatch(orderIceCream());
store.dispatch(orderIceCream());
store.dispatch(orderIceCream(2));
store.dispatch(restockIceCream(11));

unsubscribe();
