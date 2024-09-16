"use client";

import { createContext, useReducer } from "react";
import { currentDateRange, dateRanges } from "./utils/dateRanges";

const initialState = {
  selectedDateRange: currentDateRange,
};

const StoreContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = StoreContext;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log("Action dispatched: ", action.payload);
    switch (action.type) {
      case "SELECTED_DATE_RANGE":
        return { ...state, selectedDateRange: action.payload };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { StoreContext, StateProvider };
