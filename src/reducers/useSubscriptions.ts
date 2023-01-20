import type { Reducer } from "react";
import type { IPlaylist } from "@global/types";

import { useReducer } from "react";

export type ReducerActionType = "onFetch" | "onSub" | "onUnsub";

export type ReducerAction = {
  type: ReducerActionType;
  payload?: any;
};

const initialState: [] = [];

const useSubscriptionsReducer: Reducer<IPlaylist[] | [], ReducerAction> = (state, action) => {
  switch (action.type) {
    case "onFetch": {
      return action.payload;
    }
    case "onSub": {
      return action.payload;
    }
    case "onUnsub": {
      return state.filter((pls) => pls._id !== action.payload);
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};

export const useSubscriptions = () => {
  return useReducer(useSubscriptionsReducer, initialState);
};
