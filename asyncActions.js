const redux = require("redux");
const axios = require("axios");
const thunkMiddleWare = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUserRequested = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case FETCH_USER_FAILED:
      return {
        ...state,
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((r) => r.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => dispatch(fetchUserFailed(err.message)));
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
