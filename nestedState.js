const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;

const initialState = {
  name: "Sahil Adhav",
  age: 22,
  address: {
    street: "PCMC",
    pinCode: 411018,
  },
};

const STREET_UPDATE = "STREET_UPDATE";

const updateStreet = (newStreet) => {
  return {
    type: STREET_UPDATE,
    payload: newStreet,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATE:
      return produce(state, (draft) => {
        draft.address.street = "Floor 37th";
      });

    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial State : ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated Street", store.getState())
);

store.dispatch(updateStreet("Runwal"));
unsubscribe();
