import type { Reducer } from "react";
import type { IPlaylist } from "@global/types";

import { useReducer } from "react";

export type ReducerActionType = "onFetch" | "onCreate" | "onDelete" | "onRename";

export type ReducerAction = {
  type: ReducerActionType;
  payload?: any;
};

const initialState: [] = [];

const usePlaylistsReducer: Reducer<IPlaylist[] | [], ReducerAction> = (state, action) => {
  switch (action.type) {
    case "onFetch": {
      return action.payload;
    }
    case "onCreate": {
      return [...state, action.payload];
    }
    case "onDelete": {
      return state.filter((pls) => pls._id !== action.payload);
    }
    case "onRename": {
      return state.map((pls) => (pls._id === action.payload._id ? action.payload : pls));
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
};

export const usePlaylists = () => {
  return useReducer(usePlaylistsReducer, initialState);
};
