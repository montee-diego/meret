import type { Reducer } from "react";
import type { IPlaylistMin } from "@global/types";

import { useReducer } from "react";

type State = {
  playlists: IPlaylistMin[];
  subscriptions: IPlaylistMin[];
};

type ActionType = "onCreate" | "onDelete" | "onFetch" | "onRename" | "onSub";

export type ReducerAction = {
  type: ActionType;
  payload?: any;
};

const initialState: State = {
  playlists: [],
  subscriptions: [],
};

const usePlaylistsReducer: Reducer<State, ReducerAction> = (state, { type, payload }) => {
  switch (type) {
    case "onCreate": {
      return {
        ...state,
        playlists: [...state.playlists, payload],
      };
    }
    case "onDelete": {
      return {
        ...state,
        playlists: state.playlists.filter((pls) => pls._id !== payload._id),
      };
    }
    case "onFetch": {
      return payload;
    }
    case "onRename": {
      return {
        ...state,
        playlists: state.playlists.map((pls) => (pls._id === payload._id ? payload : pls)),
      };
    }
    case "onSub": {
      return {
        ...state,
        subscriptions: payload,
      };
    }
    default: {
      throw new Error(`Unknown action: ${type}`);
    }
  }
};

export const usePlaylists = () => {
  return useReducer(usePlaylistsReducer, initialState);
};
