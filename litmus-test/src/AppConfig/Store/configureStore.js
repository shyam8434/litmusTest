import React from "react";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";

const configureStore = () => {
  const middlewares = [];

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return { store };
};

export default configureStore;
